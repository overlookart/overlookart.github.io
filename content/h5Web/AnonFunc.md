---
# 文章的标题
title: "匿名函数"
# 文章的时间
date: 2023-07-27T12:55:42+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "文章描述"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverookArt"
---

匿名函数，主要利用函数内的变量作用域，避免产生全局变量，影响整体页面环境，增加代码的兼容性。

``` js
(function(){

})()
```

这是一个标准的函数定义，但是没有赋值给任何变量。没有函数名就无法像普通函数那样随时随地调用了，所以在他定义完成后就马上调用他，后面的括号()是运行这个函数的意思。

如下几种写法作用是相同的

``` js
// “!”的作用是将function(){}函数体转为一个函数表达式。
!function () { /* ... */ }();
~function () { /* ... */ }();
-function () { /* ... */ }();
+function () { /* ... */ }();
void function () { /* ... */ }();
(function (){/*...*/}());
(function (){/*...*/})();
```
