---
title: "ColorPicker"
date: 2026-03-27T10:18:40+08:00
draft: false
description: "ColorPicker 是 SwiftUI 中用于选择颜色的控件，支持颜色和透明度选择"
author: "OverLookArt"
---

ColorPicker 是一个用户界面控件，允许用户选择颜色。它提供了一个标准的颜色选择界面，在 iOS 上呈现为颜色选择器弹窗，在 macOS 上则显示系统颜色面板。视图绑定到 `Color` 实例。

## 创建 ColorPicker

### 基本初始化方法

```swift
/// 创建一个从局部化字符串键生成标签的颜色选择器
init(_ titleKey: LocalizedStringKey, selection: Binding<Color>, supportsOpacity: Bool = true)

/// 创建一个显示自定义标签的颜色选择器
init(selection: Binding<Color>, supportsOpacity: Bool = true, @ViewBuilder label: () -> Label)

/// 创建一个从 Image 生成标签的颜色选择器
init(_ titleKey: LocalizedStringKey, selection: Binding<Color>, supportsOpacity: Bool = true, @ViewBuilder label: () -> Label) where Label == Image
```

### 参数说明

| 参数 | 说明 |
|------|------|
| `titleKey` | 描述选择目的的本地化字符串键 |
| `selection` | 绑定到当前选中颜色的属性 |
| `supportsOpacity` | 是否支持不透明度选择，默认为 `true` |
| `label` | 自定义标签视图 |

### 示例：基本颜色选择

```swift
struct BasicColorPicker: View {
    @State private var selectedColor = Color.blue
    
    var body: some View {
        ColorPicker("选择颜色", selection: $selectedColor)
    }
}
```

## 控制不透明度

使用 `supportsOpacity` 参数控制是否允许用户调整颜色的不透明度：

```swift
// 支持不透明度选择（默认）
ColorPicker("带透明度", selection: $color, supportsOpacity: true)

// 不支持不透明度选择
ColorPicker("不透明", selection: $color, supportsOpacity: false)
```

## 自定义标签

### 使用系统图片

```swift
ColorPicker(selection: $selectedColor) {
    Label("颜色", systemImage: "paintpalette.fill")
}
```

### 使用自定义视图

```swift
ColorPicker(selection: $selectedColor) {
    HStack {
        Image(systemName: "paintbrush.fill")
            .foregroundStyle(selectedColor)
        Text("主题颜色")
    }
}
```

### 使用本地化图片

```swift
ColorPicker("选择颜色", selection: $selectedColor) {
    Image("color-icon")
}
```

## 在表单中使用

ColorPicker 常用于表单或设置界面中：

```swift
struct ThemeSettingsView: View {
    @State private var primaryColor = Color.blue
    @State private var backgroundColor = Color.white
    @State private var accentColor = Color.orange
    
    var body: some View {
        Form {
            Section(header: Text("主题颜色")) {
                ColorPicker("主要颜色", selection: $primaryColor)
                ColorPicker("背景颜色", selection: $backgroundColor, supportsOpacity: false)
                ColorPicker("强调色", selection: $accentColor)
            }
            
            Section(header: Text("预览")) {
                RoundedRectangle(cornerRadius: 10)
                    .fill(backgroundColor)
                    .frame(height: 100)
                    .overlay {
                        VStack {
                            Circle()
                                .fill(primaryColor)
                                .frame(width: 40, height: 40)
                            Text("主题预览")
                                .foregroundStyle(accentColor)
                        }
                    }
            }
        }
    }
}
```

## 颜色模型转换

ColorPicker 返回的 `Color` 对象可以转换为不同的颜色模型：

```swift
struct ColorConversionExample: View {
    @State private var color = Color.red
    
    var body: some View {
        VStack {
            ColorPicker("选择颜色", selection: $color)
            
            // 转换为 UIColor
            if let uiColor = UIColor(color).cgColor.components {
                Text("RGB: \(uiColor[0]), \(uiColor[1]), \(uiColor[2])")
            }
            
            // 使用 Color 资源
            RoundedRectangle(cornerRadius: 8)
                .fill(color)
                .frame(width: 100, height: 100)
        }
    }
}
```

## 完整示例

以下示例展示了一个简单的调色板视图：

```swift
import SwiftUI

struct ColorPaletteView: View {
    @State private var selectedColor = Color.blue
    @State private var savedColors: [Color] = []
    @State private var showOpacity = true
    
    var body: some View {
        VStack(spacing: 20) {
            // 颜色预览
            RoundedRectangle(cornerRadius: 12)
                .fill(selectedColor)
                .frame(height: 150)
                .shadow(radius: 5)
                .padding()
            
            // 颜色选择器
            ColorPicker("选择颜色", selection: $selectedColor, supportsOpacity: showOpacity)
                .padding()
            
            // 不透明度控制
            Toggle("支持透明度", isOn: $showOpacity)
                .padding(.horizontal)
            
            // 已保存的颜色
            if !savedColors.isEmpty {
                VStack(alignment: .leading) {
                    Text("已保存的颜色")
                        .font(.headline)
                    
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack {
                            ForEach(savedColors, id: \.self) { color in
                                Circle()
                                    .fill(color)
                                    .frame(width: 40, height: 40)
                                    .onTapGesture {
                                        selectedColor = color
                                    }
                            }
                        }
                    }
                }
                .padding()
            }
            
            // 保存按钮
            Button("保存当前颜色") {
                savedColors.append(selectedColor)
            }
            .buttonStyle(.borderedProminent)
            
            Spacer()
        }
        .navigationTitle("调色板")
    }
}
```

## 平台支持

| 平台 | 最低版本 |
|------|----------|
| iOS | 14.0+ |
| iPadOS | 14.0+ |
| Mac Catalyst | 14.0+ |
| macOS | 11.0+ |
| visionOS | 1.0+ |

## 注意事项

- ColorPicker 在 macOS 上会显示系统颜色面板，在 iOS 上显示内联颜色选择器
- 默认情况下，ColorPicker 支持选择不透明度
- 如果需要精确的颜色值，建议使用 `UIColor` 或 `NSColor` 进行转换
- ColorPicker 支持系统颜色和自定义颜色，用户可以从预设颜色中选择或自定义颜色
- 在表单中使用 ColorPicker 时，它会自动适配表单样式
