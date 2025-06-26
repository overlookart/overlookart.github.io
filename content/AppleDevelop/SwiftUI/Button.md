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

## 创建基础按钮

### 文本按钮

使用 `init(_:action:)` 初始化方法创建 Button，该方法的2种定义如下：

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

### 自定义按钮

使用 `init(action:label:)` 创建一个显示自定义标签的按钮。该方法的定义如下：
  
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

### 系统图标按钮

使用 `init(_:systemImage:action:)` 创建一个显示系统图标的按钮。该方法的2种定义如下：

``` Swift
/// 创建一个显示系统图标和文字标签的按钮
/// - Parameters:
///     - titleKey: 按钮本地化标题的键，用于描述按钮操作的目的。
///     - systemImage: 系统图标名称。
///     - action: 用户触发按钮时要执行的操作。
nonisolated
init(
    _ titleKey: LocalizedStringKey,
    systemImage: String,
    action: @escaping @MainActor () -> Void
)

/// 创建一个显示系统图标和文字标签的按钮
/// - Parameters:
///     - title: 描述按钮操作目的的字符串。
///     - systemImage: 系统图标名称。
///     - action: 用户触发按钮时要执行的操作。
nonisolated
init<S>(
    _ title: S,
    systemImage: String,
    action: @escaping @MainActor () -> Void
) where S : StringProtocol
```

示例：

``` Swift
Button("按钮", systemImage: "plus") {
    btnAction()
}
    
private func btnAction(){ ... }
```

## 创建角色按钮

**ButtonRole** 结构体提供了按钮用途的描述。`destructive` 表示按钮执行破坏性操作，如删除用户数据;  `cancel` 表示按钮取消当前操作。

* 使用`init(_:role:action:)`创建一个文本标签的角色按钮。

  ``` Swift
  Button("按钮", role: .destructive, action: btnAction)

  private func btnAction(){ ... }
  ```

* 使用 `init(_:systemImage:role:action:)` 创建一个显示系统图标的角色按钮。
  
  ``` Swift
  Button("按钮6", systemImage: "plus", role: .destructive, action: btnAction)

  private func btnAction(){ ... }
  ```

  > [!NOTE]
  > 图标在左侧展示、文本在右侧展示；若文本为空字符串，则只展示系统图标；若系统图标的名称错误，则只展示文本；

## 按钮的修饰符

### ButtonStyle

实例方法：**buttonStyle(_:)**。该方法接收一个符合 `ButtonStyle` 协议的样式，或符合 `PrimitiveButtonStyle` 协议的样式。它允许你自定义按钮的外观和行为。
系统提供了下面几种样式：

* automatic :默认的按钮样式
* bordered :带边框的按钮样式
* plain: 文本样式的按钮
* borderless: 无边框样式的按钮
* borderedProminent: 背景突出样式的按钮

``` Swift
/// 应用到单个按钮
Button("按钮") { ... }
    .buttonStyle(.borderedProminent)
    
/// 应用到多个按钮
HStack {
    Button("按钮") { ... }
    Button("按钮") { ... }
    ...
}
.buttonStyle(.bordered)

```


## 添加到容器中

