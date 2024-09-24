import * as params from '@params';
import lax from './modules/lax'
import { scrollspy } from './scrollspy';

console.debug('加载主脚本');

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
    scrollspy.setup();
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
