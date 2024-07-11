---
# 文章的标题
title: "Swift 命令行工具"
# 文章的时间
date: 2024-07-11T11:49:25+08:00
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

## 查看 Swift 版本

``` shell
swift --version
```

## 初始化 Swift 项目

使用包管理器 `SwiftPM` 初始化一个新项目

``` shell
# 创建一个名为 MyProject 的目录
mkdir MyProject
# 进入目录
cd MyProject
# 初始化 Swift 项目, --name 指定项目名称, --type 指定项目类型|empty:空包|library:静态包|executable:可执行程序|system-module:系统包|
swift package init --name ProjectName --type executable
```

## 编译 Swift 项目

``` shell
# 进入项目目录
cd MyProject
# 编译项目
swift build
```

## 运行 Swift 项目

``` shell
# 进入项目目录
cd MyProject
# 运行项目
swift run ProjectName
```

## 添加依赖项

``` shell
# 进入项目目录
cd MyProject
# 添加依赖项
swift package add PackageName
```

