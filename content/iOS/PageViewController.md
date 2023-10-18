---
# 文章的标题
title: "UIPageViewController"
# 文章的时间
date: 2023-10-10T09:10:31+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "UIPageViewController 的使用"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

## 创建一个 PageViewController  

``` swift
// transitionStyle 指定页面切换时的过渡样式
// navigationOrientation 指定页面切换导航方向 水平，垂直
let pageVC = UIPageViewController(transitionStyle: .scroll, navigationOrientation: .vertical)
```  

## 协议代理  

UIPageViewControllerDelegate  

UIPageViewControllerDataSource  

## 翻页控制  

``` swift  
/// 下一页
public func setupNextPage(){
    /// 获取当前展示的视图控制器
    guard let currentViewController = pageVC.viewControllers?.first else { return }
    /// 获取下一页的视图控制器
    guard let nextViewController = pageVC.dataSource?.pageViewController(pageVC, viewControllerAfter: currentViewController) else { return }
    /// 设置下一页为当前显示的ViewController
    pageVC.delegate?.pageViewController?(pageVC, willTransitionTo: [nextViewController])
    pageVC.setViewControllers([nextViewController], direction: .forward, animated: true) { completed in
        self.pageVC.delegate?.pageViewController?(self.pageVC, didFinishAnimating: true, previousViewControllers: [currentViewController], transitionCompleted: completed)
}


/// 上一页
public func setupPrevPage(){
    /// 获取当前展示的视图控制器
    guard let currentViewController = pageVC.viewControllers?.first else { return }
    /// 获取上一页的视图控制器
    guard let prevViewController = pageVC.dataSource?.pageViewController(pageVC, viewControllerBefore: currentViewController) else { return }
    /// 设置上一页为当前显示的ViewController
    pageVC.delegate?.pageViewController?(pageVC, willTransitionTo: [prevViewController])
    pageVC.setViewControllers([prevViewController], direction: .reverse, animated: true) { completed in
        self.pageVC.delegate?.pageViewController?(self.pageVC, didFinishAnimating: true, previousViewControllers: [currentViewController], transitionCompleted: completed)
}
```  
