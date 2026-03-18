---
# 文章的标题
title: "Link"
# 文章的时间
date: 2026-03-17T14:51:44+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "Link 是 SwiftUI 中用于导航到 URL 的控件"
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

**Link** 是一个用于导航到指定 URL 的控件。它允许创建一个可点击的元素，当用户点击时会打开指定的 URL。

**Link** 符合 `View` 协议，因此可以像使用其他 SwiftUI 视图一样使用它。

``` Swift
@MainActor @preconcurrency
struct Link<Label> where Label : View
```

## 创建 Link

### 使用字符串标题

使用 `init(_:destination:)` 初始化方法创建一个带有字符串标题的 Link：

``` Swift
/// 使用字符串标题
Link("访问 Apple 官网", destination: URL(string: "https://www.apple.com")!)

/// 使用 LocalizedStringKey（支持本地化）
Link("查看服务条款", destination: URL(string: "https://example.com/TOS.html")!)
```

### 使用自定义标签

使用 `init(destination:label:)` 初始化方法创建一个显示自定义标签的 Link：

``` Swift
/// 使用自定义视图作为标签
Link(destination: URL(string: "https://www.apple.com")!) {
    HStack {
        Image(systemName: "apple.logo")
        Text("访问 Apple")
    }
}
```

## 链接行为

### 默认行为

当用户点击 `Link` 时，默认行为取决于 URL 的内容类型：

* **Universal Link**：如果存在关联的 App，则在 App 中打开
* **网页 URL**：在用户默认浏览器中打开
* **其他 URL 类型**：根据系统配置处理

``` Swift
// 默认行为示例
Link("查看文档", destination: URL(string: "https://developer.apple.com/documentation")!)
```

### 自定义 URL 处理

可以通过设置 `openURL` 环境值来覆盖默认行为：

``` Swift
Link("访问网站", destination: URL(string: "https://www.example.com")!)
    .environment(\.openURL, OpenURLAction { url in
        // 自定义处理逻辑
        print("即将打开: \(url)")
        return .handled  // 标记为已处理，不再执行默认行为
    })

// 或者使用 .peek() 预览 URL
Link("访问网站", destination: URL(string: "https://www.example.com")!)
    .environment(\.openURL, OpenURLAction { url in
        .peek(url)  // 预览 URL，但不执行
    })
```

> [!NOTE]
> `OpenURLAction` 的返回类型：
> - `.handled` - 表示已处理，不会执行系统默认行为
> - `.peek(url)` - 预览 URL，但允许系统继续处理
> - `.discarded` - 忽略本次操作

## 修饰符

### buttonStyle

`Link` 继承自 `View`，因此可以使用 `buttonStyle(_:)` 修饰符。SwiftUI 提供了专门的 `.link` 按钮样式，可以将按钮或容器内的按钮设置为超链接样式：

``` Swift
/// 应用到单个 Link
Link("访问网站", destination: URL(string: "https://example.com")!)
    .buttonStyle(.link)

/// 应用到多个 Link
VStack {
    Link("链接 1", destination: URL(string: "https://example.com/1")!)
    Link("链接 2", destination: URL(string: "https://example.com/2")!)
}
.buttonStyle(.link)
```

> [!NOTE]
> `.link` 按钮样式在 macOS 10.15+ 可用

### 其他修饰符

作为 `View`，`Link` 支持所有标准视图修饰符：

``` Swift
Link("访问网站", destination: URL(string: "https://example.com")!)
    .foregroundColor(.blue)           // 前景色
    .font(.headline)                  // 字体
    .padding()                        // 内边距
```

## 完整示例

``` Swift
import SwiftUI

struct LinkDemo: View {
    var body: some View {
        List {
            // 基础链接
            Section("基础用法") {
                Link("Apple 官网", destination: URL(string: "https://www.apple.com")!)
            }
            
            // 自定义标签
            Section("自定义标签") {
                Link(destination: URL(string: "https://developer.apple.com")!) {
                    Label("Apple 开发者", systemImage: "apple.logo")
                }
            }
            
            // 自定义 URL 处理
            Section("自定义处理") {
                Link("带日志的链接", destination: URL(string: "https://example.com")!)
                    .environment(\.openURL, OpenURLAction { url in
                        print("打开: \(url)")
                        return .handled
                    })
            }
            
            // 样式化链接
            Section("样式化") {
                Link("超链接样式", destination: URL(string: "https://example.com")!)
                    .buttonStyle(.link)
            }
        }
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
| tvOS | 14.0+ |
| visionOS | 1.0+ |
| watchOS | 7.0+ |

## 相关类型

* **OpenURLAction** - 自定义 URL 处理行为的环境值
* **OpenURLAction.Resolution** - URL 处理结果（handled、peek、discarded）
