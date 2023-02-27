---
# 文章的标题
title: "{{ replace .Name "-" " " | title }}"
# 文章的时间
date: {{ .Date }}
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: true
# 文章描述 在文章列表页展示的内容
description: "文章描述"
# 文章的过期时间  过期后不会发布到文章列表
expiryDate: {{ .Date }} 
# 文章的发布时间  未到达发布时间不会发布到文章列表
publishDate: {{ .Date }}
# 上次修改的日期
lastmod: {{ .Date }}
# 作者
author: "OverookArt"
---
