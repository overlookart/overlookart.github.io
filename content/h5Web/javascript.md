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

# Javascript 常用脚本  

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

### Array 去重  

``` js
var newArr = [...new Set(array)]
```

