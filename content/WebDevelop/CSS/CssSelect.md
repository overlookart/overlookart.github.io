---
# 文章的标题
title: "CSS 选择器"
# 文章的时间
date: 2024-10-17T15:18:18+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "Web 的装扮"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

## 基础选择器  

### 标签选择器  

``` css
/** css */
p {
  background-color: gray;
  color: white;
}
/** html */
<p>标签选择器</p>
```

<p style="background-color: gray; color: white;">标签选择器</p>

### 类选择器  

``` css
.className {
  background-color: teal;
  color: white;
}

<p class="className">类选择器</p>
```

<p style="background-color: teal; color: white;">类选择器</p>

### ID选择器  

``` css
#idName {
  background-color: navy;
  color: white;
}

<p id="idName">ID选择器</p>
```

<p style="background-color: navy; color: white;">ID选择器</p>

## 关系选择器

### 后代选择器

> [!NOTE]
> 由多个标签选择器组合而成，通过标签的父子级关系为标签应用样式

### 子代选择器  

### 邻接兄弟选择器  

### 通用兄弟选择器

## 通用选择器  
 
## 相邻兄弟选择器  

## 伪类选择器  

## 伪元素选择器  

## 选择器优先级
