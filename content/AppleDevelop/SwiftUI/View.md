---
# 文章的标题
title: "View"
# 文章的时间
date: 2025-04-21T10:12:03+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "应用程序中的视图需要遵守的协议"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

**视图**是您用来声明应用程序的用户界面的基本元素。每个视图都包含对给定状态显示内容的描述。用户可见的应用程序的每个位都来自视图中的描述，任何符合 `View` 协议的类型都可以充当应用程序中的视图。

## 新建视图

通过定义一个结构体并遵守 `View` 协议， 来声明自定义视图类型。必须实现符合 `View` 协议的 **body** 计算属性。`body` 为视图提供内容和行为。

``` Swift
struct CustomView: View {
    var body: some View {
        Text("CustomView")
    }
}
```

> [!Note]
> **body** 计算属性只能有效接收一个内容，如果 body 内有多个内容时只会展示第一个内容，在视图中展示多个内容时，需要将多个内容组装到一个视图容器中，如 `VStack`、`HStack`或自定义视图容器等。

## 配置视图

**ViewModifier**：是一个协议，提供了一种方法来封装视图的修饰逻辑。

使用修饰符来配置视图。修饰符只不过是在特定视图上调用的方法。该方法返回一个新的、更改的视图，该视图在视图层次结构中有效地取代了原始视图。

## 生命周期

## 管理视图

## 标题及样式

* `navigationTitle(_:)` 为视图配置导航标题
* `navigationBarTitleDisplayMode(_:)` 为视图的标题配置显示模式。

``` Swift
struct CustomView: View {
    var body: some View {
        Text("CustomView")
            .navigationTitle("导航")
            .navigationBarTitleDisplayMode(.inline)
    }        
}
```