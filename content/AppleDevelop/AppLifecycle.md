---
# 文章的标题
title: "App生命周期"
# 文章的时间
date: 2023-04-21T09:18:39+08:00
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

## App 的生命周期  

* 在iOS 13及更高版本中，使用UISceneDelegate对象在基于 Scene 的应用程序中响应生命周期事件。  
* 在iOS 12及更早版本中，使用UIApplicationDelegate对象响应生命周期事件。  

> 在iOS 13及更高版本的项目中配置 Scene  
> 在 Info.plist文件中添加UIApplicationSceneManifest密钥，指定应用程序支持的场景中所述。

``` swift
//
```  
