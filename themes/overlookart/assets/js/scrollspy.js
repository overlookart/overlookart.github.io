import { hasClass, addClass, removeClass } from './public';
const scrollToTocElement = (tocItemElement, tocNavigation) => {
    let itemHeight = tocItemElement.querySelector("a").offsetHeight;

    let scrollTop = tocItemElement.offsetTop - tocNavigation.offsetHeight / 2 + itemHeight / 2 - tocNavigation.offsetTop;

    if(scrollTop < 0) {
        scrollTop = 0;
    }

    tocNavigation.scrollTo({ top: scrollTop, behavior: 'smooth'});
}  


const scrollspy = {
    // 查询 Toc 目录元素
    TocNavigationQuery: '#TableOfContents',
    /// 查询 Toc 导航项的 id和标签
    TocNavigationItemQuery: '#TableOfContents li',
    /// 查询文章标题 header 的 css和标签及id
    ArticleHeaderQuery: 'h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]',
    /// 目录导航项激活时的样式
    ActiveNavItemClass: 'active-nav-item',
    /// 目录导航项显示时的样式
    NavItemHiddenClass: 'nav-item-hidden',
    
    navItemsLinkRef: {},

    /// 文章内容的所有标题元素
    articleHeaderElements: [],

    /// 文章内的标题位置
    articleHeaderOffset: [],
    /// 当前的导航项
    currentNavItemLink: null,
    /// 文章容器
    articleContainer: null,
    

    /// 滑动 Toc
    scrollToTocElement: function(tocItemElement, tocNavigation){
        let itemHeight = tocItemElement.querySelector("a").offsetHeight;
        let scrollTop = tocItemElement.offsetTop - tocNavigation.offsetHeight / 2 + itemHeight / 2 - tocNavigation.offsetTop;

        if(scrollTop < 0) {
            scrollTop = 0;
        }

        tocNavigation.scrollTo({ top: scrollTop, behavior: 'smooth'});
    },

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

    /// 更新文章内容 header 的垂直位置
    setupArticleHeaderOffset: function(headers){
        var offsets = [];
        headers.forEach(header => {
            offsets.push({id: header.id, offset: header.offsetTop });
            offsets.sort((a, b) => { a.offset - b.offset });
        });
        this.articleHeaderOffset = offsets;
    },

    setup: function(){

        this.articleContainer = document.getElementById('article-container');
        if(!this.articleContainer) {console.warn('未找到文章页的标识'); return; }
        this.articleContainer.addEventListener('scroll', () => {
            this.scrollHandler();
        });


        // 查询文章目录标题元素
        let headers = document.querySelectorAll(this.ArticleHeaderQuery);
        if(!headers) { console.warn('没有找到文字目录标题元素'); return; }
        this.articleHeaderElements = headers;
        // 查询 TOC 目录元素
        let tocNavigation = document.querySelector(this.TocNavigationQuery);
        if(!tocNavigation) { console.warn('没有找到 TOC 目录元素'); return; }

        // 查询 TOC 目录导航元素
        let navigationItems = document.querySelectorAll(this.TocNavigationItemQuery);
        if(!navigationItems) { console.warn('没有找到目录导航元素'); return; }
        console.debug('所有的目录导航项',navigationItems);
        navigationItems
        let superNavigationItems = Array.from(navigationItems).filter(item => {
            return item.querySelector('ol') !== null
        });

        console.debug('所有的父级目录',superNavigationItems);

        for (const item of superNavigationItems) {
            console.debug('父级目录',item);
            // 默认收起子目录
            let subNavigation = item.querySelector('ol');
            if(subNavigation && !hasClass(subNavigation, this.NavItemHiddenClass)){
                addClass(subNavigation, this.NavItemHiddenClass);
            }
            // 为父级目录添加展开/收起图标样式
            let link = item.getElementsByTagName('a')[0];
            if(link && subNavigation){
                addClass(link, 'toc-toggle');
            }
            item.getElementsByTagName('a')[0].addEventListener('click', (event) => {
                console.debug('父级目录点击事件',event);
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
        
        
        this.setupArticleHeaderOffset(this.articleHeaderElements);
        this.setupNavItemsLinkRef(navigationItems);

    },

    /// 页面滑动时处理
    scrollHandler: function(){

        if (!this.articleContainer) { return }
        if (this.articleHeaderOffset.length <= 0) { return }
        // 获取当前文章容器的滚动位置
        let scrollPosition = this.articleContainer.scrollTop;
        // 获取文章容器的顶部位置
        let offsetTop = this.articleContainer.offsetTop;
        // 声明新的激活目录导航项


        var newActive = this.articleHeaderOffset.reduce((prev, curr) => {
            let prevOffset = prev.offset - scrollPosition  ;
            let currOffset = curr.offset - scrollPosition  ;
            return Math.abs(prevOffset) < Math.abs(currOffset) ? prev : curr;
        });

        console.debug(scrollPosition, newActive);

        var newActiveLink;
        if(newActive){
            newActiveLink = this.navItemsLinkRef[newActive.id];
        }

        if(newActive && !newActiveLink){
            console.debug('没有找到目录 item 的 a 链接');
        }else if(newActiveLink !== this.currentNavItemLink){
            if(this.currentNavItemLink){
                // 移除之前激活的目录导航项的激活 class
                removeClass(this.currentNavItemLink, this.ActiveNavItemClass);

                // 检查是否需要移除父级目录的激活状态
                this.updateParentActiveState(this.currentNavItemLink, false);
            }
            if(newActiveLink){
                // 为新的目录导航项添加激活 class
                addClass(newActiveLink, this.ActiveNavItemClass);

                // 检查是否需要为父级目录添加激活状态（当父级目录收起时）
                this.updateParentActiveState(newActiveLink, true);

                // 检查是否需要展开父级目录
                this.expandParentIfNeeded(newActiveLink);

                // 滚动选中项到可视区域
                this.scrollActiveItemIntoView(newActiveLink);
            }
        }
        console.debug(newActive, newActiveLink);
        this.currentNavItemLink = newActiveLink;
    },

    /// 更新父级目录的激活状态
    updateParentActiveState: function(activeLink, isActivating){
        // 查找父级 li 元素
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

    /// 展开父级目录（如果当前激活的是子项）
    expandParentIfNeeded: function(activeLink){
        // 查找父级 li 元素
        let currentLi = activeLink.closest('li');
        if(!currentLi) return;

        let parentLi = currentLi.parentElement.closest('li');
        if(parentLi && parentLi.querySelector('ol')){
            // 找到父级目录的子目录容器
            let subNavigation = parentLi.querySelector('ol');
            // 如果子目录是隐藏的，则展开它
            if(hasClass(subNavigation, this.NavItemHiddenClass)){
                removeClass(subNavigation, this.NavItemHiddenClass);
                // 同时更新图标状态
                let parentLink = parentLi.querySelector('a');
                if(parentLink && hasClass(parentLink, 'toc-toggle')){
                    addClass(parentLink, 'expanded');
                    // 展开时移除父级目录的激活状态（因为子目录会显示）
                    removeClass(parentLink, this.ActiveNavItemClass);
                }
            }
        }
    },

    /// 滚动激活的目录项到可视区域
    scrollActiveItemIntoView: function(activeLink){
        if(!activeLink) return;

        let tocContainer = document.querySelector(this.TocNavigationQuery);
        if(!tocContainer) return;

        // 使用 requestAnimationFrame 确保 DOM 更新后再滚动
        requestAnimationFrame(() => {
            activeLink.scrollIntoView({
                behavior: 'smooth',
                block: 'center', // 垂直居中
                inline: 'nearest' // 水平就近
            });
        });
    },


    /// 窗口大小变化时处理
    resizeHandler: function(){
        if(!this.articleContainer) { return }
        this.setupArticleHeaderOffset(this.articleHeaderElements);
        this.scrollHandler();
    }
}

export { scrollspy };