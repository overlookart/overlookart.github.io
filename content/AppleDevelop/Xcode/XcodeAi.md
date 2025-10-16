---
# 文章的标题
title: "在 Xcode 26 中使用 AI 助手"
# 文章的时间
date: 2025-10-16T13:24:10+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "Xcode 26 引入了内置的 AI 助手，帮助开发者提高代码编写效率和质量。本文介绍如何在 Xcode 26 中使用 AI 助手。"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

## 接入 Ollama

1. 注册并登录 [Ollama](https://ollama.com/) 账号。
2. 创建 一个 API key。
3. 打开 Xcode，进入 `Xcode` > `Settings` > `Intelligence`，点击 Add a Model Provider 打开添加 模型窗口。
4. URL 填写 `https://ollama.com`，API Key 填写你在 Ollama 创建的 API Key，点击 Add。
5. 添加成功后，Ollama 的模型列表就会加载出来。
6. 在 Xcode 的 AI 助手中选择一个 Ollama 提供的模型，就可以开始使用了。


## 使用 AI 助手

1. 在输入框中输入 `@` 符后，就可以选择本次会话关联的文件。
