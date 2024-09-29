import * as params from '@params';
import lax from './modules/lax'
import { scrollspy } from './scrollspy';

console.debug('加载主脚本');
console.debug('document', document);
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

window.onload = () => {
    console.debug('整个页面及所有依赖资源如样式表和图片都已完成');
    debounced(scrollspy.resizeHandler());
}

window.oncopy = (event) => {
    console.debug('复制!', event);
}

window.onpaste = (event) => {
    console.debug('粘贴!', event);
}

window.oncut = (event) => {
    console.debug('剪切!', event);
}

window.ononline = (event) => {
    console.debug('在线!', event);
}
window.onoffline = (event) => {
    console.debug('离线!', event);
}

window.onhashchange = (event) => {
    console.debug('URL改变!', event);
}

window.onpopstate = (event) => {
    console.debug('导航!', event)
}

window.onpageshow = (event) => {
    console.debug('进入页面!', event);
    // setupScrollspy();
}
window.onpagehide = (event) => {
    console.debug('离开页面!', event);
}
window.onbeforeunload = (event) => {
    console.debug('卸载页面!', event);
}

window.onresize = (event) => {
    console.debug('窗口大小调整!', event);
    debounced(scrollspy.resizeHandler());
}

window.addEventListener('scroll', () => {
    
});

document.addEventListener('DOMContentLoaded', () => {
    console.debug('DOM树 加载完成!');
    scrollspy.setup();
});

document.addEventListener('readystatechange', (event) => {
    if (event.target.readyState === 'loading') {
        console.debug('DOM 仍在加载中...');
    } else if (event.target.readyState === 'interactive') {
        console.debug('DOM 已可交互');
    } else if (event.target.readyState === 'complete') {
        console.debug('DOM 所有资源加载完成!');
    }
});