---
# 文章的标题
title: "数组 Array"
# 文章的时间
date: 2025-02-06T09:42:11+08:00
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
author: "OverLookArt"
---

## 截取数组中前 n 个元素  

``` Swift
    var arr = ["a", "b", "c"]
    // 截取前2个元素
    arr = Array(arr.prefix(2))
    // ["a", "b"]
```

## 插入元素  

``` Swift
    var arr = ["a", "b", "c"]
    arr.insert("-", at: 2)
    // ["a", "b", "-", "c"]
```

## 遍历数组  

``` Swift
    var arr = ["a", "b", "c"]
    for item in arr {
    
    }
    /// 元素下标的遍历 index:下标 item：元素
    for (index, item) in arr.enumerated() {

    }
```

## 数组去重  

``` Swift
    var arr = ["a", "b", "a", "c"]
    
```