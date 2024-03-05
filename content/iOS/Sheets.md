---
# 文章的标题
title: "Sheet 方式呈现 ViewController"
# 文章的时间
date: 2024-03-05T14:33:57+08:00
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

参考资料：

* [表单](https://developer.apple.com/cn/design/human-interface-guidelines/sheets)
* [UISheetPresentationController](https://developer.apple.com/documentation/uikit/uisheetpresentationcontroller)

``` swift
// MyViewController.swift
let vc = UIViewController()
if #available(iOS 15.0, *) {
    if let sheet = vc.sheetPresentationController {
        sheet.detents = [.medium(), .large()]
        sheet.largestUndimmedDetentIdentifier = .medium
        sheet.prefersScrollingExpandsWhenScrolledToEdge = false
        sheet.prefersEdgeAttachedInCompactHeight = true
        sheet.widthFollowsPreferredContentSizeWhenEdgeAttached = true
    }
}
present(vc, animated: true)
```