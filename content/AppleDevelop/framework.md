---
# 文章的标题
title: "构建 Framework"
# 文章的时间
date: 2023-07-19T19:50:13+08:00
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

## 在 GitHub 上建立一个公开的代码库  

## 创建一个 APP 工程，在该工程下创建一个 Framework 

## 创建一个 CocoaPods 文件   

## 创建一个 CocoaPods 空间 

在 根目录下创建 `podspec` 文件，内容如下：

``` shell
// fileName 为 podspec 文件名
pod spec create fileName
```

## 用 pod 验证 Framework 代码是否报错

``` shell
pod lib lint fileName.podspec 
```

## 将本地仓库同步到 GitHub 仓库  

``` shell
git add.
git commit -m "提交信息"
# 添加 tag
git tag '0.0.1'
# 推送 tag
git push --tags
```

## 注册 CocoaPods 账号 

``` shell
pod trunk register <邮箱> '用户名' --description='描述信息'
```

## 将 Framework 发布到 CocoaPods

``` shell
pod trunk push fileName.podspec --allow-warnings
```

* 发布成功的提示

``` shell
 🎉  Congrats

 🚀  LAWebView (0.1.2) successfully published
 📅  September 1st, 23:57
 🌎  https://cocoapods.org/pods/LAWebView
 👍  Tell your friends!
```