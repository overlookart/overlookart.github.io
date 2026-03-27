---
title: "DatePicker"
date: 2026-03-25T10:57:00+08:00
draft: false
description: "DatePicker 是 SwiftUI 中用于选择日期和时间的控件，支持日期、时间或两者组合的选择"
author: "OverLookArt"
---

**DatePicker** 是一个用户界面控件，允许用户选择日期和时间。它根据上下文以不同的样式呈现，例如滚轮、日历视图或紧凑样式。视图绑定到 `Date` 实例，并自动处理本地化和日历系统。

## 创建 DatePicker

### 基本初始化方法

```swift
/// 创建一个选择任意日期的选择器
init(_ titleKey: LocalizedStringKey, selection: Binding<Date>, displayedComponents: DatePickerComponents = [.hourAndMinute, .date])

/// 创建一个选择任意日期的选择器（自定义标签）
init(selection: Binding<Date>, displayedComponents: DatePickerComponents = [.hourAndMinute, .date], @ViewBuilder label: () -> Label)

/// 创建一个选择指定范围日期的选择器
init(_ titleKey: LocalizedStringKey, selection: Binding<Date>, in: ClosedRange<Date>, displayedComponents: DatePickerComponents = [.hourAndMinute, .date])

/// 创建一个选择指定范围日期的选择器（自定义标签）
init(selection: Binding<Date>, in: ClosedRange<Date>, displayedComponents: DatePickerComponents = [.hourAndMinute, .date], @ViewBuilder label: () -> Label)
```

### 示例：基本日期选择

```swift
struct BasicDatePicker: View {
    @State private var date = Date()
    
    var body: some View {
        DatePicker("开始日期", selection: $date)
    }
}
```

## 日期范围限制

您可以限制 DatePicker 的选择范围，允许用户只选择特定日期区间内的日期。

```swift
struct RangeDatePicker: View {
    @State private var date = Date()
    
    let dateRange: ClosedRange<Date> = {
        let calendar = Calendar.current
        let startComponents = DateComponents(year: 2024, month: 1, day: 1)
        let endComponents = DateComponents(year: 2024, month: 12, day: 31, hour: 23, minute: 59, second: 59)
        return calendar.date(from: startComponents)!...
            calendar.date(from: endComponents)!
    }()
    
    var body: some View {
        DatePicker(
            "选择日期",
            selection: $date,
            in: dateRange,
            displayedComponents: [.date]
        )
    }
}
```

### 使用单侧范围

Swift 支持单侧范围，可以更简洁地限制日期：

```swift
// 只允许选择未来日期
DatePicker("选择日期", selection: $date, in: Date.now...)

// 只允许选择过去日期
DatePicker("选择日期", selection: $date, in: ...Date.now)
```

## 显示组件配置

使用 `displayedComponents` 参数控制 DatePicker 显示哪些组件：

| 组件 | 说明 |
|------|------|
| `.date` | 显示日期（年、月、日） |
| `.hourAndMinute` | 显示时间（小时、分钟） |
| 默认 | 显示日期和时间 |

### 示例

```swift
// 只显示时间
DatePicker("选择时间", selection: $date, displayedComponents: .hourAndMinute)

// 只显示日期
DatePicker("选择日期", selection: $date, displayedComponents: .date)

// 显示日期和时间（默认）
DatePicker("选择日期和时间", selection: $date)
```

## 样式定制

使用 `.datePickerStyle(_:)` 修饰符自定义 DatePicker 的外观：

| 样式 | 说明 | 平台 |
|------|------|------|
| `.automatic` | 自动选择样式 | 所有平台 |
| `.compact` | 紧凑样式，点击展开选择 | iOS, macOS |
| `.graphical` | 图形化日历样式 | iOS 14+, macOS 11+ |
| `.wheel` | 滚轮样式 | iOS, watchOS |

### 示例

```swift
// 图形化日历样式
DatePicker("选择日期", selection: $date, displayedComponents: .date)
    .datePickerStyle(.graphical)

// 滚轮样式
DatePicker("选择日期", selection: $date)
    .datePickerStyle(.wheel)

// 隐藏标签
DatePicker("选择日期", selection: $date)
    .labelsHidden()
```

## 多行标签

如果需要为 DatePicker 添加子标题，可以使用视图构建器创建多个 `Text` 视图：

```swift
DatePicker(selection: $date) {
    Text("开始日期")
        .font(.headline)
    Text("请选择您的预约时间")
        .font(.caption)
}
```

## 完整示例

以下示例展示了一个带有日期范围限制、图形化样式的 DatePicker：

```swift
import SwiftUI

struct BookingView: View {
    @State private var bookingDate = Date.now
    
    // 只允许选择从今天开始的未来30天
    let availableRange: ClosedRange<Date> = {
        let calendar = Calendar.current
        let today = Date.now
        let endDate = calendar.date(byAdding: .day, value: 30, to: today)!
        return today...endDate
    }()
    
    var body: some View {
        Form {
            Section(header: Text("预约信息")) {
                DatePicker(
                    "预约日期",
                    selection: $bookingDate,
                    in: availableRange,
                    displayedComponents: [.date, .hourAndMinute]
                )
                .datePickerStyle(.graphical)
            }
            
            Section {
                Text("已选择: \(bookingDate.formatted(date: .long, time: .shortened))")
                    .foregroundStyle(.secondary)
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
| Mac Catalyst | 13.0+ |
| macOS | 10.15+ |
| tvOS | 13.0+ |
| watchOS | 6.0+ |
| visionOS | 1.0+ |

## 注意事项

- DatePicker 自动处理本地化，根据用户的设备区域设置显示日期格式（美国用户看到 mm/dd/yyyy，西班牙用户看到 dd/mm/yyyy）
- 不要尝试在选择器内手动强制 dd/mm/yyyy 格式，信任系统的本地化处理
- 使用 `labelsHidden()` 可以隐藏标签，但保留 VoiceOver 无障碍支持
- 当日期范围内的值不同时，某些样式会以混合状态显示选择
