---
# 文章的标题
title: "UIButton"
# 文章的时间
date: 2025-02-28T11:09:46+08:00
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

## 水平对齐

通过设置 `contentHorizontalAlignment` 属性来改变 **UIButton** 的内容(图标和标题)水平对齐方式。 该属性有6个枚举值：

* center
* left
* right
* fill
* leading(iOS 11.0, *)
* trailing(iOS 11.0, *)

``` Swift
let button = UIButton(type: .system)
button.setTitle("按钮文本", for: .normal)
button.contentHorizontalAlignment = .left
```

## 内容边距

通过设置 `contentEdgeInsets` 属性来改变 **UIButton** 的内容(图标和标题)上、下、左、右边距。

``` Swift
et button = UIButton(type: .system)
button.setTitle("按钮文本", for: .normal)
button.contentEdgeInsets = UIEdgeInsets(top: 0, left: 10, bottom: 0, right: 0)
```