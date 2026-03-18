---
# 文章的标题
title: "Slider"
# 文章的时间
date: 2026-03-18T09:56:33+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "Slider 是 SwiftUI 中用于从有限线性范围内选择值的控件"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

## 概述

**Slider** 是一个用于从有限线性范围内选择值的控件。它由一个"滑块"（thumb）和一条"轨道"（track）组成。轨道两端分别代表最小值和最大值，用户拖动滑块时，Slider 会更新绑定的值。

``` Swift
struct Slider<Label, ValueLabel> where Label : View, ValueLabel : View
```

## 创建 Slider

### 基本用法

使用 `init(value:in:)` 初始化方法创建 Slider：

``` Swift
@State private var speed = 50.0

Slider(value: $speed, in: 0...100)
```

### 无障碍标签的 Slider

使用 `init(value:in:label:)` 初始化方法，可以为 Slider 提供无障碍标签，主要用途是无障碍访问（VoiceOver 朗读），而不是直接显示在页面上。：

``` Swift
Slider(value: $speed, in: 0...100) {
    Text("调整速度")
}
```

### 步进 Slider

使用 `step` 参数使滑块吸附到固定的增量值：

``` Swift
Slider(value: $fontSize, in: 5...50, step: 5) {
    Text("字体大小")
}
```

> [!NOTE]
> 当使用 `step` 参数时，iOS 26+ 会自动显示刻度标记（tick marks）。

### 范围标签的 Slider

使用 `minimumValueLabel` 和 `maximumValueLabel` 参数显示最小值和最大值标签：

``` Swift
Slider(value: $brightness, in: 0...100, step: 5) {
    Text("亮度")
} minimumValueLabel: {
    Image(systemName: "sun.min")
} maximumValueLabel: {
    Image(systemName: "sun.max")
}
```

## 自定义刻度标记

### 自动刻度标记 (iOS 26+)

当使用 `step` 参数初始化 Slider 时，系统会自动显示刻度标记：

``` Swift
// iOS 26+ 自动显示刻度
Slider(value: $value, in: 0...10, step: 1) {
    Text("iOS 26+ 自动显示刻度")
}
```

### 自定义刻度标记 (iOS 26+)

使用 `tick` 或 `ticks` 参数自定义刻度标记：

``` Swift
// 使用 tick 参数自定义每个刻度
Slider(value: $percentage, in: 0...1) {
    Text("百分比")
} ticks: {
    SliderTickContentForEach(
        stride(from: 0.0, through: 1.0, by: 0.25).map { $0 },
        id: \.self
    ) { value in
        SliderTick(value) {
            Text("\(Int(value * 100))%")
        }
    }
}
```

## 修饰符

### tint

修改 Slider 轨道填充颜色：

``` Swift
Slider(value: $value, in: 0...100)
    .tint(.orange)
```

### foregroundStyle

修改最小/最大值标签的颜色：

``` Swift
Slider(value: $value, in: 0...100)
    .foregroundStyle(.red)
```

### onEditingChanged

监听滑块编辑状态变化：

``` Swift
@State private var isEditing = false

Slider(value: $speed, in: 0...100) {
    Text("速度")
} onEditingChanged: { editing in
    isEditing = editing
    print("正在编辑: \(editing)")
}
```

### disabled

禁用 Slider：

``` Swift
Slider(value: $value, in: 0...100)
    .disabled(true)
```

## 完整示例

``` Swift
import SwiftUI

struct SliderDemo: View {
    @State private var speed = 50.0
    @State private var isEditing = false
    
    var body: some View {
        Form {
            Section("基础用法") {
                Slider(value: $speed, in: 0...100)
                Text("当前值: \(Int(speed))")
                    .foregroundColor(isEditing ? .red : .primary)
            }
            
            Section("步进Slider") {
                Slider(value: $speed, in: 0...100, step: 5) {
                    Text("调整速度")
                }
            }
            
            Section("带标签") {
                Slider(value: $speed, in: 0...100, step: 5) {
                    Text("调整速度")
                } minimumValueLabel: {
                    Text("0")
                        .font(.caption)
                } maximumValueLabel: {
                    Text("100")
                        .font(.caption)
                }
            }
            
            Section("自定义样式") {
                Slider(value: $speed, in: 0...100, step: 5) {
                    Text("自定义颜色")
                } minimumValueLabel: {
                    Image(systemName: "tortoise")
                } maximumValueLabel: {
                    Image(systemName: "hare")
                }
                .tint(.orange)
            }
            
            Section("编辑状态监听") {
                Slider(value: $speed, in: 0...100) {
                    Text("监听编辑状态")
                } onEditingChanged: { editing in
                    isEditing = editing
                }
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

* **SliderTick** - 刻度标记的表示，包含关联的值和可选标签 (iOS 26+)
* **SliderTickContent** - 刻度标记内容容器 (iOS 26+)
* **SliderTickContentForEach** - 用于生成刻度标记的构造器 (iOS 26+)
