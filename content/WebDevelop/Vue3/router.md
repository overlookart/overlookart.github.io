---
# 文章的标题
title: "Router"
# 文章的时间
date: 2025-05-09T13:07:29+08:00
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

## 使用

1. 从 vue-router 引入 useRouter、 useRoute, 并初始。

    ``` vue
    <template>
        ...
    </template>

    <script setup>
        import { useRouter, useRoute } from 'vue-router'

        const router = useRouter();
        const route = useRoute();
    </script>
    ```

2. 通过 router 进行跳转

   ``` vue
    // path: 目标路由
    // query: url 携带的参数
    router.push({ path: '/docCentre/docList', query: item })
   ```

3. 通过 route 接收路由参数

    ``` vue
    const query = route.query;
    ```
