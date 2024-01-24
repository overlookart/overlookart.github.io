
//https://gomakethings.com/debouncing-your-javascript-events/
const debounced = (func) => {
    let timeout;
    return () => {
        if(timeout){
            window.cancelAnimationFrame(timeout);
        }
        timeout = window.requestAnimationFrame(func);
    }
}


const scrollToTocElement = (tocItemElement, tocNavigation) => {
    let itemHeight = tocItemElement.querySelector("a").offsetHeight;

    let scrollTop = tocItemElement.offsetTop - tocNavigation.offsetHeight / 2 + itemHeight / 2 - tocNavigation.offsetTop;

    if(scrollTop < 0) {
        scrollTop = 0;
    }

    tocNavigation.scrollTo({ top: scrollTop, behavior: 'smooth'});
}  

const setupScrollspy = () => {
    // 查询文章目录标题元素
    let headers = document.querySelectorAll(thisArticleHeaderQuery);
    if(!headers) { console.warn('没有找到文字目录标题元素'); return; }

    // 查询 TOC 目录元素
    let tocNavigation = document.querySelector(TocNavigationQuery);
    if(!tocNavigation) { console.warn('没有找到 TOC 目录元素'); return; }

    // 查询 TOC 目录导航元素
    let navigationItems = document.querySelectorAll(TocNavigationItemQuery);
    if(!navigationItems) { console.warn('没有找到目录导航元素'); return; }

    let articleHeadersOffset = computeArticleHeaderOffset(headers);
    console.debug(articleHeadersOffset);

    let navigationItemLinkRef = buildIdToNavigationElementMap(navigationItems);
    console.debug(navigationItemLinkRef);

    var navItemLink;

    window.addEventListener('scroll', () => {
        navItemLink = scrollHandler(articleHeadersOffset, navigationItemLinkRef, navItemLink);
    });
}

const scrollspy = {
    // 查询 Toc 目录元素
    TocNavigationQuery: '#TableOfContents',
    /// 查询 Toc 导航项的 id和标签
    TocNavigationItemQuery: '#TableOfContents li',
    /// 查询文章标题 header 的 css和标签及id
    ArticleHeaderQuery: 'h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]',

    ActiveNavItemClass: 'active-nav-item',

    navItemsLinkRef: {},
    
    articleHeaderOffset: [],

    currentNavItemLink: null,

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

    setupArticleHeaderOffset: function(headers){
        var offsets = [];
        headers.forEach(header => {
            offsets.push({id: header.id, offset: header.offsetTop });
            offsets.sort((a, b) => { a.offset - b.offset });
        });
        this.articleHeaderOffset = offsets;
    },

    setup: function(){
        // 查询文章目录标题元素
        let headers = document.querySelectorAll(this.ArticleHeaderQuery);
        if(!headers) { console.warn('没有找到文字目录标题元素'); return; }

        // 查询 TOC 目录元素
        let tocNavigation = document.querySelector(this.TocNavigationQuery);
        if(!tocNavigation) { console.warn('没有找到 TOC 目录元素'); return; }

        // 查询 TOC 目录导航元素
        let navigationItems = document.querySelectorAll(this.TocNavigationItemQuery);
        if(!navigationItems) { console.warn('没有找到目录导航元素'); return; }

        this.setupArticleHeaderOffset(headers);
        this.setupNavItemsLinkRef(navigationItems);

    },

    scrollHandler: function(){
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
    }
}

export { setupScrollspy, scrollspy };