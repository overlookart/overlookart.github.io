---
# 文章的标题
title: "UISheetPresentationController"
# 文章的时间
date: 2024-03-05T14:33:57+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "以表单的方式呈现 ViewController"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

> 参考资料：
> * [苹果人机界面指南 - 表单](https://developer.apple.com/cn/design/human-interface-guidelines/sheets)
> * [UISheetPresentationController](https://developer.apple.com/documentation/uikit/uisheetpresentationcontroller)

表单可帮助用户执行与其当前环境密切相关的小范围任务。
![图片说明](https://docs-assets.developer.apple.com/published/a9f4130b939f50eaaf153127b0f36c62/components-sheet-intro@2x.png "来自 Apple Developer Documentation")

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

> [!NOTE]
> 设置 UIViewController 的 modalPresentationStyle 属性为 `fullScreen` 时，将不会以表单的形式呈现。 
>

![大号定位](https://docs-assets.developer.apple.com/published/88fa65b9a4958117da1d36bd5120676d/large-detent-area@2x.png "大号定位")

![中号定位](https://docs-assets.developer.apple.com/published/f0cc2cab98434537d7e46d551fe5fd03/medium-detent-area@2x.png "中号定位")