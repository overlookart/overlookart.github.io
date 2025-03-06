---
# 文章的标题
title: "TabView"
# 文章的时间
date: 2023-12-25T13:37:25+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "一个标签视图，功能类似 UIKit 的 UITabBarController，也能设置成 UIPageViewController 的效果"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

## 开始使用

> 用于切换多个子视图的 Tab 组件。类似于 **UIKit** 中的 `UITabBarController`。

``` swift
TabView {
    CostomView()
    CostomView()
    ...
}
```

> [!IMPORTANT]
> 在 `TabView` 中嵌入5个以上的子视图后, 第5个及以后子视图的将会被 `More` 的 视图替换。

## 配置 tabItem

> `tabItem` 接收一个 `Label` 组件，用于显示在标签页上。

``` swift
TabView {
    CostomView()
        .tabItem {
            Label("title", systemImage: "star.fill")
        }
    ...
}

```

## 配置强调色

`accentColor` 属性类似于 `UITabBarController` 的 `barTintColor` 属性，用于设置 tabItem 的强调色。

``` swift
TabView {
    ...
}.accentColor(.red)
```

## 配置页面切换效果

`tabViewStyle` 属性用于控制 **TabView** 的展示样式与交互方式。

* .automatic: 呈现效果及交互方式类似于 **UIKit** 中的 `UITabBarController`
* .page: 呈现效果及交互方式类似于 **UIKit** 中的 `UIPageViewController`

``` swift
TabView {
    ...
}.tabViewStyle(.automatic)
```
