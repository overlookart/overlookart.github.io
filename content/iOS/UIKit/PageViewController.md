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

## 创建 PageViewController  

``` swift
// transitionStyle 指定页面切换时的过渡样式
// navigationOrientation 指定页面切换导航方向 水平，垂直
let pageVC = UIPageViewController(transitionStyle: .scroll, navigationOrientation: .vertical)

// 设置 PageViewController 的 dataSource 和 delegate
pageVC.delegate = ...

pageVC.dataSource = ...

// 设置 PageViewController 的 viewControllers
pageVC.setViewControllers([...], direction: .forward, animated: true, completion: nil)
```  

## 数据与页面联动

``` swift
/// 获取页面对应的数据下标索引
/// - Parameter entryPage: 页面
/// - Returns: 下标索引
private func indexOf(ViewController viewController: UIViewController) -> Int? {
    // dataSource 中查找 viewController 的索引
    // id 字段为 数据 的唯一标识
    return dataSource.firstIndex(where: { $0.id == viewController.id })
}
/// 通过下标索引获取 ViewController
/// - Parameter index: 下标索引
/// - Returns: ViewController
private func viewControllerOf(Index index: Int) -> UIViewController? {
    let viewControllers = UIViewController()
    viewController.id = dataSource[index].id
    return viewController
}
```

## 协议代理  

UIPageViewControllerDelegate  

``` swift
//UIPageViewControllerDataSource  
/// 获取上一页的视图控制器
func pageViewController(_ pageViewController: UIPageViewController, viewControllerBefore viewController: UIViewController) -> UIViewController? {
    // 数据类型转换
    guard let vc = viewController as? CustomViewController else { return nil }
    // 获取上一页的下标索引
    guard let index = indexOf(ViewController: vc) else { return nil }
    // 索引校验，防止数据越界
    if index <= 0 { return nil}
    // 返回上一页的视图控制器
    return viewControllerOf(Index: index - 1)
}

/// 获取下一页的视图控制器
func pageViewController(_ pageViewController: UIPageViewController, viewControllerAfter viewController: UIViewController) -> UIViewController? {
    // 数据类型转换
    guard let vc = viewController as? CustomViewController else { return nil }
    // 获取下一页的下标索引
    guard let index = indexOf(ViewController: vc) else { return nil }
    // 索引校验，防止数据越界
    if index >= dataSource.count - 1 { return nil }
    // 返回下一页的视图控制器
    return viewControllerOf(Index: index + 1)
}

func presentationCount(for pageViewController: UIPageViewController) -> Int {
    //返回 PageControl 中的数量，⚠️⚠️⚠️水平翻页模式下返回1将不会展示页面展示 PageControl
    return 1
}
    
func presentationIndex(for pageViewController: UIPageViewController) -> Int {
    //返回在 PageControl 中的选定项的索引
    return 1
}
```

## 手动翻页控制  

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
