---
# 文章的标题
title: "轻APP"
# 文章的时间
date: 2023-04-13T16:02:39+08:00
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
APP Clips

在 APP 中为 轻APP 选择一个正确的功能 ,打造出色的功能  

## 概述  

轻App 是 App 的轻量级版本，可随时随地提供部分功能。它提供了一个集中的功能集，旨在立即启动、保护用户隐私并保护资源。因此，轻 App 有一些限制。在创建轻 App 之前，请先查看轻 App 可用的技术，并确定打造出色轻 App 的功能。  

> 注意  
> 您的完整的 APP 只能有一个 轻App, 轻App 的功能必须是包含在完整App内的相同功能。  

为确保快速发布体验，轻 App 必须较小：  

* 轻App 运行在 iOS 16 及更高版本时， 轻App 的大小因限制在 15MB 内  
* 轻App 运行在 iOS 15 及更早版本时， 轻App 的大小因限制在 10MB 内  

## 可用的框架及API  

轻App 使用 SwiftUI 和 UIKit，可以访问与 完整App 相同的框架。  但是，以下框架在运行时不提供任何功能：`Assets Library`、 `Background Tasks`、`CallKit`、`CareKit`、`Contacts`、`Contacts UI`、`Core Motion`、`EventKit`、`EventKit UI`、`File Provider`、`File Provider UI`、`HealthKit`、`HomeKit`、`Media Player`、`Messages`、`Message UI`、`PhotoKit`、`ResearchKit`、`SensorKit`和`Speech`。  

在 轻App 中使用这些框架中的任何一个都不会导致编译时错误，但其 API 会在运行时返回指示不可用、数据空或错误代码的值。例如，HealthKit 的 isHealthDataAvailable（） 在你从轻App 调用它时返回 false。

轻App 无法执行后台活动，例如他们无法执行一下功能:  

* 使用 URLSession 的后台网络  
* 后台模式功能启用的功能，如将后台更新推送到应用中所述  
* 在不使用轻 App 时保持蓝牙连接的能力  

某些框架可用于轻 App 但仅提供有限的功能，或者使用它们需要特殊考虑：

* 高级网络功能和低级网络API, Bonjour等高级网络功能和CFSocket或POSIX功能等低级网络API不适用于App Clip。相反，使用URLSession或网络框架。  
* 应用程序扩展,App Clips不能包含应用程序扩展，但它们可以包含提供实时活动的小部件扩展。有关更多信息，请参阅使用您的应用程序剪辑提供现场活动。  

Core Telephony 提供的功能可用于您的App Clip。然而，它不能提供蜂窝套餐eSIM或使用具有适当授权的运营商应用程序使用的功能。例如，App Clip不能使用CTCellularPlanProvisioning和CTCellularPlanProvisioningRequest。  

CloudKit 不适用于iOS 14或15中的App Clips。从iOS 16开始，您的应用程序剪辑可以读取您的公共iCloud数据库。但是，您的App Clip无法将数据写入公共数据库或使用私人或共享容器。此外，它不能使用iCloud文档或iCloud键值存储。要了解有关在App Clip中使用CloudKit的更多信息，请参阅在App Clip和完整应用程序之间共享数据的访问公共iCloud数据库部分。  

Face ID 您无法在App Clip中使用Face ID，因为NSFaceIDUsageDescription授权不适用于App Clips。但是，您可以使用本地身份验证框架使用Touch ID对用户进行身份验证。  

请注意，App Clip可以使用热点配置授权配置Wi-Fi网络。此外，要连接到身份验证提供程序，它可以使用调用backURLScheme使用init（url:callbackURLScheme:completionHandler:）初始化ASWebAuthenticationSession。

## 保护用户隐私  

App Clips 附带了一些限制，有助于保护用户隐私并防止用户跨 App 和 App Clip 进行跟踪，例如：  

* SKAdNetwork提供的功能不可用。
* App Clips 无法请求授权以使用 App Tracking Transparency 跟踪用户。
* name 和 identifierForVendor 都返回一个空字符串。
* App Clips无法请求连续位置访问。但是，您可以调用requestWhenInUseAuthorization()来请求使用时授权，该授权在第二天凌晨4:00自动重置。
* App Clips无法请求Pass Type IDs Entitlement来读取存储在钱包应用程序中的通行证。但是，如果您的App Clip包含向钱包应用程序添加通行证的功能，您可以检查此通行证是否已经存在。有关更多信息，请参阅检查图书馆中是否有通行证。
* 除相应的完整应用程序外，App Clip无法与任何其他应用程序共享数据。有关更多信息，请参阅在App Clip和完整应用程序之间共享数据。

App Clips 附带一些限制，有助于保护用户数据。他们无法访问：

* 苹果音乐和媒体
* 来自日历、联系人、文件、健康、消息、提醒事项和照片等应用程序的数据
* 运动和健身数据

## 为完整应用保留某些功能

App Clips 提供即时体验，并专注于为日常任务提供尽可能快的解决方案，因此一些功能在您的完整应用程序中效果最佳。为完整应用程序保留以下功能：

* 应用程序扩展。
* 自定义和设置；例如，创建设置包。
* 数据切换和文档打开。
* 应用程序内购买。
* 低级UNIX功能；例如，BSD通知。
* iPad上的多个场景。
* On-demand resources。
* 注册自定义 URL schemes
* 使用StoreKit的requestReview（in：）方法请求对完整应用程序的用户评论。
* 搜索配对的蓝牙设备。


## 用 XCode 创建一个 APP Clip  

将轻 App 目标添加到 Xcode 项目，并在轻 App 与其对应的完整 App 之间共享代码  

轻 App 是 App 的轻量级版本，可在人们需要的时间和地点提供部分功能。借助 Xcode，您可以将轻 App 目标添加到 app 的项目，在轻 App 和完整 App 之间共享代码和资源，以及构建、运行和调试轻 App 。

App Clip 需要相应的完整应用程序，至少提供与应用程序剪辑相同的功能；您为完整App 和 App Clip 使用相同的Xcode项目。如果您正在启动一个新的 App 项目，请先使用Xcode创建一个新的iOS项目。如果您想将 App Clip 添加到现有的iOS应用程序中，请打开其Xcode项目。然后，将App Clip 目标添加到Xcode项目中：

1. 使用App Clip 模板添加新目标
2. 选择一个产品名称，为您的应用程序剪辑选择适用的选项，然后单击完成。
