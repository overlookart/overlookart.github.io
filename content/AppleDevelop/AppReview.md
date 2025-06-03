---
# 文章的标题
title: "AppReview"
# 文章的时间
date: 2025-05-28T09:05:14+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "App 的审核记录"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

[App 审核指南](https://developer.apple.com/cn/app-store/review/guidelines/)

* `2025-05-22` 以游客身份完成内购买。
  
  背景：苹果 与 Epic 的官司在美国加州打输了，在2025年5月1日修改的审核指南，主要修改了支付相关的条款(3.1.1、3.1.1(a)、3.1.3 和 3.1.3(a)), 猜测因审核条款的修改本次审核的重点放在了支付(内购)这块。

  > 拒绝原因：Guideline 5.1.1 - Legal - Data Collection and Storage  
  > 具体内容：We noticed that your app requires users to register with personal information to purchase in-app purchase products that are not account based.  
  > Apps cannot require user registration prior to allowing access to app content and features that are not associated specifically to the user. User registration that requires the sharing of personal information must be optional or tied to account-specific functionality.

    与审核人员沟通的结果：用户以游客身份(不注册登录)完成内购买，购买的产品属于购买时的设备唯一标识(游客身份使用的是设备的唯一标识)，游客用户与注册用户是两个独立的用户，数据不互通。

    解决方案：提供一种静默游客登录方式，让用户以游客身份完成内购买，购买前需提示用户游客身份购买的产品只能在购买的设备上使用，要想在其它设备、其他平台上使用购买的产品请进行注册登录。


* `2025-03-18` 访问书籍或杂志内容在中国大陆需要《网络出版服务许可证》
  
  > 拒绝原因：Guideline 2.1 - Information Needed  
  > 具体内容：Specifically, your app includes or accesses book or magazine content and is intended for distribution on the App Store in China mainland. However, you have not provided a permit demonstrating authorization to distribute an app with this content.  

  解决方案：在审核时跳转到浏览器访问h5端的电子书模块，审核结束后在 App 内访问电子书模块。
