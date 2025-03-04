---
# 文章的标题
title: "App"
# 文章的时间
date: 2023-12-25T10:33:44+08:00
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

**App**是表示应用程序`结构`和`行为`的协议类型

`iOS 14.0+`  `macOS 11.0+` `Mac Catalyst 14.0+` `tvOS 14.0+` `watchOS 7.0+` `visionOS 1.0+ Beta`  

* [探索 SwiftUI APP 的结构](https://developer.apple.com/tutorials/swiftui-concepts/exploring-the-structure-of-a-swiftui-app)

## 创建一个 APP  

应用程序结构描述了应用程序的内容和行为，每个SwiftUI应用程序只有一个主应用程序结构。此示例在MyApp.swift文件中定义了其应用程序结构。让我们来看看那个文件的内容。


1. 导入 SwiftUI 框架。
2. 使用 `@main` 为应用程序提供入口并启动应用程序。应用程序的入口只有一个。
3. 声明一个应用程序的结构体,并遵守 `App` 协议，提供应用程序的内容及其行为。
4. 实现 **App** 协议的 `body` 计算属性，此属性返回应用场景的内容。场景包含定义应用程序用户界面的视图层次结构。
5. 使用 `WindowGroup` 作为应用程序的主窗口。对于 iOS 平台通常只需要一个主窗口，但在 macOS 和 iPadOS 平台会有多个窗口。
6. 在 **WindowGroup** 添加一个遵守 `View` 协议的系统视图结构或自定义的视图结构在窗口中展示。


``` swift
// MyApp.swift
import SwiftUI
@main  // main()方法的默认实现
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            Text("Hello, world!")
        }
    }
}
``` 

``` mermaid
    flowchart TD
        App --> WindowGroup --> View
```

## 生命周期

**ScenePhase** 是SwiftUI提供的生命周期枚举，用于监控场景的各阶段变化。由于 SwiftUI 是基于 Scene 的性质，ScenePhase 只能表示 Scene 的变化。

1. 通过 `Environment` 在应用程序的 **App**、**Scene**、**View** 结构体中将其声明为**环境变量**。
2. 用 `onChange(of:perform:)` 方法来监听环境变量 **scenePhase** 的变化。
3. **ScenePhase**的枚举值：`background`、`inactive`、`active`。

``` Swift
struct ContentView: View {
    @Environment(\.scenePhase) private var scenePhase
    var body: some Scene {
        Text("Hello").onChange(of: scenePhase) { phase in
            switch phase {
                case .active:
                    debugPrint("变为活跃状态")
                case .inactive:
                    debugPrint("变为不活跃状态")
                case .background:
                    debugPrint("进入后台")
                @unknown default:
                    fatalError()
            }
        }
    }
}
```

> [!TIP]
> 在 App 结构体中监听 **ScenePhase** 时，可以获得应用程序中所有场景的状态变化；在自定义的 Scene 中监听时可以获得该场景的状态变化；在自定义 View 中监听时可以获得该视图所在场景的状态变化。

在 App 中使用 **UIApplicationDelegateAdaptor** 属性包装器处理 `UIApplicationDelegate` 应用程序的其他交互事件。

1. 创建 MyAppDelegate 类, 并遵守 `UIApplicationDelegate` 协议，实现该协议的方法。

    ``` Swift
    // MyAppDelegate.swift
    class MyAppDelegate: NSObject, UIApplicationDelegate {
        func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions:     [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
            debugPrint("App -> DidFinishLaunching")
            return true
        }
    }
    ```

    > [!NOTE]
    > 实现 UIApplicationDelegate 的方法，处理应用程序的启动事件、生命周期事件、环境变化事件、远程推送事件，管理应用程序状态，配置场景，后台数据下载，与 WatchKit 交互，与 HealthKit 交互，打开指定 URL 的资源，禁止指定的应用扩展类型，处理 SiriKit 意向，处理 CloudKit 邀请，本地化键盘快捷方式，管理界面几何图形，为故事板提供窗口，提供程序主入口。

2. 使用 `UIApplicationDelegateAdaptor` 属性包装器声明一个 appDelegate 属性，该属性的类型符合 `UIApplicationDelegate` 委托协议。

    ``` Swift
    // MyApp.swift
    import SwiftUI
    @main
    struct MyApp: App {
        @UIApplicationDelegateAdaptor private var appDelegate: MyAppDelegate
        var body: some Scene { ... }
    }
    ```

## 自定义场景  

在不同的系统下使用不同的应用场景  
