---
# 文章的标题
title: "Xcode"
# 文章的时间
date: 2024-07-03T13:41:14+08:00
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

## 代码标记

* MARK: 标记

```swift
// MARK: - 这是一处代码标记
```

* TODO: 待完成的任务

```swift
// TODO: - 待完成的任务
```

* FIXME: 修复的错误

```swift
// FIXME: - 修复的 BUG 描述
```

## 代码注释

右键点击要添加的代码，会弹出一个操作菜单，点击 `Add Documentation`，即可在代码上方生成注释模版

```swift
/// 代码注释的简短介绍。例如：TableViewCell 被点击时调用
/// 
/// 这里写一些详细的说明
/// - Parameters: 
///   - tableView: 
///   - indexPath: 

func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        ...
}
```

## 注释中的 Markdown 语法

```swift
/// 这里是一段 Markdown 语法的注释
///
/// # 标题
///
/// ## 副标题
///
/// ### 三级标题
///
/// #### 四级标题
///
/// ##### 五级标题
///
/// 1. 列表
/// 2. 列表
///
/// * 列表
/// * 列表
///
/// ```swift
///  //代码块
/// ```
///
/// > 引用, 在 Xcode 中展示为笔记
///
/// **加粗**
///
/// *斜体*
///
/// ~~删除线~~
```