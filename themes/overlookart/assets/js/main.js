import * as params from '@params';
import lax from './modules/lax'
console.debug('加载主脚本');

window.onload = function () {
    lax.init()
    console.debug('初始化 lax');
    
    // 添加动画驱动
    lax.addDriver('scrollY', function () {
            return window.scrollY
        },
        inertiaEnabled = true
    )

    // 向元素添加动画绑定
    lax.addElements('.selector', {
        scrollY: {
            translateX: [
                [0,  "pageHeight"],
                [0, 'pageWidth'],
                {
                    inertia: 10
                }
            ]
        }
    })
}