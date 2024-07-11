---
# 文章的标题
title: "Swift DocC"
# 文章的时间
date: 2024-07-11T16:57:19+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "文章描述"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

Swift-DocC插件是一个Swift软件包管理器命令插件，支持为SwiftPM库和可执行文件构建文档。

⚠️ 注意：运行 Swift-DocC 插件 需要 `Swift 5.6` 及以上版本

## 依赖 DocC 插件

``` swift
// Package.swift
let package = Package(
    //...
    dependencies: [
       .package(url: "https://github.com/swiftlang/swift-docc-plugin", from: "1.3.0"),
    ],
    targets: [
       .target(
            name: "MyProject",
            dependencies: ["SwiftDocCPlugin"]),
    ]
)

```

## 编译 Swift 项目

``` shell
swift build
```

## 生成文档

``` shell
# 生成文档到./docs 目录
swift package --allow-writing-to-directory ./docs \
    generate-documentation --target ProjectName --output-path ./docs

```

## 预览文档

``` shell
# 预览文档, 注释内容改变后需要重新执行预览文档命令
swift package --disable-sandbox preview-documentation --target ProjectName 

```
