---
# 文章的标题
title: "Stepper"
# 文章的时间
date: 2026-03-18T11:39:30+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "Stepper 是 SwiftUI 中用于递增或递减值的控件"
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

**Stepper** 是一个用于递增或递减值的控件。它由"+"和"-"两个按钮组成，用户可以通过点击来增加或减少数值。常用于选择数量、调整数值等场景。

``` Swift
struct Stepper<Label> where Label : View
```

## 创建 Stepper

### 基本用法

使用字符串作为标题创建 Stepper：

``` Swift
@State private var age = 18

Stepper("Enter your age", value: $age, in: 0...130)
```

使用自定义标签作为标题创建 Stepper：

``` Swift
@State private var quantity = 1

Stepper(value: $quantity, in: 1...10) {
    Text("数量: \(quantity)")
}
```

### 自定义步长

使用 `step` 参数自定义每次递增/递减的数值：

``` Swift
Stepper(value: $value, in: 0...100, step: 5) {
    Text("值: \(value)")
}
```

### 使用 onIncrement 和 onDecrement

使用 `onIncrement` 和 `onDecrement` 闭包自定义递增/递减逻辑：

``` Swift
@State private var value = 5

Section("自定义递增/递减逻辑") {
    Stepper {
        Text("值: \(value)")
    } onIncrement: {
        value = min(value * 2, 100)
    } onDecrement: {
        value = max(value / 2, 1)
    }
}
```

### 带有编辑状态回调

使用 `onEditingChanged` 监听编辑状态变化：

``` Swift
@State private var isEditing = false

Stepper(value: $value, in: 0...100) { editing in
    isEditing = editing
    print("正在编辑: \(editing)")
}
```

### 带有格式化的 Stepper

使用 `format` 参数自定义数值显示格式：

``` Swift
@State private var temperature = 20.0

Stepper(value: $temperature, in: 10...40, step: 0.5, format: .number.precision(.fractionLength(1))) {
    Text("温度")
}
```

## 修饰符

### labelsHidden

隐藏 Stepper 的标签：

``` Swift
Stepper("标签", value: $value, in: 0...10)
    .labelsHidden()
```

### foregroundStyle

修改 Stepper 标题的颜色：

``` Swift
Stepper("标题", value: $value, in: 0...10)
    .foregroundStyle(.cyan)
```

## 完整示例

``` Swift
import SwiftUI

struct StepperDemo: View {
    @State private var quantity = 1
    @State private var brightness = 50.0
    @State private var temperature = 20.0
    @State private var value = 5
    
    var body: some View {
        Form {
            Section("基础用法") {
                Stepper(value: $quantity, in: 1...99) {
                    Text("数量: \(quantity)")
                }
            }
            
            Section("自定义步长") {
                Stepper(value: $brightness, in: 0...100, step: 5) {
                    HStack {
                        Text("亮度")
                        Spacer()
                        Text("\(Int(brightness))%")
                    }
                }
            }
            
            Section("自定义递增/递减逻辑") {
                Stepper {
                    Text("值: \(value)")
                } onIncrement: {
                    value = min(value * 2, 100)
                } onDecrement: {
                    value = max(value / 2, 1)
                }
            }
            
            Section("隐藏标签") {
                Stepper("标签", value: $quantity, in: 1...99)
                    .labelsHidden()
            }
            
            Section("自定义颜色") {
                Stepper(value: $quantity, in: 1...99) {
                    Text("自定义颜色")
                }
                .foregroundStyle(.cyan)
            }

            Section("格式化数值") {
                if #available(iOS 16.0, *) {
                    Stepper(value: $temperature, in: 10...35, step: 0.5, format: .number.precision(.fractionLength(1))) {
                        Text("温度: \(temperature, specifier: "%.1f")°C")
                    }
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

* **StepperStyle** - Stepper 的样式协议
