---
# 文章的标题
title: "状态处理"
# 文章的时间
date: 2023-05-25T14:11:12+08:00
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

通过在类名称的开头添加一个修饰符来描述您想要定位的条件，可以有条件地应用Tailwind中的每个实用类。

## 伪类  

> hover: 鼠标悬停状态  
> focus: 获得焦点状态  
> active: 被点击激活状态  
> disabled: 禁用状态  
> checked: 被选中状态  
> focus-within: 子元素获得焦点状态  

父元素控制自元素的样式

> first: 第一个子元素  
> last: 最后一个子元素  
> odd: 奇数索引的子元素  
> even: 偶数索引的子元素  
> visited: 链接访问后的状态  
> group-hover: 鼠标悬停在父元素上激活  

例如，bg-sky-700为默认状态下的背景，鼠标悬停时背景变为：bg-sky-700

``` html
<button class="bg-sky-500 hover:bg-sky-700 ...">
  Save changes
</button>
```

## 伪元素

## 媒体设备与功能

### 响应式断点处理

| 断点前缀 | 最小宽度 | CSS |
| ------ | ------ | ------ |
| sm | 640px | @media (min-width: 640px){...} |
| md | 768px | @media (min-width: 768px){...} |
| lg | 1024px| @media (min-width: 1024px){...}|
| xl | 1280px| @media (min-width: 1280px){...}|
| 2xl| 1536px| @media (min-width: 1536px){...}|

### 主题颜色处理

## 属性选择器

## 自定义修饰符

## 高级使用

## 多个修饰符堆叠处理
