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

**ButtonRole** 结构体描述了按钮的用途，用于调整按钮的外观和行为。系统提供以下角色类型：

| 角色 | 说明 | 效果 |
|------|------|------|
| **destructive** | 执行破坏性操作（如删除数据） | 红色样式 |
| **cancel** | 取消当前操作 | 特殊样式（平台相关） |
| **plain** | 普通按钮（iOS 15+） | 无特殊效果 |

### 文本角色按钮

使用 `init(_:role:action:)` 初始化方法：

``` Swift
Button("删除", role: .destructive) {
    deleteAction()
}
```

### 系统图标角色按钮

使用 `init(_:systemImage:role:action:)` 初始化方法：

``` Swift
Button("删除", systemImage: "trash", role: .destructive) {
    deleteAction()
}
```

> [!NOTE]
> 图标在左侧、文本在右侧展示。若文本为空字符串，则只展示图标；若系统图标名称错误，则只展示文本。

## 按钮的修饰符

### ButtonStyle

实例方法 **buttonStyle(_:)** 接收一个符合 `ButtonStyle` 或 `PrimitiveButtonStyle` 协议的样式，为视图中的所有按钮设置统一的外观。

系统提供以下内置样式：

| 样式 | 说明 | 平台支持 |
|------|------|----------|
| **automatic** | 默认样式，由系统自动决定 | iOS 13+ |
| **bordered** | 带边框的按钮 | iOS 13+ |
| **plain** | 文本样式的按钮 | iOS 13+ |
| **borderless** | 无边框样式的按钮 | iOS 13+ |
| **borderedProminent** | 背景突出样式的按钮 | iOS 15+ |
| **glass** | Liquid Glass 按钮 | iOS 26+ |
| **glassProminent** | Liquid Glass 突出效果按钮 | iOS 26+ |
| **link** | 超链接样式 | macOS 10.15+ |

``` Swift
/// 应用到单个按钮
Button("提交") {
    submitAction()
}
.buttonStyle(.borderedProminent)

/// 应用到容器（所有子按钮生效）
HStack {
    Button("按钮1") { }
    Button("按钮2") { }
}
.buttonStyle(.bordered)
```

### buttonBorderShape

实例方法：**buttonBorderShape(_:)**。该方法接收一个 `ButtonBorderShape` 结构体值，用于设置按钮的边框形状。**注意：此修饰符仅影响使用 `bordered` 或 `borderedProminent` 样式的按钮。**

`ButtonBorderShape` 提供了以下形状选项：

| 形状 | 说明 | 平台支持 |
|------|------|----------|
| **automatic** | 默认值，由系统根据上下文和平台自动决定合适的形状 | iOS 15+ |
| **capsule** | 胶囊形状（药丸形） | iOS 15+ |
| **circle** | 圆形 | iOS 17+ |
| **roundedRectangle** | 圆角矩形（默认圆角半径） | iOS 15+ |
| **roundedRectangle(radius:)** | 自定义圆角半径的圆角矩形 | iOS 15+ |

``` Swift
/// 应用到单个按钮
Button("按钮") { }
    .buttonStyle(.bordered)
    .buttonBorderShape(.capsule)

/// 应用到多个按钮
HStack {
    Button("按钮1") { }
    Button("按钮2") { }
}
.buttonStyle(.borderedProminent)
.buttonBorderShape(.roundedRectangle(radius: 20))
```

## 平台支持

| 平台 | 最低版本 |
|------|----------|
| iOS | 13.0+ |
| iPadOS | 13.0+ |
| Mac Catalyst | 13.0+ |
| macOS | 10.15+ |
| tvOS | 13.0+ |
| watchOS | 6.0+ |
| visionOS | 1.0+ |

