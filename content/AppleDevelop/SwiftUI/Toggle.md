---
# 文章的标题
title: "Toggle"
# 文章的时间
date: 2026-03-18T16:09:39+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "Toggle 是 SwiftUI 中用于切换开关状态的控件"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate: //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

## 概述

**Toggle** 是一个用于切换开关状态的控件。它允许用户在两个状态之间切换（开/关），通常用于设置界面或需要布尔值切换的场景。

``` Swift
struct Toggle<Label> where Label : View
```

## 创建 Toggle

### 基本用法

使用 `init(_:isOn:)` 初始化方法创建 Toggle：

``` Swift
@State private var isEnabled = false

Toggle("启用功能", isOn: $isEnabled)
```

### 使用自定义标签

使用 `init(isOn:label:)` 初始化方法，可以自定义标签视图：

``` Swift
Toggle(isOn: $isEnabled) {
    HStack {
        Image(systemName: "airplane")
        Text("飞行模式")
    }
}
```

### 使用系统图标

使用 `init(_:systemImage:isOn:)` 初始化方法，可以添加系统图标：

``` Swift
@State private var vibrateOnRing = true

Toggle("振动", systemImage: "dot.radiowaves.left.and.right", isOn: $vibrateOnRing)
```

### 使用图片资源

使用 `init(_:image:isOn:)` 初始化方法，可以使用自定义图片：

``` Swift
Toggle("设置", image: "gearshape", isOn: $isEnabled)
```

### 集合 Toggle (iOS 16+)

使用 `init(_:sources:isOn:)` 创建集合 Toggle，可以同时控制多个值：

``` Swift
struct EmailList: Identifiable {
    let id: String
    var isSubscribed: Bool
}

@State private var lists = [
    EmailList(id: "月度更新", isSubscribed: true),
    EmailList(id: "新闻简报", isSubscribed: false)
]

Form {
    Section {
        ForEach($lists) { $list in
            Toggle(list.id, isOn: $list.isSubscribed)
        }
    }
}
```

### 使用 AppIntent (iOS 17+)

使用 `init(_:isOn:intent:)` 创建支持 AppIntent 的 Toggle：

``` Swift
import AppIntents

Toggle("启用功能", isOn: $isEnabled, intent: MyToggleIntent())
```

## ToggleStyle 样式

### Switch 样式

默认样式，类似于 iOS 的开关：

``` Swift
Toggle("飞行模式", isOn: $isEnabled)
    .toggleStyle(.switch)
```

### Button 样式 (iOS 15+)

按钮样式的 Toggle，活动时高亮显示：

``` Swift
@State private var showVideos = true
@State private var showAudio = false

HStack {
    Toggle("视频", isOn: $showVideos)
    Toggle("音频", isOn: $showAudio)
}
.toggleStyle(.button)
.tint(.indigo)
```

> [!NOTE]
> Button 样式常用于筛选栏、标签选择器等场景。

### 自动样式

使用 `.automatic` 会根据平台和上下文自动选择合适的样式：

``` Swift
Toggle("设置", isOn: $isEnabled)
    .toggleStyle(.automatic)
```

## 修饰符

### tint

修改 Toggle 的强调色：

``` Swift
Toggle("启用功能", isOn: $isEnabled)
    .tint(.orange)
```

### labelsHidden

隐藏 Toggle 的标签：

``` Swift
Toggle("", isOn: $isEnabled)
    .labelsHidden()
    .accessibilityLabel("启用功能")
```

### 自定义样式

可以通过实现 `ToggleStyle` 协议来创建自定义样式：

``` Swift
struct CustomToggleStyle: ToggleStyle {
    func makeBody(configuration: Configuration) -> some View {
        HStack {
            configuration.label
            Spacer()
            RoundedRectangle(cornerRadius: 30)
                .fill(configuration.isOn ? Color.green : Color.gray)
                .frame(width: 50, height: 32)
                .overlay(
                    Circle()
                        .fill(Color.white)
                        .padding(3)
                        .offset(x: configuration.isOn ? 10 : -10)
                )
                .onTapGesture {
                    withAnimation(.spring()) {
                        configuration.isOn.toggle()
                    }
                }
        }
    }
}

// 使用
Toggle("自定义", isOn: $isEnabled)
    .toggleStyle(CustomToggleStyle())
```

## 完整示例

``` Swift
import SwiftUI

struct ToggleDemo: View {
    @State private var isEnabled = false
    @State private var notifications = true
    @State private var sound = true
    
    var body: some View {
        Form {
            Section("基础用法") {
                Toggle("启用功能", isOn: $isEnabled)
                Text(isEnabled ? "功能已启用" : "功能已禁用")
                    .foregroundColor(isEnabled ? .green : .secondary)
            }
            
            Section("自定义标签") {
                Toggle(isOn: $notifications) {
                    HStack {
                        Image(systemName: "bell.fill")
                        Text("推送通知")
                    }
                }
            }
            
            Section("Switch 样式") {
                Toggle("声音", isOn: $sound)
                    .toggleStyle(.switch)
            }
            
            Section("Button 样式") {
                HStack {
                    Toggle("视频", isOn: $notifications)
                    Toggle("音频", isOn: $sound)
                }
                .toggleStyle(.button)
                .tint(.indigo)
            }
            
            Section("自定义颜色") {
                Toggle("自定义颜色", isOn: $isEnabled)
                    .tint(.orange)
            }
            
            Section("隐藏标签") {
                Toggle("", isOn: $isEnabled)
                    .labelsHidden()
                    .accessibilityLabel("启用功能")
            }
            
            Section("绑定到派生状态") {
                Toggle("用户偏好", isOn: Binding(
                    get: { UserDefaults.standard.bool(forKey: "user_preference") },
                    set: { UserDefaults.standard.set($0, forKey: "user_preference") }
                ))
            }
        }
    }
}
```

## 平台支持

| 平台 | 最低版本 |
|------|----------|
| iOS | 13.0+ |
| iPadOS | 13.0+ |
| macOS | 10.15+ |
| tvOS | 13.0+ |
| watchOS | 6.0+ |
| visionOS | 1.0+ |

## 相关类型

* **ToggleStyle** - Toggle 样式协议
* **SwitchToggleStyle** - Switch 样式实现
* **ButtonToggleStyle** - Button 样式实现 (iOS 15+)
* **ToggleStyleConfiguration** - Toggle 样式配置，包含标签和状态
