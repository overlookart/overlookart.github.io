/// 判断一个元素是否有指定的 class
export function hasClass(element, className) {
    return element.classList.contains(className);
}
/// 为元素添加指定的 class
export function addClass(element, className) {
    if(!hasClass(element, className)) {
        element.classList.add(className);
    }
}
/// 为元素移除指定的 class
export function removeClass(element, className) {
    if(hasClass(element, className)) {
        element.classList.remove(className);
    }
}