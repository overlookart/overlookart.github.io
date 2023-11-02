---
# 文章的标题
title: "GiscusComments"
# 文章的时间
date: 2023-11-02T09:23:57+08:00
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

> 用 GitHub 的  Discussions 与 GitHub APP Giscus 为你的页面构建评论区  

## 必要条件

* 一个公开的 GitHub 仓库  
* 仓库启用了 Discussions 功能  
* 仓库安装了 Giscus APP

## 安装 Giscus  

在 [GitHub 应用市场](https://github.com/marketplace) 搜索 Giscus APP，在 Giscus 详情页安装到仓库

## 配置 Giscus  

> 在 [Giscus 官网](https://giscus.app/zh-CN) 进行配置

* 语言 选择一个 giscus 的显示语言
* 仓库 选择 giscus 连接到的仓库，满足必要条件才会连接成功  
* 映射 选择页面与嵌入的 discussion 之间的映射关系  
* 分类 选择新 discussions 所在的分类。 推荐使用公告（announcements）类型的分类，以确保新 discussion 只能由仓库维护者和 giscus 创建  
* 特性 选择是否启用某些特性  
* 主题 选择适合你网站的主题  

## 启用 Giscus  

配置成功后会生成一个完整 script 标签 代码  

``` html
<script src="https://giscus.app/client.js"
        data-repo=""
        data-repo-id=""
        data-category="Announcements"
        data-category-id=""
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="zh-CN"
        crossorigin="anonymous"
        async>
</script>
```  

> 参数说明  

* data-repo :连接的仓库，由 `用户名/仓库名` 组成  
* data-repo-id : 连接仓库的id，当连接仓库成功后该值自动生成  
  
在你想让评论出现的位置添加以下 `<script>` 标签  
