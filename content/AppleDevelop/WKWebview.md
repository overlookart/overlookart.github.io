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

## 那些被 WKWebview 抛弃的属性  

在 UIWebview 中有这么一个属性 paginationMode 翻页模式，做一些阅读器的功能会使用到，它有五个枚举值：

* unpaginated 无分页模式
* leftToRight 从左到右
* rightToLeft 从右到左
* topToBottom 从上到下
* bottomToTop 从下到上
  
paginationMode 属性虽然被 WKWebView 抛弃了，单还是可以通过 CSS 实现

``` css
body {
    /* 翻页模式 x:水平，y:垂直 */
    overflow: -webkit-paged-y !important;
    /* 翻页方向 t:上，l:左，b:下，r:右, ttb:从上到下 */
    direction: ttb !important;
}
```

## 注入 JS 脚本  

WKWebView 的 configuration 属性下 userContentController 管理用户脚本  

``` Swift
extension WKWebViewConfiguration {
    /// 添加用户脚本
    /// - Parameters:
    ///   - script: js脚本代码
    ///   - injectionTime: 注入时间
    ///   - forMainFrameOnly: 是否仅在主Frame注入
    ///   - world: 关键词
    public func addUserScript(script: String, injectionTime: WKUserScriptInjectionTime, forMainFrameOnly: Bool, world: String? = nil) {
        let userScript = WKUserScript(source: script, injectionTime: injectionTime, forMainFrameOnly: forMainFrameOnly)
        addUserScript(script: userScript)
    }

    /// 添加用户脚本
    /// - Parameters:
    ///   - fileName: js脚本文件名
    ///   - injectionTime: 注入时间
    ///   - forMainFrameOnly: 是否仅在主Document注入
    ///   - world: 关键词
    public func addUserScript(fileName: String, injectionTime: WKUserScriptInjectionTime, forMainFrameOnly: Bool, world: String? = nil) throws {
        do {
            let source = try String(contentsOfFile: Bundle.main.path(forResource: fileName, ofType: "js") ?? "", encoding: .utf8)
            let userScript = WKUserScript(source: source, injectionTime: injectionTime, forMainFrameOnly: forMainFrameOnly)
            addUserScript(script: userScript)
        } catch  {
            throw error
        }
    }

    /// 添加用户脚本
    /// - Parameter script: 用户脚本
    func addUserScript(script: WKUserScript) {
        userContentController.addUserScript(script)
    }
    
    /// 移除所有的用户脚本
    public func removeAllUserScript() {
        if userContentController.userScripts.count > 0 {
            userContentController.removeAllUserScripts()
        }
    }
}

```

## 禁用 JavaScript 

禁用 JavaScript 后，Web视图不会执行Web内容引用的JavaScript代码。这包括在内联`<script>`元素、javascript：URL和所有其他引用的JavaScript内容中找到的JavaScript代码。但不会影响 WKUserScripts、evaluteJavaScript、callAsyncJavaScript，它们任可以执行。

``` Swift
extension WKWebViewConfiguration {
    /// 设置是否启用 JavaScript
    /// - Parameter enabled: 是否启用 
    public func setupJavaScriptEnabled(_ enabled: Bool) {
        if #available(iOS 14.0, *) {
            defaultWebpagePreferences.allowsContentJavaScript = enabled
        } else {
            preferences.javaScriptEnabled = enabled
        }
    }
}

```

## 执行 JS 脚本  

WKWebView 提供了直接执行 JS 脚本的方法 evaluateJavaScript(_:completionHandler:)

``` Swift
webView.evaluateJavaScript("java script") { result, error in
    // result 执行脚本的结果
    // error 执行脚本的错误       
}
```

## 接收网页发送的消息  

``` Swift
class ClassName {
    /// 添加脚本消息处理
    /// - Parameters:
    ///   - handler: 消息处理
    ///   - name: 脚本消息名称
    public func addScriptMessageHandler(_ handler: WKScriptMessageHandler, name: String) {
        webview.configuration.userContentController.add(handler, name: name)
    }
}

//在网页中发送消息
//function postMessage(message){
//    window.webkit.messageHandlers.messageName.postMessage(message);
//}

//消息处理者需要遵守 WKScriptMessageHandler 协议并实现方法
extension ClassName: WKScriptMessageHandler{
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        //接收到消息的名称
        message.name
        //接收到消息的内容
        message.body
    }
}


```

## 滑动之后白屏问题  

子类继承 WKWebView 后，对子类进行扩展并遵守 UIScrollViewDelegate 协议，实现了 UIScrollViewDelegate 中的方法  

``` Swift
//BaseWebView.swift
BaseWebView: WKWebView {
    ...
}
extension BaseWebView: UIScrollViewDelegate {
    public func scrollViewDidScroll(_ scrollView: UIScrollView) {
        ...
    }

    public func scrollView ...
}
```

用 BaseWebView 或者其子类加载网页后，滑动的时候就会出现网页有部分内容没有进行渲染  