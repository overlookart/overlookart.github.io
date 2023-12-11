---
# 文章的标题
title: "轮式载具"
# 文章的时间
date: 2023-11-25T12:55:49+08:00
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

1. 启用轮式载具插件  ChaosVehiclesPlugin  
2. 准备一个轮式载具骨骼网格体资产  

## 创建物理资产  

为载具的骨骼网格体创建物理资产

## 创建动画蓝图

## 创建车轮蓝图  

创建前轮后轮蓝图，父类为 ChaosVehicleWheel  

## 创建扭矩曲线  

## 创建载具蓝图  

创建轮式载具蓝图，父类为 WheeledVehiclePawn  

## 设置载具输入  

* 油门输入  
* 刹车输入  
* 转向输入  
* 手刹输入  
* 加速输入  
* 减速输入  