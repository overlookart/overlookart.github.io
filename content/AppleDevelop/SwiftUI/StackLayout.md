---
# 文章的标题
title: "Stack Layout"
# 文章的时间
date: 2025-10-09T11:48:52+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "Stack 视图是 SwiftUI 中最原始的布局容器。使用堆栈将视图集合分组为水平布局或垂直布局，或将它们堆叠在一起。"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

Stack 视图是 SwiftUI 中最原始的布局容器。使用堆栈将视图集合分组为水平布局或垂直布局，或将它们堆叠在一起。

**HStack** 将视图以水平方式布局，**VStack** 将视图以垂直方式布局，**ZStack** 将视图以堆叠方式布局。

## HStack

**HStack** 可将子视图以**水平**排列的方式展示。

创建方法：

``` Swift
init(
    alignment: VerticalAlignment = .center, // 垂直对其方式 top:顶部对齐 bottom:底部对齐 center:垂直居中
    spacing: CGFloat? = nil, // 子视图之间的间距
    @ViewBuilder content: () -> Content // 视图构建器
)
```

使用示例：

``` Swift
var body: some View {
    HStack(alignment: .top, spacing: 10) {
        SomeView()
        SomeView()
        SomeView()
    }
}
```

> [!NOTE]
> 当 **HStack** 中有大量的子视图，进行加载时，可能会导致性能问题。可以使用 **LazyHStack** 来替代 **HStack**，它会按需加载子视图，从而提高性能。

## VStack

**VStack** 可将子视图以**垂直**排列的方式展示。

创建方法

``` swift
init(
    alignment: HorizontalAlignment = .center, // 水平对其方式 leading:左对齐 trailing:右对齐 center:水平居中
    spacing: CGFloat? = nil, // 视图之间的间距
    @ViewBuilder content: () -> Content // 视图构建器
)
```

使用示例：

``` swift
VStack(alignment: .leading, spacing: 16) {
    SomeView()
    SomeView()
    SomeView()
}
```

## ZStack

**ZStack** 可将子视图以**堆叠**方式展示

创建方法

``` swift
init(
    alignment: Alignment = .center, //对齐方式     
    @ViewBuilder content: () -> Content //视图构建器
)
```

> Alignment 对齐方式枚举
>
> * center: 居中对齐
> * leading: 左对齐
> * trailing: 右对齐
> * top: 上对齐
> * bottom: 下对齐
> * topLeading: 左上对齐
> * topTrailing: 右上对齐
> * bottomLeading: 左下对齐
> * bottomTrailing: 右下对齐

使用示例：

``` swift
ZStack(alignment: .topLeading) {
    Circle().frame(width: 200, height: 200)
    Circle().frame(width: 150, height: 150).foregroundColor(.accentColor)
    Circle().frame(width: 100, height: 100).foregroundColor(.blue)
    Circle().frame(width: 50, height: 50).foregroundColor(.red)
}
.border(Color.green, width: 1)
```
