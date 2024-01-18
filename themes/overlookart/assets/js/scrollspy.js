
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

/// 查询 Toc 目录元素
const TocNavigationQuery = '#TableOfContents';

/// 查询 Toc 导航项的 id和标签
const TocNavigationItemQuery = '#TableOfContents li';

/// 查询文章标题 header 的 css和标签及id
const ArticleHeaderQuery = 'h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]';


const scrollToTocElement = (tocItemElement, tocNavigation) => {
    let itemHeight = tocItemElement.querySelector("a").offsetHeight;

    let scrollTop = tocItemElement.offsetTop - tocNavigation.offsetHeight / 2 + itemHeight / 2 - tocNavigation.offsetTop;

    if(scrollTop < 0) {
        scrollTop = 0;
    }

    tocNavigation.scrollTo({ top: scrollTop, behavior: 'smooth'});
} 

const buildIdToNavigationElementMap = (navigationItems) => {
    const navigationItemLinkRef = {};
    navigationItems.forEach(item => {
        const link = item.querySelector('a');
        const href = link.getAttribute('href');
        if(href.startsWith('#')) {
            navigationItemLinkRef[href.slice(1)] = item;
        }
    });
    return navigationItemLinkRef;
}

/// 计算文章目录标题偏移量
const computeArticleHeaderOffset = (headers) => {
    let sectionsOffsets = [];
    headers.forEach(header => {
        sectionsOffsets.push({id: header.id, offset: header.offsetTop });
        sectionsOffsets.sort((a, b) => { a.offset - b.offset });
    });
    return sectionsOffsets;
} 

/// 滑动处理
const scrollHandler = (offsets) => {
    let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    var newActive;
    offsets.forEach(item => {
        if(scrollPosition >= item.offset - 80){
            newActive = document.getElementById(item.id);
        }
    });
    
    var newActiveLink;
    if(newActive){
        // newActiveLink = 
    }

    console.debug(newActive);

}

const setupScrollSpy = () => {
    // 查询文章目录标题元素
    let headers = document.querySelectorAll(ArticleHeaderQuery);
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

    window.addEventListener('scroll', () => {
        scrollHandler(articleHeadersOffset);
    });
}

export { setupScrollSpy };