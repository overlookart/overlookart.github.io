---
# 文章的标题
title: "支持 MacOS"
# 文章的时间
date: 2025-09-29T09:45:20+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "用 SwiftUI 框架的 iOS 项目支持在 mac 系统上运行"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

## 项目配置

1. 在 项目的 TARGETS -> General -> Supported Destinations -> Add Destination,
2. Add Destination：点击 "+" 按钮，打开选择 Destination 的菜单。
3. 选择 Mac Catalyst 添加到支持的列表内。
4. 将运行的设备调整为 Mac，点击运行启动应用程序。

## TabView 适配

使用 `.tabViewStyle(.sidebarAdaptable)` 适配 MacOS 的侧边栏样式。

``` swift

struct MainTabView: View {
    var body: some View {
        TabView {
            ...
        }
    }
}

@main
struct SUIApp: App {
    var body: some Scene {
        WindowGroup {
            if #available(iOS 18.0, *) {
                MainTabView()
                    .tabViewStyle(.sidebarAdaptable)
            }else {
                MainTabView()
            }
        }
    }
}
```

## 隐藏标题栏

``` swift
class SceneDelegate: NSObject, UIWindowSceneDelegate {
    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = scene as? UIWindowScene else { return }
        #if targetEnvironment(macCatalyst)
        if let titleBar = windowScene.titlebar {
            titleBar.titleVisibility = .hidden
        }
        #endif
    }
}
```