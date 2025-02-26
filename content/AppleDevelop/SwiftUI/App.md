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

**App**是表示应用程序`结构`和`行为`的协议类型

`iOS 14.0+`  `macOS 11.0+` `Mac Catalyst 14.0+` `tvOS 14.0+` `watchOS 7.0+` `visionOS 1.0+ Beta`  

* [探索 SwiftUI APP 的结构](https://developer.apple.com/tutorials/swiftui-concepts/exploring-the-structure-of-a-swiftui-app)

## 创建一个 APP  

应用程序结构描述了应用程序的内容和行为，每个SwiftUI应用程序只有一个主应用程序结构。此示例在MyApp.swift文件中定义了其应用程序结构。让我们来看看那个文件的内容。


1. 导入 SwiftUI 框架。
2. 使用 `@main` 为应用程序提供入口并启动应用程序。应用程序的入口只有一个
3. 声明一个应用程序的结构体,并遵守 `App` 协议，提供应用程序的内容及其行为。
4. 实现 **App** 协议的 `body` 计算属性，此属性返回应用场景的内容。场景包含定义应用程序用户界面的视图层次结构。
5. 使用 `WindowGroup` 作为应用程序的主窗口。对于 iOS 平台通常只需要一个主窗口，但在 macOS 和 iPadOS 平台会有多个窗口。
6. 在 **WindowGroup** 添加一个遵守 `View` 协议的系统视图结构或自定义的视图结构在窗口中展示。


``` swift
// MyApp.swift
import SwiftUI
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
