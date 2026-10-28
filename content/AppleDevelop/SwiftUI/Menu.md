---
title: "Menu"
date: 2026-06-15T11:18:45+08:00
draft: false
description: "SwiftUI菜单文档，展示如何使用SwiftUI创建菜单并实现自适应控制"
lastmod: 2026-06-15T11:18:45+08:00
author: "OverLookArt"
---

## 概述

SwiftUI菜单提供了一种直观的方式，让用户能够选择操作，访问次级界面，或者查看额外的选项。菜单可以包含一系列菜单项，每个菜单项可以是一个按钮、切换开关、复选框，或者其他SwiftUI控件。

菜单非常适合用于导航、设置和应用程序级操作，特别是在移动设备上，这些设备空间有限。

## 基本菜单创建

### 使用 String 创建菜单

```swift
import SwiftUI
struct ContentView: View {
    var body: some View {
        Menu("菜单") { 
            // 菜单内容
        }
    }
}
```

### 使用 Label 创建菜单

```swift
Menu {
    // 菜单内容
} label: {
    Label("菜单", systemImage: "menu")
}

Menu("菜单", systemImage: "doc.text") {
    // 菜单内容                
}
```


## 菜单内容类型

> [!TIP]
> 除了用 `Button` 作为 **Menu** 的内容外, 还可以用 `Toggle`、`Divider`、`Label`、`Text`、`Section`、`Picker`、 `Stepper` 等控件。


### 按钮菜单

```swift
Menu("菜单") {
    // 普通按钮
    Button("操作1") { ... }
    // 带图标的按钮
    Button("偏好设置", systemImage: "gearshape") { ... }
    // 角色按钮
    Button("Delete…", systemImage: "trash", role: .destructive) { ... }
}
```

### 切换菜单

```swift
@State private var isDarkMode = false
@State private var isOpen = false

Menu("外观") {
    // 默认
    Toggle("深色模式", isOn: $isDarkMode)
    // 自定义
    Toggle(isOn: $isOpen) {
        Label("开关", systemImage: "suit.heart")
        Text("标题、图标、子标题")
    }
}
```

### 单选菜单

```swift
@State private var selectedOption = "选项1"
let options = ["选项1", "选项2", "选项3"]

Menu("单选选项") {
    ForEach(options, id: \.self) { option in
        Button {
            selectedOption = option
        } label: {
            Label(option, systemImage: selectedOption == option ? "checkmark.circle.fill" : "circle")
        }
    }
}
```

### 复选菜单

```swift
@State private var selectedOptions = ["选项1", "选项3"]
let options = ["选项1", "选项2", "选项3"]

Menu("复选选项") {
    ForEach(options, id: \.self) { option in
        Button {
            if selectedOptions.contains(option) {
                selectedOptions.removeAll { $0 == option }
            } else {
                selectedOptions.append(option)
            }
        } label: {
            Label(option, systemImage: selectedOptions.contains(option) ? "checkmark.circle.fill" : "circle")
        }
    }
}
```

### 带标签的菜单

```swift
Menu("工具") {
    Button("打开") {
        // 打开记事本
    }
    Button("新建") {
        // 新建记事本
    }
    Label("记事本", systemImage: "doc.text")
}
```

## 自适应控制菜单

### 条件性菜单项

```swift
struct ContentView: View {
    @State private var isLoggedIn = false
    @State private var userRole: UserRole = .guest
    
    var body: some View {
        Menu("账户") {
            if isLoggedIn {
                Button("个人资料") {
                    // 打开个人资料
                }
                
                Button("设置") {
                    // 打开设置
                }
                
                Button("登出", action: {
                    isLoggedIn = false
                })
                
                Divider()
                
                Text("已登录")
                    .foregroundColor(.secondary)
            } else {
                Button("登录") {
                    isLoggedIn = true
                }
                
                Button("注册") {
                    // 打开注册
                }
            }
            
            if userRole == .admin {
                Divider()
                Button("管理") {
                    // 打开管理面板
                }
            }
        }
    }
}
```

## 使用标签来组织菜单项

### 分组菜单项

```swift
Menu("格式") {
    Text("字体")
        .font(.headline)
        .foregroundColor(.secondary)
    
    Button("标题1") {
        // 设置字体大小
    }
    
    Button("标题2") {
        // 设置字体大小
    }
    
    Divider()
    
    Text("对齐")
        .font(.headline)
        .foregroundColor(.secondary)
    
    Button("左对齐") {
        // 左对齐
    }
    
    Button("居中") {
        // 居中
    }
    
    Button("右对齐") {
        // 右对齐
    }
}
```

## 高级菜单功能

### 菜单状态控制

```swift
struct ContentView: View {
    @State private var isMenuOpen = false
    
    var body: some View {
        Menu("操作", isOpen: $isMenuOpen) {
            Button("操作1", action: {
                // 执行操作
            })
            
            Button("操作2", action: {
                // 执行操作
            })
        }
        
        Button("打开菜单") {
            isMenuOpen = true
        }
    }
}
```

### 菜单内容绑定

```swift
struct ContentView: View {
    @State private var menuItems: [MenuItem] = [
        MenuItem(title: "新建", icon: "doc.badge.plus", action: createNew),
        MenuItem(title: "打开", icon: "folder", action: openFile),
        MenuItem(title: "保存", icon: "square.and.arrow.down", action: saveFile),
    ]
    
    var body: some View {
        Menu("文件") {
            ForEach(menuItems, id: \.self) { item in
                Button(action: item.action) {
                    Label(item.title, systemImage: item.icon)
                }
            }
        }
    }
}

struct MenuItem: Identifiable {
    let id = UUID()
    let title: String
    let icon: String
    let action: () -> Void
}
```

## 响应式菜单

### 根据数据动态生成菜单项

```swift
struct ContentView: View {
    @State private var availableFeatures: [Feature] = [
        Feature(title: "翻译", icon: "globe", isAvailable: true),
        Feature(title: "语音输入", icon: "mic", isAvailable: false),
        Feature(title: "屏幕录制", icon: "screen.recording", isAvailable: true),
    ]
    
    var body: some View {
        Menu("功能") {
            ForEach(availableFeatures) { feature in
                if feature.isAvailable {
                    Button(action: {
                        // 使用该功能
                    }) {
                        Label(feature.title, systemImage: feature.icon)
                    }
                } else {
                    Label(feature.title, systemImage: feature.icon)
                        .foregroundColor(.secondary)
                }
            }
        }
    }
}

struct Feature {
    let title: String
    let icon: String
    let isAvailable: Bool
}
```

## 最佳实践

### 1. 菜单项的组织

- 使用文本和图标来为菜单项创建一个清晰的标签
- 使用分隔线来分隔不同的菜单组
- 将相关的菜单项放在一起

### 2. 条件性菜单项

- 根据应用状态（如用户登录状态）显示或隐藏菜单项
- 使用设备特征（如尺寸类）来调整菜单项
- 动态生成菜单项以适应不同的数据集

### 3. 无障碍访问

- 为菜单项提供描述性的标签
- 使用合适的系统图标来表示菜单项的功能
- 确保菜单项的内容可读性和足够的点击区域

### 4. 菜单性能

- 避免在菜单内部创建复杂的视图层次
- 对于动态生成的菜单项，考虑使用`ForEach`而不是硬编码
- 限制菜单项的数量，以避免布局问题

## 完整示例：设置菜单

```swift
import SwiftUI

struct SettingsView: View {
    @AppStorage("notificationEnabled") private var notificationEnabled = true
    @AppStorage("darkMode") private var darkMode = false
    @AppStorage("language") private var language = Locale.current.identifier
    @State private var showAbout = false
    
    var body: some View {
        NavigationView {
            List {
                Section("通知") {
                    Toggle("启用通知", isOn: $notificationEnabled)
                }
                
                Section("外观") {
                    Toggle("深色模式", isOn: $darkMode)
                }
                
                Section("语言") {
                    Menu("语言") {
                        ForEach(Array(Locale.autoupdating.currentIdentifiers), id: \.self) { locale in
                            Button(locale.capitalized) {
                                language = locale
                            }
                        }
                    }
                }
                
                Section("关于") {
                    Button("关于应用", action: {
                        showAbout = true
                    })
                }
            }
            .navigationTitle("设置")
        }
        .sheet(isPresented: $showAbout) {
            AboutView()
        }
    }
}

struct AboutView: View {
    @Environment(\,.dismiss) var dismiss
    
    var body: some View {
        NavigationView {
            VStack {
                Image(systemName: "app")
                    .font(.largeTitle)
                    .padding()
                
                Text("我的应用")
                    .font(.title)
                
                Text("版本 1.0.0")
                    .foregroundColor(.secondary)
                
                Spacer()
            }
            .navigationTitle("关于")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("完成", action: {
                        dismiss()
                    })
                }
            }
        }
    }
}
```

## 总结

菜单是SwiftUI中一个强大的UI组件，可以让用户访问和执行各种操作。通过使用标签、图标、分隔线和条件性菜单项，您可以创建出丰富且用户友好的菜单体验。记住保持菜单的简洁性，并根据应用状态和设备特征来动态生成菜单项。

菜单是构建现代化iOS应用的基石之一。