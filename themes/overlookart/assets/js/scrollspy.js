import { hasClass, addClass, removeClass } from './public';

/**
 * Scrollspy 模块
 * 用于监听页面滚动，自动高亮当前阅读位置对应的目录项
 * 支持目录的展开/收起、滚动定位等功能
 */
const scrollspy = {
    // CSS 选择器配置
    TocNavigationQuery: '#TableOfContents',            // TOC 导航容器选择器
    TocNavigationItemQuery: '#TableOfContents li',     // TOC 导航项选择器
    ArticleHeaderQuery: 'h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]',  // 文章标题选择器

    // CSS 类名配置
    ActiveNavItemClass: 'active-nav-item',             // 激活状态样式类
    NavItemHiddenClass: 'nav-item-hidden',             // 隐藏状态样式类

    // 内部状态
    navItemsLinkRef: {},           // 导航项链接引用映射 {id: element}
    articleHeaderElements: [],     // 文章标题元素集合
    articleHeaderOffset: [],       // 标题位置信息 [{id, offset}]
    currentNavItemLink: null,      // 当前激活的导航项
    articleContainer: null,        // 文章容器 DOM 元素

    /**
     * 滚动到指定的 TOC 项
     * @param {HTMLElement} tocItemElement - TOC 导航项元素
     * @param {HTMLElement} tocNavigation - TOC 导航容器
     */
    scrollToTocElement: function(tocItemElement, tocNavigation){
        let itemHeight = tocItemElement.querySelector("a").offsetHeight;
        let scrollTop = tocItemElement.offsetTop - tocNavigation.offsetHeight / 2 + itemHeight / 2 - tocNavigation.offsetTop;

        if(scrollTop < 0) {
            scrollTop = 0;
        }

        tocNavigation.scrollTo({ top: scrollTop, behavior: 'smooth'});
    },

    /**
     * 建立导航项链接引用映射
     * @param {NodeList} navigationItems - 导航项集合
     */
    setupNavItemsLinkRef: function(navigationItems){
        const navItemLinkRef = {};
        navigationItems.forEach(item => {
            const link = item.querySelector('a');
            const href = link.getAttribute('href');
            if(href.startsWith('#')) {
                navItemLinkRef[href.slice(1)] = item;
            }
        });
        this.navItemsLinkRef = navItemLinkRef;
    },

    /**
     * 采集文章标题位置信息
     * @param {NodeList} headers - 文章标题元素集合
     */
    setupArticleHeaderOffset: function(headers){
        let offsets = [];
        headers.forEach(header => {
            offsets.push({id: header.id, offset: header.offsetTop });
        });
        offsets.sort((a, b) => a.offset - b.offset);
        this.articleHeaderOffset = offsets;
    },

    /**
     * 初始化 Scrollspy
     * 设置滚动监听、目录交互等功能
     */
    setup: function(){
        // 获取文章容器
        this.articleContainer = document.getElementById('article-container');
        if(!this.articleContainer) {console.warn('未找到文章页的标识'); return; }

        // 监听滚动事件
        this.articleContainer.addEventListener('scroll', () => {
            this.scrollHandler();
        });

        // 采集文章标题元素
        let headers = document.querySelectorAll(this.ArticleHeaderQuery);
        if(!headers) { console.warn('没有找到文字目录标题元素'); return; }
        this.articleHeaderElements = headers;

        // 获取 TOC 容器
        let tocNavigation = document.querySelector(this.TocNavigationQuery);
        if(!tocNavigation) { console.warn('没有找到 TOC 目录元素'); return; }

        // 获取所有导航项
        let navigationItems = document.querySelectorAll(this.TocNavigationItemQuery);
        if(!navigationItems) { console.warn('没有找到目录导航元素'); return; }

        // 筛选有子目录的父级导航项
        let superNavigationItems = Array.from(navigationItems).filter(item => {
            return item.querySelector('ol') !== null;
        });

        // 初始化父级目录的展开/收起功能
        for (const item of superNavigationItems) {
            let subNavigation = item.querySelector('ol');
            if(subNavigation && !hasClass(subNavigation, this.NavItemHiddenClass)){
                addClass(subNavigation, this.NavItemHiddenClass);
            }
            let link = item.getElementsByTagName('a')[0];
            if(link && subNavigation){
                addClass(link, 'toc-toggle');
            }
            link?.addEventListener('click', (event) => {
                event.preventDefault();
                if(subNavigation){
                    let isHidden = hasClass(subNavigation, this.NavItemHiddenClass);
                    if(isHidden){
                        removeClass(subNavigation, this.NavItemHiddenClass);
                        addClass(link, 'expanded');
                    }else{
                        addClass(subNavigation, this.NavItemHiddenClass);
                        removeClass(link, 'expanded');
                    }
                }
            });
        }

        // 初始化标题位置和导航引用
        this.setupArticleHeaderOffset(this.articleHeaderElements);
        this.setupNavItemsLinkRef(navigationItems);
    },

    /**
     * 滚动事件处理
     * 根据滚动位置更新当前激活的目录项
     */
    scrollHandler: function(){
        if (!this.articleContainer) { return }
        if (this.articleHeaderOffset.length <= 0) { return }
        let scrollPosition = this.articleContainer.scrollTop;

        // 找到距离滚动位置最近的标题
        let newActive = this.articleHeaderOffset.reduce((prev, curr) => {
            let prevOffset = prev.offset - scrollPosition  ;
            let currOffset = curr.offset - scrollPosition  ;
            return Math.abs(prevOffset) < Math.abs(currOffset) ? prev : curr;
        });

        // 获取对应的导航项
        let newActiveLink;
        if(newActive){
            newActiveLink = this.navItemsLinkRef[newActive.id];
        }

        // 更新导航项状态
        if(newActive && !newActiveLink){

        }else if(newActiveLink !== this.currentNavItemLink){
            if(this.currentNavItemLink){
                removeClass(this.currentNavItemLink, this.ActiveNavItemClass);
                this.updateParentActiveState(this.currentNavItemLink, false);
            }
            if(newActiveLink){
                addClass(newActiveLink, this.ActiveNavItemClass);
                this.updateParentActiveState(newActiveLink, true);
                this.expandParentIfNeeded(newActiveLink);
                this.scrollActiveItemIntoView(newActiveLink);
            }
        }
        this.currentNavItemLink = newActiveLink;
    },

    /**
     * 更新父级目录的激活状态
     * @param {HTMLElement} activeLink - 当前激活的链接元素
     * @param {boolean} isActivating - 是否是激活状态
     */
    updateParentActiveState: function(activeLink, isActivating){
        let currentLi = activeLink.closest('li');
        if(!currentLi) return;

        let parentLi = currentLi.parentElement.closest('li');
        if(parentLi && parentLi.querySelector('ol')){
            let parentLink = parentLi.querySelector('a');
            let subNavigation = parentLi.querySelector('ol');

            if(isActivating){
                // 激活时：如果父级目录是收起的，才为其添加激活状态
                if(hasClass(subNavigation, this.NavItemHiddenClass)){
                    addClass(parentLink, this.ActiveNavItemClass);
                }
            }else{
                // 取消激活时：移除父级目录的激活状态
                removeClass(parentLink, this.ActiveNavItemClass);
            }
        }
    },

    /**
     * 展开父级目录（当激活子项时）
     * @param {HTMLElement} activeLink - 当前激活的链接元素
     */
    expandParentIfNeeded: function(activeLink){
        let currentLi = activeLink.closest('li');
        if(!currentLi) return;

        let parentLi = currentLi.parentElement.closest('li');
        if(parentLi && parentLi.querySelector('ol')){
            let subNavigation = parentLi.querySelector('ol');
            if(hasClass(subNavigation, this.NavItemHiddenClass)){
                removeClass(subNavigation, this.NavItemHiddenClass);
                let parentLink = parentLi.querySelector('a');
                if(parentLink && hasClass(parentLink, 'toc-toggle')){
                    addClass(parentLink, 'expanded');
                    removeClass(parentLink, this.ActiveNavItemClass);
                }
            }
        }
    },

    /**
     * 将激活的导航项滚动到可视区域
     * @param {HTMLElement} activeLink - 激活的链接元素
     */
    scrollActiveItemIntoView: function(activeLink){
        if(!activeLink) return;

        let tocContainer = document.querySelector(this.TocNavigationQuery);
        if(!tocContainer) return;

        requestAnimationFrame(() => {
            activeLink.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });
        });
    },

    /**
     * 窗口大小变化处理
     * 重新计算标题位置并更新高亮状态
     */
    resizeHandler: function(){
        if(!this.articleContainer) { return }
        this.setupArticleHeaderOffset(this.articleHeaderElements);
        this.scrollHandler();
    }
}

export { scrollspy };
