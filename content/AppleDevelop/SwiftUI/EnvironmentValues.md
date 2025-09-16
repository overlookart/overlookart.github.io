---
# 文章的标题
title: "Environment Values"
# 文章的时间
date: 2025-09-15T11:33:23+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "环境变量的集合，用于在视图层次结构中传递数据"
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

**EnvironmentValues** 是一个结构体，包含了一组环境变量，这些变量可以在 SwiftUI 视图层次结构中传递数据。环境变量用于在视图之间共享信息，而无需显式地将数据传递给每个视图。

SwiftUI 提供了一些预定义的环境变量，例如 `colorScheme`、`locale`、`sizeCategory` 等。您还可以创建自定义的环境变量，以便在视图层次结构中传递特定的数据。

## 使用

在任何视图中使用 `@Environment` 属性包装器声明一个属性，并指定值的路径，通过该属性访问环境变量的值。

``` swift
struct ContentView: View {
    @Environment(\.locale) var locale: Locale
}
```

要设置环境变量的值，可以使用 `environment` 修饰符将其应用于视图层次结构中的某个视图。

``` swift
struct ContentView: View {
    var body: some View {
        Text("Hello, World!")
            .environment(\.locale, Locale(identifier: "fr"))
    }
}
```

## 系统的环境变量

* **layoutDirection**：布局方向。
* **controlSize**：应用于视图中控件的大小。
* **multilineTextAlignment**：当内容换行或包含换行符时，文本视图如何对齐其行。
* **truncationMode**：如何截断最后一行文本以适应可用空间。
* **lineSpacing**：行间距。
* **allowsTightening**：字符间距是否应收紧以将文本放入可用空间。
* **minimumScaleFactor**：缩小字体大小的最小允许比例，以使文本适应可用空间。
* **textCase**：使用环境的区域设置，在显示时转换文本大小写的风格覆盖。
* **lineLimit**：文本在视图中可以占用的最大行数。
* **dynamicTypeSize**：当前动态类型大小，此值会随着用户选择的动态类型大小的变化而变化。默认值取决于设备。
* **headerProminence**：应用于视图中的分组标题的突出性。
* **symbolVariants**：在此环境中使用的符号变体。
* **font**：此环境的默认字体。
* **imageScale**：此环境的图像缩放比例。默认值取决于设备。
* **displayScale**：此环境的显示比例。默认值取决于设备。
* **pixelLength**：设备屏幕上像素的大小。
* **legibilityWeight**：应用于文本的字体粗细。
* **locale**：当前区域。
* **calendar**：当前日历。
* **timeZone**：当前时区。
* **horizontalSizeClass**：水平朝向时的尺寸类
* **verticalSizeClass**：垂直朝向时的尺寸类

## 自定义环境变量

对 **EnvironmentValues** 结构体进行扩展，用 `@Entry` 声明一个属性，属性名为自定义环境变量的名称，属性类型为环境变量的类型，并提供一个默认值。然后在视图中像使用系统的环境变量一样使用它。

``` swift
/// 自定义环境变量
extension EnvironmentValues {
    @Entry var customValue: String = "Default"
}

/// 使用环境变量
struct ContentView: View {
    @Environment(\.customValue) var customValue: String
    var body: some View {
        Text(customValue)
    }
}

```