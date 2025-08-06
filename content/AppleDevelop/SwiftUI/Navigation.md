---
# 文章的标题
title: "Navigation"
# 文章的时间
date: 2025-03-04T16:58:39+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "页面之间的导航"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

> 如果您的应用最低部署目标是 iOS 16、iPadOS 16、macOS 13、tvOS 16、watchOS 9 或 visionOS 1 或更高版本，请使用 NavigationStack 和 NavigationSplitView 实例代替 NavigationView 。您如何使用这些内容取决于您是在一列中还是跨多个列进行导航。有了这些较新的容器，您可以更好地控制视图演示、容器配置和程序化导航。

## 设置标题

* 调用 `navigationTitle(_:)` 方法， 将字符串设置为导航视图的标题。
* 调用 `navigationBarTitleDisplayMode(_:)` 方法为导航标题设置显示模式。该方法的参数类型为 NavigationBarItem.TitleDisplayMode 枚举。默认值为 **large**。
  **automatic**: 应用上一个导航项目中的显示模式。
  **inline**: 在导航栏中显示标题，不会随页面内容而变化。
  **large**: 在导航栏中显示大标题，随页面内容滚动而变化。

``` Swift
if #available(iOS 16.0, *) {
    NavigationStack {
        ContentView()
            .navigationTitle("标题")
            .navigationBarTitleDisplayMode(.inline)
    }
} else {
    NavigationView {
        ContentView()
            .navigationTitle("标题")
            .navigationBarTitleDisplayMode(.inline)
    }
}

```

## 隐藏与显示

* **NavigationView** 调用 `navigationBarHidden(_:)` 方法设置导航栏的显示或隐藏，默认为显示。
* **NavigationStack** 调用 `toolbar(.hidden, for:)` 方法设置导航栏的显示或隐藏，默认为显示。

``` Swift
if #available(iOS 16.0, *){
    NavigationStack {
        ContentView()
            .toolbar(.hidden, for: .navigationBar)
    }
} else {
    NavigationView {
        ContentView()
            .navigationBarHidden(true)
    }
}

```


## 导航栏按钮

* 调用 `toolbar(content:)` 方法添加导航栏按钮。该方法的参数类型为 ToolbarContent 闭包，您可以在其中添加 ToolbarItem 或 ToolbarItemGroup。

``` Swift
NavigationView {
    ContentView()
        .toolbar {
            /// 左侧按钮
            ToolbarItem(placement: .topBarLeading) {
                Button("编辑") {
                    
                }
            }

            /// 右侧按钮
            ToolbarItemGroup(placement: .topBarTrailing) {
                /// 导航跳转
                NavigationLink {
                    ContentView()
                } label: {
                    Image(systemName: "plus")
                }
                /// 普通按钮
                Button {
                    
                } label: {
                    Image(systemName: "ellipsis")
                }
            }
        }
}
```

## 返回按钮

* 调用 `navigationBarBackButtonHidden(_:)` 方法设置导航栏返回按钮的显示或隐藏，默认为显示。

``` Swift
struct ContentView: View {
    var body: some View {
        DetailView()
            .navigationBarBackButtonHidden(true) // 隐藏返回按钮
    }
}
```

## 导航控制

使用 **NavigationLink** 视图来导航至下一个页面，当用户点击该视图时触发页面跳转。

``` Swift
struct ContentView: View {
    var body: some View {
        NavigationLink {
            DetailView()
        } label: {
            Image(systemName: "plus")
        }
    }
}
```