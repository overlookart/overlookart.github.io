---
# 文章的标题
title: "Filters过滤器"
# 文章的时间
date: 2023-03-19T10:21:04+08:00
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

## 背景模糊  

> backdrop-blur 背景模糊的过滤器

### 语法 

> backdrop-blur-{amount?}     //backdrop-filter: blur(?px)  
> backdrop-blur-none  //backdrop-filter: blur(0px)  
> sm:4px, _:8px, md:12px, lg:16px, xl:24px, 2xl:40px, 3xl:64px

``` html
<!-- amount 控制模糊程度 值越大越模糊 -->
<!-- 默认值为 8px -->
<div class="backdrop-blur-sm">

</div>

<!-- 直接设置模糊值 -->
<div class="backdrop-blur-[2px]">
    
</div>
```

### 移除背景模糊  

> 删除元素上的所有背景过滤器，用 background-filter-none

```html
<div class="backdrop-blur-sm backdrop-filter-none">

</div>
```

### 背景高亮  
