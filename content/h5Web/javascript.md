---
# 文章的标题
title: "Javascript 常用脚本"
# 文章的时间
date: 2023-02-27T10:27:01+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "文章描述"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate: 2023-02-27T10:27:01+08:00 
# 文章的发布时间  未到达发布时间不会发布到文章列表
publishDate: 2023-02-27T10:27:01+08:00
# 上次修改的日期
lastmod: 2023-02-27T10:27:01+08:00
# 作者
author: "OverookArt"
---

## 格式化时间[Date]

``` js
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
const dateFormat = new Date().Format("yyyy-MM-dd hh:mm:ss");
```

## 深拷贝对象(Object)  

``` js
var val = JSON.parse(JSON.stringify(object));
```

## Array 数组  

### 移除某个元素  

``` js
Array.prototype.remove = function(val) { 
    var index = this.indexOf(val); 
    if (index > -1) { 
        this.splice(index, 1); 
    } 
};
```

### Array 假值去除  

``` js
const removeFalsy = (arr) => arr.filter(Boolean);

removeFalsy([0, 'a', '', 'as', 'NaN', true, undefined, false]);

//['a', 'as', true]
```

### Array 去重  

``` js
var newArr = [...new Set(array)]
```

### Array 插入数据  

``` js
// splice(start: number, deleteCount: number, ...items: T[])
var arr = [];
// 在头部插入一个或多个数据; start:要插入数据的位置
arr.splice(0,0,object);
// 或者使用 unshift 方法在头部插入一个或多个数据 
arr.unshift(object);
```

## 生成随机  

``` js
// 随机数字
const random = (min, max) => Math.floor(Math.random() * (max-min+1)+min);

// 随机字符串
const randomString = () => Math.random().toString(36).slice(2);

// 随机色
const randomColor = () => `#${Math.random().toString(16).slice(2,8).padEnd(6,'0')}`

```

## 转义 HTML 特殊字符  

``` js
const escape = (str) => str.replace(/[&<>"']/g, (m) => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[m]));

escape('<div class="medium">');

//&lt;div class=&quot;medium&quot;&gt;
```

## 检测暗黑模式  

``` js
const isDarkMode = window.matchMedia && window.matchMedia('prefers-color-scheme: dark').matches;
```

## 清除所有的cookie  

``` js
const clearCookies = () => {
    document.cookie.split(';').forEach( c => {
        document.cookie = c.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)
    })
}
```

## 将字符串转为小驼峰  

``` js
const toCamelCase = (str) => str.trim().replace(/[-_\s]+(.)?/g, (_,c) => (c?c.toUpperCase():''));
```

## 大小写转换  

``` js
/**
 * str: 待转换的字符串
 * type: 1全大写，2全小写，3首字母大写
 */
const turnCase = (str, type) => {
    switch (type) {
        case 1:
            return str.toUpperCase();
        case 2:
            return str.toLowerCase();
        case 3:
            return str[0].toUpperCase() + str.substring(1).toLowerCase();
        default:
            return str
    }
}
```

## 校验数据类型  

``` js
const typeOf = (obj) => {
    return Object.prototype.toString.call(obj).slice(8,-1);
}
```

## 防抖  

``` js
const debounce = () => {
    let timer = null
    return (callback, wait = 800) => {
        timer&&clearTimeout(timer)
        timer = setTimeout(callback, wait)
    }
}

```

## 手机号脱敏  

``` js
const hideMobile = (mobile) => {
    reture mobile.replace(/^(\d{3})\d{4}(\d{4})$/,"$1****$2");
}
```

## 开启全屏  

``` js
const launchFullScreen = (element){
    if(element.requestFullscreen){
        element.requestFullscreen();
    }else if (element.mozRequestFullScreen){
        element.mozRequestFullScreen();
    }else if (element.msRequestFullscreen){
        element.msRequestFullscreen();
    }else if (element.webkitRequestFullscreen){
        element.webkitRequestFullscreen();
    }
}
```

## 关闭全屏  

``` js
const exitFullScreen = () => {
    if(document.exitFullscreen){
        document.exitFullscreen();
    }else if (document.msExitFullscreen){
        document.msExitFullscreen();
    }else if (document.mozCancelFullScreen){
        document.mozCancelFullScreen();
    }else if (document.webkitExitFullscreen){
        document.webkitExitFullscreen();
    }
}
```

## 解析URL参数  

``` js
const getSearchParams = () => {
    const searchPar = new URLSearchParams(window.location.search);
    const paramsObj = {};
    for (const [key, value] of searchPar.entries()){
        paramsObj[key] = value;
    }
    return paramsObj;
}
```

## 判断设备类型  

``` js
const getOSType = () => {
    let u = navigator.userAgent;
    let app = navigator.appVersion;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isIOS) {
        return 1;
    } else if (isAndroid) {
        return 2;
    }else {
        return 3;
    }
}
```

## 滚动到页面顶部  

``` js
const scrollToTop = () => {
    const height = document.documentElement.scrollTop || document.body.scrollTop;
    if(height > 0){
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, height - height / 8);
    }
}
```

## 滚动到元素的位置  

``` js
const smoothScroll = (element) => {
    document.querySelector(element).scrollIntoView({
        behavior: 'smooth'
    });
}
```

## uuid

``` js
const uuid = () => {
    const temp_url = URL.createObjectURL(new Blob());
    const uuid = temp_url.toString();
    //释放这个URL
    URL.revokeObjectURL(temp_url);
    return uuid.substring(uuid.lastIndexOf('/')+1);
}
```

## 金额格式化  

``` js
/**
 * number: 要格式化的数字
 * decimals: 保留几位小数
 * dec_point: 小数点符号
 * thousands_sep: 千分位符号
 */
const moneyFormat = (number, decimals, dec_point, thousands_sep) => {
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    const n = !isFinite(+number) ? 0 : +number;
    const prce = !isFinite(+decimals) ? 2 : Math.abs(decimals);
    const sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep;
    const dec = typeof dec_point === 'undefined' ? '.' : dec_point;
    let s = '';
    const toFixedFix = function(n, prec) {
        const k = Math.pow(10, prec)
        return '' + Math.ceil(n*k)/k;
    }
    s = (prec ? toFixedFix(n, prec) : ''+Math.round(n)).split('.');
    const re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, '$1' + sep + '$2');
    }
    if((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}
```