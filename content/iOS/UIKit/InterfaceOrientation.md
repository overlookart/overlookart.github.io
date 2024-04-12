---
# 文章的标题
title: "设备方向"
# 文章的时间
date: 2024-04-11T16:41:29+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "设备方向旋转"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

## APP 支持的屏幕方向

虽然在 Xcode 中设置了 iOS 项目所支持的方向，但是可以在 AppDelegate 中动态修改 APP 支持的方向

``` swift
// AppDelegate.swift 

/// 是否允许支持所有方向
public var allowRotation: Bool = false

func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
    if allowRotation { return .all }    
    return .portrait
}

// ViewController.swift
override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)
    if let appDelegate = UIApplication.shared.delegate as? AppDelegate {
        appDelegate.allowRotation = true
    }  
}

override func viewDidDisappear(_ animated: Bool) {
    super.viewDidDisappear(animated)
    if let appDelegate = UIApplication.shared.delegate as? AppDelegate {
        appDelegate.allowRotation = false
    }
}
```

## 手动旋转屏幕方向