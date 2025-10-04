---
# 文章的标题
title: "UIButton"
# 文章的时间
date: 2025-02-28T11:09:46+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "按钮"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

## 快速使用

* 初始化: `init(type:)`
* 设置标题: `setTitle(_:for:)`
* 设置标题颜色: `setTitleColor(_:for:)`
* 设置图标: `setImage(_:for:)`
* 设置背景图片: `setBackgroundImage(_:for:)`
* 添加点击事件: `addTarget(_:action:for:)`

``` Swift
let button = UIButton(type: .custom)
button.setTitle("按钮标题", for: .normal)
button.setTitleColor(.link, for: .normal)
button.setImage(UIImage(systemName: "xmark.circle"), for: .normal)
button.setBackgroundImage(UIImage(named: "icon"), for: .normal)
button.addTarget(self, action: #selector(buttonAction), for: .touchUpInside)

@objc private func buttonAction(){
    debugPrint("按钮点击事件")
}
```

## 调换位置

使用 `semanticContentAttribute` 属性来调换 **UIButton** 的图标和标题位置。

``` Swift
let button = UIButton(type: .system)
button.setTitle("按钮标题", for: .normal)
button.setImage(UIImage(systemName: "xmark.circle"), for: .normal)
button.semanticContentAttribute = .forceRightToLeft
```

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
button.setTitle("按钮标题", for: .normal)
button.contentHorizontalAlignment = .left
```

## 内容边距

通过设置 `contentEdgeInsets` 属性来改变 **UIButton** 的内容(图标和标题)上、下、左、右边距。

``` Swift
et button = UIButton(type: .system)
button.setTitle("按钮标题", for: .normal)
button.contentEdgeInsets = UIEdgeInsets(top: 0, left: 10, bottom: 0, right: 0)
```