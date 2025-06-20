---
# 文章的标题
title: "SwiftUI"
# 文章的时间
date: 2023-12-25T09:58:09+08:00
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

[SwiftUI Apple 介绍页](https://developer.apple.com/cn/xcode/swiftui/)

SwiftUI 提供了用于**声明** App 用户界面的视图、控件和布局结构。该框架提供了事件处理程序，用于向 App 传递轻点、手势和其他类型的输入，并提供了工具，用于管理从 App 模型到用户能够看到并与之互动的视图和控件之间的数据流。

与 UIKit 命令式用户界面相比，声明式用户界面最好理解，命令式用户界面是iOS开发人员在iOS 13之前所做的。在命令式用户界面中，我们可能会在单击按钮时调用函数，在函数中，我们会读取一个值并显示一个标签——我们定期根据正在发生的事情修改用户界面的外观和工作方式。

使用 App 协议定义你的 App 结构，并使用各种场景填充该结构，其中场景包含构成 App 用户界面的各种视图。创建遵从 View (英文) 协议的自定义视图，并通过 stacks、lists 等将显示文本、图像和自定形状的 SwiftUI 视图组合起来。为内建视图和你自己的视图应用功能强大的修饰符，自定其渲染和交互行为。利用可适应具体情境和呈现形式的视图和控件，在多个平台上的 App 之间共享代码。

适用平台  

* iOS 13.0+
* macOS 10.15+
* Mac Catalyst 13.0+
* Apple tvOS 13.0+
* watchOS 6.0+  

| 用户界面 | SwiftUI | UIKit | 
| --- | --- | --- |
| 编写方式 | 声明式 | 命令式 |