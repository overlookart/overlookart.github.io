---
# 文章的标题
title: "ModelData"
# 文章的时间
date: 2025-08-06T09:41:58+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "用来驱动 SwiftUI 视图的数据"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

SwiftUI 为用户界面设计提供了一种声明性方法。当组成视图层次结构时，需要建立视图与数据依赖关系。当数据发生变化时，无论是由于外部事件还是由于用户执行的操作，SwiftUI 会自动更新界面的受影响的视图。

## State

**State** 是一种属性包装器类型，可以读取和写入值来管理 SwiftUI 的视图。

使用 **State** 作为存储在视图层次结构中的给定值类型的单一真实来源。通过将 `@State` 属性应用于属性声明并提供初始值，在应用程序、场景或视图中创建状态值。将状态声明为私有状态，以防止在成员初始化器中将其设置。

``` swift
struct VisibleBtn: View {
    @State private var isVisible: Bool = false
    var body: some View {
        Button(isVisible ? "隐藏" : "显示") {
            isVisible.toggle()
        }
    }
}
```

SwiftUI 管理 State 属性的存储。当 State 属性值发生变化时，SwiftUI会更新视图层次结构中依赖于该值的视图。要访问状态的底层值，请使用其 wrappedValue 属性。然而，作为快捷方式，Swift允许您通过直接引用状态实例来访问包装值。上述示例通过直接引用属性来读取和写入 isVisible 状态属性的包装值。

> [!Warning]
> 不要将 State 属性用于持久存储，因为 State 变量的生命周期反映了视图生命周期。相反，使用它们来管理只影响用户界面的瞬态状态，例如按钮的高亮显示状态、过滤器设置或当前选定的列表项。在准备更改应用程序的数据模型之前，您可能也会发现这种存储在原型时很方便。

## Binding

**Binding** 是一种属性包装器类型，可以读取和写入值的引用。使用 `@Binding` 接收外部的属性值并绑定到自身属性上，从而建立双向绑定关系。

``` Swift
struct VisibleBtn: View {
    @Binding public var isVisible: Bool
    var body: some View {
        Button(isVisible ? "隐藏" : "显示") {
            isVisible.toggle()
        }
    }
}
```

当初始化子视图时，通过在 State 属性名称前加上 `$` 符来访问 *projectedValue* 获取属性值的绑定，并将其传递到子视图中，完成绑定关系。不论是从子视图的外部还是内部修改绑定属性的值，与该属性值都会发生改变。

``` Swift
struct ContentView: View {
    @State private var isVisible: Bool = false
    var body: some View {
        VStack {
            VisibleBtn(isVisible: $isVisible)
            if isVisible {
                Text("Hello Text")
            }
        }
    }
}
```

## ObservableObject

遵循 **ObservableObject** 的类可创建一个可观察对象。成员属性使用 `@Published` 属性包装器来标记。当属性值发生变化时，可观察对象会发布通知。SwiftUI 视图可以使用 `@ObservedObject` 属性包装器来订阅可观察对象的变化。

``` swift
class ObjectModel: ObservableObject {
    @Published var name = "Some Name"
    @Published var isEnabled = false
}
```

## StateObject

**StateObject** 是一个可观察对象的属性包装器类型。使用 `@StateObject` 在 **App**、**Scene** 和 **View** 内声明符合 *ObservableObject* 协议的状态对象。状态对象作为您存储在视图层次结构中的参考类型的单一真实来源。通过将属性应用于属性声明并提供符合ObservableObject协议的初始值。

``` swift
struct ObjectObservedView: View {
    @StateObject private var model = ObjectModel()
    var body: some View {
        Text(model.name)
        Text("\(model.isEnabled)")
    }
}

```

## ObservedObject



## EnvironmentObject

## DynamicProperty