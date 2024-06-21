---
# 文章的标题
title: "导航条样式"
# 文章的时间
date: 2024-04-18T17:08:10+08:00
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

在 iOS 13 以后使用 `UINavigationBarAppearance` 自定义导航条样式。

创建 `UINavigationBarAppearance`对象后，使用该类的方法和属性来指定导航栏中项目所需的外观。使用 `UIBarAppearance` 继承的属性来配置导航栏本身的背景和阴影属性。

``` swift
// BasicViewController.swift

class BasicViewController: UIViewController {

    private lazy var navigationBarAppearance: UINavigationBarAppearance = {
        let barAppearance = UINavigationBarAppearance()
        // 设置导航栏标题富文本样式
        barAppearance.titleTextAttributes
        // 设置导航栏返回指示图，任何一张图为空就会使用系统默认的
        barAppearance.setBackIndicatorImage(UIImage(named: ""), transitionMaskImage: UIImage(named: ""))

        // 设置背景模糊效果
        barAppearance.backgroundEffect

        // 设置背景色
        barAppearance.backgroundColor

        // 设置背景图，在背景色顶部展示
        barAppearance.backgroundImage

        // 设置展示背景图内容模式
        barAppearance.backgroundImageContentMode

        // 设置阴影颜色
        barAppearance.shadowColor

        // 设置阴影图片
        barAppearance.shadowImage

        // 使用默认背景和阴影值配置外观。
        barAppearance.configureWithDefaultBackground()

        // 用一组适合当前主题的不透明颜色配置外观。
        barAppearance.configureWithOpaqueBackground()

        // 配置具有透明背景且无阴影的外观
        barAppearance.configureWithTransparentBackground()

        return barAppearance

    }()

    override func viewDidLoad() {
        super.viewDidLoad()
        navigationController?.navigationBar.standardAppearance = navigationBarAppearance
        navigationController?.navigationBar.scrollEdgeAppearance = navigationBarAppearance
        navigationController?.navigationBar.compactAppearance = navigationBarAppearance

        // 设置导航条 tintColor 可已调整导航按钮的样式
        navigationController?.navigationBar.tintColor = .black
    }
}
```
