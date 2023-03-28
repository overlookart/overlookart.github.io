---
# 文章的标题
title: "Borders"
# 文章的时间
date: 2023-03-28T15:55:23+08:00
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

## 单个元素边框  

### 圆角  

> 圆角的弧度  
> rounded-{size?}  
> 默认值为 4px  
> none: 0px, sm:2px, md:6px, lg:8px, xl:12px, 2xl:16px, 3xl:24px, full:9999px
> 使用none取消圆角, full为完整的圆角

```html
<div class="rounded"></div>
<!-- 设置自定义的值 -->
<div class="rounded-[20px]"></div>
```

> -对角的位置  
> rounded-{t|r|b|l}{-size?}  
> t:上, r:右, b:下, l:左 

``` html
<div class="rounded-t-lg"></div>
<!-- 设置自定义的值 -->
<div class="rounded-t-[20px]"></div>
```

> 单个角的位置  
> rounded-{tl|tr|br|bl}{-size?}  
> tl:左上, tr:右上, br:右下, bl:坐下

``` html
<div class="rounded-tl-md"></div>
<!-- 设置自定义的值 -->
<div class="rounded-tl-[20px]"></div>
```


### 宽度  

### 颜色  

### 样式  

## 多个元素边框  

### 宽度  

### 颜色  

### 样式  

## 外边框  

### 宽度  

### 颜色  

### 样式  

### 偏移  

## 边框阴影  

### 宽度  

### 颜色  

### 偏移宽度  

### 偏移颜色  