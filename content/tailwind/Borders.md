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

> 边框的圆角及宽度都可以对所有的边、角进行设置  
> 也可以对相对的边框设置宽度颜色，相邻的角设置弧度  
> 也可以对单个边框设置宽度颜色，单个角设置弧度
### 圆角、宽度及颜色   

* 圆角弧度的大小  
  
> rounded-{size?}  
> 默认值为 4px  
> none: 0px, sm:2px, md:6px, lg:8px, xl:12px, 2xl:16px, 3xl:24px, full:9999px
> 使用none取消圆角, full为完整的圆角

```html
<div class="rounded"></div>
<!-- 设置自定义的值 -->
<div class="rounded-[20px]"></div>
```  

* 边框宽度的大小

> border-{size?}  
> 默认值为: 1px  
> 0:0px, 2:2px, 4:4px, 8:8px  

``` html
<div class="border-2"></div>
<!-- 设置自定义的值 -->
<div class="border-[3px]"></div>
```

* 边框的颜色  

> border-{color}  color:色系 gray:灰, red:红, orange:橙, green:绿...
> inherit:?, transparent:透明, black:黑色, white:白色  
> border-{color}-{size} 值越大色系越深 ,{50|100|200|300|400|500|600|700|800|900|950}  
> border-{color}-{size/opacity} 通过设定opacity来调节颜色的透明度, 值越小越透明，5的倍数5...95  

``` html
<div class="border-lime-400/70"></div>
<!-- 自定义颜色 -->
<div class="border-[#243c5a]"></div>
```

* 邻角的位置  

> rounded-{t|r|b|l}-{size?}  
> t:上, r:右, b:下, l:左 

``` html
<div class="rounded-t-lg"></div>
<!-- 设置自定义的值 -->
<div class="rounded-t-[20px]"></div>
```  

* 对边的位置  

> border-{x|y}-{size?}  
> x: 水平位置, y: 垂直位置  

``` html
<div class="border-x"></div>
```

* 对边的颜色  

> border-{x|y}-{color}  
> x: 水平位置, y: 垂直位置  
> 取决于对边的位置  

``` html
<div class="border-x-amber-400"></div>
```

* 单个角的位置  

> rounded-{tl|tr|br|bl}-{size?}  
> tl:左上, tr:右上, br:右下, bl:坐下

``` html
<div class="rounded-tl-md"></div>
<!-- 设置自定义的值 -->
<div class="rounded-tl-[20px]"></div>
```

* 单条边框的位置  

> border-{t|r|b|l}-{size?}  
> t:上, r:右, b:下, l:左  

``` html
<div class="border-r"></div>
```

* 单条边框的颜色  

> border-{t|r|b|l}-{color}  
> t:上, r:右, b:下, l:左  
> 取决于边框的位置  

``` html
<div class="border-r-amber-400"></div>
```

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