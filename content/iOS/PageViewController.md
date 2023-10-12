---
# 文章的标题
title: "UIPageViewController"
# 文章的时间
date: 2023-10-10T09:10:31+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "UIPageViewController 的使用"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

## 创建一个 PageViewController  

``` swift
// transitionStyle 指定页面切换时的过渡样式
// navigationOrientation 指定页面切换导航方向 水平，垂直
let pageVC = UIPageViewController(transitionStyle: .scroll, navigationOrientation: .vertical)
```  

## 协议代理  

UIPageViewControllerDelegate  

UIPageViewControllerDataSource  

