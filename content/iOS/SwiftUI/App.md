---
# 文章的标题
title: "App"
# 文章的时间
date: 2023-12-25T10:33:44+08:00
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

表示应用程序结构和行为的协议类型

`iOS 14.0+`  `macOS 11.0+` `Mac Catalyst 14.0+` `tvOS 14.0+` `watchOS 7.0+` `visionOS 1.0+ Beta`  

## 创建一个 APP  

使用 `@main` 为程序提供入口初始化并运行 APP
声明APP 结构体,并遵守 `App` 协议

``` swift
@main  // main()方法的默认实现
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            Text("Hello, world!")
        }
    }
}
```  
