---
# 文章的标题
title: "Cloudflare Pages"
# 文章的时间
date: 2024-07-15T15:06:41+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "将你的 Hugo 网站 部署到 Cloudflare Pages"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

> 参考 [Cloudflare Pages 官方文档](https://developers.cloudflare.com/pages/framework-guides/deploy-a-hugo-site/)

## 注册 Cloudflare 账户

首先，你需要注册一个 Cloudflare 账户，并登录。

点击 [注册 Cloudflare 账号](https://dash.cloudflare.com/sign-up) 到 Cloudflare 官网注册账号

如果你已经有 Cloudflare 账户，请点击[登录 Cloudflare 账号](https://dash.cloudflare.com/login)进行登录。

## 创建你的 Pages

请准备好一个 Hugo 网站的 GitHub 仓库，该仓库已配置 GitHub Pages，并能成功访问

在 Cloudflare Dashboard 首页， 选择 `Workers & Pages` 菜单 > Create application > Pages > Connect to Git.

## 配置构建部署

|Configuration option|value|
|---|---|
|Production branch|main|
|Build command|hugo|
|Build directory|public|