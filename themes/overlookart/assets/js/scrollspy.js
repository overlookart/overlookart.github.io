
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

    navItemsLinkRef: {},

    /// 文章内容的所有标题元素
    articleHeaderElements: [],

    /// 文章内的标题位置
    articleHeaderOffset: [],
    /// 当前的导航项
    currentNavItemLink: null,
    /// 是否为文章页
    isArticle: false,

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

        this.isArticle = document.getElementById('article') ? true : false;
        if(!this.isArticle) {console.warn('未找到文章页的标识'); return; }

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

        this.setupArticleHeaderOffset(headers);
        this.setupNavItemsLinkRef(navigationItems);

    },

    /// 页面滑动时处理
    scrollHandler: function(){
        if (!this.isArticle) { return }
        let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

        var newActive;
        this.articleHeaderOffset.forEach(item => {
            if(scrollPosition >= item.offset - 80){
                newActive = document.getElementById(item.id);
            }
        });
    
        var newActiveLink;
        if(newActive){
            newActiveLink = this.navItemsLinkRef[newActive.id];
        }

        if(newActive && !newActiveLink){
            console.debug('没有找到目录 item 的 a 链接');
        }else if(newActiveLink !== this.currentNavItemLink){
            if(this.currentNavItemLink){
                // 移除之前激活的目录导航项的激活 class
                this.currentNavItemLink.classList.remove(this.ActiveNavItemClass);
            }
            if(newActiveLink){
                // 为新的目录导航项添加激活 class
                newActiveLink.classList.add(this.ActiveNavItemClass);
            }
        }
        console.debug(newActive, newActiveLink);
        this.currentNavItemLink = newActiveLink;
    },


    /// 窗口大小变化时处理
    resizeHandler: function(){
        if(!this.isArticle) { return }
        this.setupArticleHeaderOffset(this.headers);
        this.scrollHandler();
    }
}

export { scrollspy };