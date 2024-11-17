---
# 文章的标题
title: "网络互联硬件"
# 文章的时间
date: 2024-04-18T22:53:28+08:00
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

## 网络的设备

构建一个实际的网络需要网络传输介质、网络互联设备作为支持

|协议层|互联设备|作用|
|---|---|---|
|物理层|中继器、集线器|`中继器`是信号在介质中传输的过程中会有衰减和噪声，使用中继器进行放大和去噪。`集线器`是一种特殊的多路中继器|
|数据链路层|网桥、交换机|`网桥`连接两个局域网，检查帧的原地址和目标地址，若两者在同一网段上，则不转发，否则转发到另一个网段上。`交换机`检查以太网帧的目的MAC地址，在自己的地址表(端口号-MAC)中进行查找并转发|
|网络层|路由器|用于连接多个逻辑上分开的网络，最主要的功能是选择路由路径|
|应用层|网关|将协议进行转换，将数据重新分组，以便在两个不同类型的网络系统之间进行通信|

## 网络传输介质

传输介质是信号传输的媒介。常用的传输介质有有线介质和无线介质

|介质种类|介质|说明|
|---|---|---|
|有线介质|双绞线、同轴电缆、光纤|双绞线分为3类、4类、5类、6类、7类。同轴电缆分为基带同轴电缆和宽带同轴电缆|
|无线介质|微波、红外线、激光卫星||
