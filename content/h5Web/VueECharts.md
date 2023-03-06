---
# 文章的标题
title: "VueECharts"
# 文章的时间
date: 2023-03-06T17:55:48+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: true
# 文章描述 在文章列表页展示的内容
description: "文章描述"
# 文章的过期时间  过期后不会发布到文章列表
expiryDate: 2023-03-06T17:55:48+08:00 
# 文章的发布时间  未到达发布时间不会发布到文章列表
publishDate: 2023-03-06T17:55:48+08:00
# 上次修改的日期
lastmod: 2023-03-06T17:55:48+08:00
# 作者
author: "OverookArt"
---

# 基于VUE3 下的 ECharts  

## 安装  

``` shell
# 安装必要依赖 @vue/composition-api
$ npm i -D @vue/composition-api  
# 安装 echarts
$ npm install echarts vue-echarts
```

## 引用

``` vue
<script setup>

import { use } from "echarts/core";
</script>
```