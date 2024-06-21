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

* [探索 SwiftUI APP 的结构](https://developer.apple.com/tutorials/swiftui-concepts/exploring-the-structure-of-a-swiftui-app)

## 创建一个 APP  

使用 `@main` 为程序提供入口初始化并运行 APP
声明APP 结构体,并遵守 `App` 协议

> `App`协议，提供应用程序的内容及其行为, 遵守该协议后，必须实现 `body` 这个计算属性，此属性返回应用场景的内容。场景包含定义应用程序用户界面的视图层次结构。SwiftUI提供不同类型的场景，包括 `WindowGroup`、`Window`、`DocumentGroup`和`Settings`。

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

## 自定义场景  

在不同的系统下使用不同的应用场景  
