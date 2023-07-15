---
# 文章的标题
title: "{{ replace .Name "-" " " | title }}"
# 文章的时间
date: {{ .Date.Format "2006-01-02 15:04:05" }}
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: true
# 文章描述 在文章列表页展示的内容
description: "文章描述"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate: {{ .ExpiryDate }} 
# 文章的发布时间  未到达发布时间不会发布到文章列表
publishDate: {{ .PublishDate.Format "2006-01-02 15:04:05" }}
# 上次修改的日期
lastmod: {{ .Lastmod.Format "2006-01-02 15:04:05" }}
# 作者
author: "OverookArt"
---