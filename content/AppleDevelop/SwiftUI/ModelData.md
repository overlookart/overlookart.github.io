---
# 文章的标题
title: "ModelData"
# 文章的时间
date: 2025-08-06T09:41:58+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "用来驱动页面的数据"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

SwiftUI为用户界面设计提供了一种声明性方法。当您组成视图层次结构时，您还指示了视图与数据依赖关系。当数据发生变化时，无论是由于外部事件还是由于用户执行的操作，SwiftUI会自动更新界面的受影响部分。

## @State

**State** 是一种属性包装器类型，可以读取和写入值来管理 SwiftUI 的视图。

使用 **State** 作为存储在视图层次结构中的给定值类型的单一真实来源。通过将 `@State` 属性应用于属性声明并提供初始值，在应用程序、场景或视图中创建状态值。将状态声明为私有状态，以防止在成员初始化器中将其设置，这可能与SwiftUI提供的存储管理相冲突：

``` swift
struct ContentView: View {
    @State private var isVisible: Bool = false
    var body: some View {
        VStack {
            Toggle("Toggle", isOn: $isVisible)
            if isVisible {
                Text("Hello, World!")
            }
        }
    }
}
```

> [!Warning]
> 不要将 State 属性用于持久存储，因为 State 变量的生命周期反映了视图生命周期。相反，使用它们来管理只影响用户界面的瞬态状态，例如按钮的高亮显示状态、过滤器设置或当前选定的列表项。在准备更改应用程序的数据模型之前，您可能也会发现这种存储在原型时很方便。

## @Binding

**Binding** 是一种属性包装器类型，可以读取和写入值的引用。使用 **Binding** 将外部的属性值绑定到自身属性上，从而建立双向绑定关系。