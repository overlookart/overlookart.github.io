---
title: "Picker"
date: 2026-03-24T00:00:00+08:00
draft: false
description: "Picker 是 SwiftUI 中用于从一组互斥选项中选择单个值的控件"
author: "OverLookArt"
---

Picker 是一个用户界面控件，允许用户从一组互斥选项中选择一个值。它根据上下文和可用选项的数量以不同的样式呈现，例如菜单、分段控件或滚轮。

## 创建 Picker

您可以通过提供选择绑定、标签以及要显示的内容来创建 Picker。将 `selection` 参数设置为绑定属性，以提供当前选择的值。将标签设置为描述选择目的的视图，然后提供 picker 要显示的内容。

### 基本初始化方法

```swift
/// 创建一个从局部化字符串键生成标签的选择器。
init(_ titleKey: LocalizedStringKey, selection: Binding<Value>, @ViewBuilder content: () -> Content)

/// 创建一个显示自定义标签的选择器。
init(selection: Binding<Value>, @ViewBuilder content: () -> Content, label: () -> Label)
```

### 示例：基本选择器

考虑一个表示冰淇淋口味的枚举：

```swift
enum Flavor: String, CaseIterable, Identifiable {
    case chocolate, vanilla, strawberry
    
    var id: String { rawValue }
}
```

使用 `State` 属性来存储选择：

```swift
struct FlavorPicker: View {
    @State private var selectedFlavor = Flavor.chocolate
    
    var body: some View {
        Picker("口味", selection: $selectedFlavor) {
            Text("巧克力").tag(Flavor.chocolate)
            Text("香草").tag(Flavor.vanilla)
            Text("草莓").tag(Flavor.strawberry)
        }
    }
}
```

## 提供选择选项

通常，您会使用 `ForEach` 从一个集合中生成 picker 的内容。如果集合中的元素遵循 `Identifiable` 协议，则可以省略显式的 `tag` 修饰符，因为 `ForEach` 会自动使用每个元素的 `id` 作为标签。

### 使用 ForEach

```swift
Picker("口味", selection: $selectedFlavor) {
    ForEach(Flavor.allCases) { flavor in
        Text(flavor.rawValue.capitalized).tag(flavor)
    }
}
```

如果 `Flavor` 的 `id` 与选择类型匹配（在此情况下，都是 `String`），则可以省略 `.tag(flavor)`：

```swift
Picker("口味", selection: $selectedFlavor) {
    ForEach(Flavor.allCases) { flavor in
        Text(flavor.rawValue.capitalized)
    }
}
```

### Image 标签

使用 `init(_:image:selection:content:)` 初始化方法可以创建同时包含文本和图片标签的选择器。

#### 方法签名

```swift
// 使用 LocalizedStringKey（支持本地化）
@available(macOS 14.0, iOS 17.0, tvOS 17.0, watchOS 10.0, *)
nonisolated init(
    _ titleKey: LocalizedStringKey,
    image: ImageResource,
    selection: Binding<SelectionValue>,
    @ViewBuilder content: () -> Content
)

// 使用 StringProtocol（支持任意字符串类型）
@available(macOS 14.0, iOS 17.0, tvOS 17.0, watchOS 10.0, *)
nonisolated init<S>(
    _ title: S,
    image: ImageResource,
    selection: Binding<SelectionValue>,
    @ViewBuilder content: () -> Content
) where S : StringProtocol
```

#### 参数说明

| 参数 | 说明 |
|------|------|
| `titleKey` / `title` | 描述选择目的的字符串（`LocalizedStringKey` 或 `StringProtocol`） |
| `image` | 图片资源（`ImageResource`），通常来自 Asset Catalog |
| `selection` | 绑定到当前选中选项的属性 |
| `content` | 包含选项内容的视图 |

#### 示例

```swift
import SwiftUI

enum Berry: String, CaseIterable, Identifiable {
    case blueberry = "蓝莓"
    case raspberry = "覆盆子"
    case strawberry = "草莓"
    
    var id: String { rawValue }
}

struct BerryPicker: View {
    @State private var selectedBerry = Berry.blueberry
    
    var body: some View {
        // 假设在 Asset Catalog 中有一张名为 "berries" 的图片
        Picker("选择浆果", image: "berries", selection: $selectedBerry) {
            ForEach(Berry.allCases) { berry in
                Text(berry.rawValue).tag(berry)
            }
        }
    }
}
```

#### SF Symbols 方案

```swift
// 使用 SF Symbol
Picker(selection: $selectedFlavor) {
    ForEach(Flavor.allCases) { flavor in
        Text(flavor.rawValue.capitalized).tag(flavor)
    }
} label: {
    Label("口味", systemImage: "drop.fill")
}

// 使用自定义视图
Picker(selection: $selectedFlavor) {
    ForEach(Flavor.allCases) { flavor in
        Text(flavor.rawValue.capitalized).tag(flavor)
    }
} label: {
    HStack {
        Image(systemName: "drop.fill")
            .foregroundStyle(.blue)
        Text("口味")
    }
}
```

### 绑定到一组选择项

使用 `init(_:sources:selection:content:)` 初始化方法可以创建一个绑定到绑定集合的 Picker。当你需要同时控制多个对象的同一属性时，这个方法非常有用。

#### 方法签名

```swift
@available(iOS 16.0, macOS 13.0, tvOS 16.0, watchOS 9.0, *)
init<C, S>(
    _ title: S,
    sources: C,
    selection: KeyPath<C.Element, Binding<SelectionValue>>,
    @ViewBuilder content: () -> Content
) where C : RandomAccessCollection, S : StringProtocol
```

#### 参数说明

| 参数 | 说明 |
| ------ | ------ |
| `title` | 描述选择目的的字符串 |
| `sources` | 用作 Picker 数据源的集合 |
| `selection` | 指向当前选中选项的键路径。当用户选择某个选项时，集合中所有元素在该键路径处的值都会更新 |
| `content` | 包含选项内容的视图 |

#### 混合状态

如果传递给 `sources` 的集合中包装的值不完全相同，某些样式会以混合状态呈现选择。具体表现取决于样式。例如，使用菜单样式的 Picker 会显示短横线（`—`）而不是勾选标记来表示选中值。

#### 示例：管理多个对象的边框粗细

```swift
import SwiftUI

enum Thickness: String, CaseIterable, Identifiable {
    case thin = "细"
    case regular = "中"
    case thick = "粗"
    
    var id: String { rawValue }
}

struct Border {
    var color: Color
    var thickness: Thickness
}

struct InspectorView: View {
    @State private var selectedObjectBorders = [
        Border(color: .black, thickness: .thin),
        Border(color: .red, thickness: .thick)
    ]
    
    var body: some View {
        VStack {
            // 绑定到 selectedObjectBorders 数组中的 thickness 属性
            Picker(
                "边框粗细",
                sources: $selectedObjectBorders,
                selection: \.thickness
            ) {
                ForEach(Thickness.allCases) { thickness in
                    Text(thickness.rawValue)
                }
            }
            .pickerStyle(.menu)
            
            // 显示当前选中的粗细值
            Text("选中的粗细: \(selectedObjectBorders[0].thickness.rawValue)")
        }
        .padding()
    }
}
```

**工作原理：**

1. `sources` 接收一个绑定集合 `$selectedObjectBorders`
2. `selection` 指向集合中每个元素的 `thickness` 属性
3. 当用户选择新值时，集合中所有对象的 `thickness` 属性都会更新为新值
4. 如果集合中各对象的 `thickness` 值不相同，Picker 会显示混合状态

#### 带自定义标签的版本

如果你需要自定义标签视图，可以使用 `init(sources:selection:content:label:)` 方法：

```swift
Picker(
    sources: $selectedObjectBorders,
    selection: \.thickness
) {
    ForEach(Thickness.allCases) { thickness in
        Text(thickness.rawValue)
    }
} label: {
    Label("边框粗细", systemImage: "line.3.horizontal")
}
```

#### 使用场景

- **批量编辑**：同时编辑多个选中对象的同一属性
- **文档检查器**：控制当前选中的多个形状的边框、颜色等属性
- **表格单元格**：统一管理多行数据的同一字段值

## 修饰符

您可以使用 `pickerStyle(_:)` 修饰符来自定义选择器的外观和交互方式。SwiftUI 提供了几种符合 `PickerStyle` 协议的内置样式。

### 可用样式

| 样别 | 说明 | 平台支持 |
|------|------|----------|
| `automatic` | 默认样式，由系根据上下文自动选择 | 所有平台 |
| `menu` | 菜单样式，点击后弹出选项列表 | iOS, macOS, etc. |
| `segmented` | 分段控件样式，显示为水平分段 | iOS, macOS, tvOS |
| `inline` | 内联样式，选项在一行内显示（适用于少量选项） | 所有平台 |
| `wheel` | 滚轮样式，类似于 `UIDatePicker` 的滚轮 | iOS, watchOS |
| `palette` | 调色板样式，显示为按钮组（常用于颜色选择） | macOS |
| `navigationLink` | 导航链接样式，选择时推送新视图 | iOS, macOS（在导航视图中） |

### 应用样式

```swift
Picker("口味", selection: $selectedFlavor) {
    ForEach(Flavor.allCases) { flavor in
        Text(flavor.rawValue.capitalized).tag(flavor)
    }
}
.pickerStyle(.segmented)
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

## 完整示例

以下示例展示了一个带有自定义标签、使用 `ForEach` 生成选项并应用分段样式的选择器：

```swift
import SwiftUI

enum Theme: String, CaseIterable, Identifiable {
    case light = "浅色"
    case dark = "深色"
    case system = "系统默认"
    
    var id: String { rawValue }
}

struct ThemePicker: View {
    @State private var selectedTheme = Theme.system
    
    var body: some View {
        Form {
            Section(header: Text("外观")) {
                Picker("主题", selection: $selectedTheme) {
                    ForEach(Theme.allCases) { theme in
                        Text(theme.rawValue).tag(theme)
                    }
                }
                .pickerStyle(.segmented)
            }
        }
        .padding()
    }
}
```

## 注意事项

- 选择器的外观高度依赖于其使用的容器（如 `List`, `Form`）和平台。
- 确保选择项的标签类型与绑定的 `Value` 类型匹配，否则需要使用 `tag(_:)` 修饰符显式指定标签。
- 对于选项较少的情况，考虑使用 `inline` 或 `segmented` 样式以获得更好的用户体验。
- 在需要导航到新页面进行选择的场景中，可使用 `navigationLink` 样式。
