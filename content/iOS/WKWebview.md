---
# 文章的标题
title: "WKWebview"
# 文章的时间
date: 2023-04-27T10:13:55+08:00
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
author: "OverookArt"
---

## 监听 WKWebview 属性  

> 可监听 `title`, `loading`, `estimatedProgress`, `URL`, `canGoBack`, `canGoForward`  

``` Swift
import RxSwift
import RxCocoa
import WebKit
extension Reactive where Base: WKWebView {
    // 标题
    public var title: Observable<String> {
        return self.observeWeakly(String.self, "title").map{$0 ?? ""}
    }
    // url
    public var url: Observable<URL?> {
        return self.observeWeakly(URL.self, "URL")
    }
    // 加载中
    public var loading: Observable<Bool> {
        return self.observeWeakly(Bool.self, "loading").map{$0 ?? false}
    }
    // 加载进度   
    public var progress: Observable<Float> {
        return self.observeWeakly(Double.self, "estimatedProgress").map { Float($0 ?? 0.0) }
    }
    // 可以后退       
    public var canGoBack: Observable<Bool> {
        return self.observeWeakly(Bool.self, "canGoBack").map{ $0 ?? false}
    }
    // 可以前进    
    public var canGoForward: Observable<Bool> {
        return self.observeWeakly(Bool.self, "canGoForward").map { $0 ?? false }
    }
}

```  
