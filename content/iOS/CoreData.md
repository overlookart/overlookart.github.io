---
# 文章的标题
title: "CoreData"
# 文章的时间
date: 2023-06-08T16:00:47+08:00
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

## 创建数据模型  

使用Core Data的第一步是创建一个数据模型文件来定义应用程序对象的结构，包括其对象类型、属性和关系。  

选择 File>New>文件，然后选择iOS平台选项卡。向下滚动到CoreData部分，选择 DataModel，然后单击下一步。  

## 设置 CoreData stack  

``` mermaid
flowchart TD
    id1[Persistent Container \n NSPersistentContainer]
    id2[Model \n NSManagedObjectModel]
    id3[Context \n NSManagedObjectContext]
    id4[Store Coordinattor \n NSPersistentStoreCoordinator \n ]
    id5[(Store \n 存储空间)]

    id1 --- id2
    id1 --- id3
    id1 --- id4 <--从存储中保存和获取数据的实例--- id5
    
```

NSManagedObjectModel的实例表示您的应用程序的模型文件，描述您的应用程序的类型、属性和关系。  

NSManagedObjectContext上下文的实例跟踪对应用程序类型实例的更改。  

NSPersistentStoreCoordinator存储协调员的实例从存储中保存和获取应用程序类型的实例。  

NSPersistentContainer 持久性容器的实例同时设置模型、上下文和存储协调员。  
