---
# 文章的标题
title: "Button"
# 文章的时间
date: 2025-06-18T09:29:11+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "按钮"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

## 创建 Button

* 使用 `init(_:action:)` 初始化方法创建 Button，该方法的2种定义如下：

    ``` Swift
    /// 创建按钮
    /// - Parameters:
    ///     - titleKey: 按钮本地化标题的键，用于描述按钮操作的目的。
    ///     - action: 用户触发按钮时要执行的操作。
    @preconcurrency nonisolated
    init( 
        _ titleKey: LocalizedStringKey,
        action: @escaping @MainActor () -> Void
    )

    /// 创建按钮
    /// - Parameters:
    ///     - title: 描述按钮操作目的的字符串。
    ///     - action: 用户触发按钮时要执行的操作。
    @preconcurrency nonisolated
    init<S>(
        _ title: S,
        action: @escaping @MainActor () -> Void
    ) where S : StringProtocol
    ```

    示例：

    ``` Swift
    Button("按钮") {
        btnAction()
    }

    private func btnAction(){ ... }
    ```

* 使用 `init(action:label:)` 创建一个显示自定义标签的按钮。该方法的定义如下：
  
    ``` Swift
    /// 创建一个显示自定义标签的按钮
    /// - Parameters:
    ///     - action: 用户触发按钮时要执行的操作。
    ///     - label: 描述按钮操作目的的视图。
    @preconcurrency
    init(
        action: @escaping @MainActor () -> Void,
        @ViewBuilder label: () -> Label
    )
    ```

    示例：

    ``` Swift
    Button(action: btnAction) {
        Text("按钮")
    }
    private func btnAction(){ ... }
    ```