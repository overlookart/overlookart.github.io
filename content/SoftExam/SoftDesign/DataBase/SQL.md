---
# 文章的标题
title: "SQL语言"
# 文章的时间
date: 2024-04-16T22:57:53+08:00
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

## SQL 语言简介

SQL 是结构化查询语言的简称，是关系数据库中最普遍使用的语言，包括数据查询、数据操纵、数据定义和数据控制，是一种通用的、功能强大的关系数据库标准语言。

SQL 语言支持关系数据库的三级模式。基本表和视图都是表，基本表是存储在数据库中的表，而视图是虚表，是从基本表或其他视图导出的表。数据库中只存放视图的定义，不存放视图的数据。用户可用SQL语言对视图或表进行查询等操作。

## SQL 数据定义

SQL 的数据定义包括对表、视图、索引的创建和删除、属于数据库定义语言(DDL)

1. 创建表(Create Table)

   ``` sql
   CREATE TABLE<表名>(<列名><数据类型>[列级完整性约束条件])
   ```

2. 修改表(Alter Table)

   ``` sql
   // 添加一列
   ALTER TABLE <表名> ADD <新列名> <数据类型> [完整性约束条件]
   // 修改一列的数据类型
   ALTER TABLE <表名> MODIFY <列名> <数据类型>
   ```

3. 删除表

   ``` sql
   Drop Table <表名>
   ```

4. 创建索引

   ``` sql
   Create Unique Index <索引名> On <表名>(列名)
   ```

5. 删除索引

   ``` sql
   Drop Index <索引名>
   ```

6. 创建视图

   ```sql
   Create View 视图名称(列表名) As Select 查询子句
   ```

7. 删除视图

   ``` sql
   Drop View 视图名
   ```

## SQL 数据操纵

SQL 的数据操纵包括 查询(Select)、插入(Insert)、删除(Delete)、修改(Update)，属于数据库操纵语言(DML)

1. 查询语句

   ``` sql
   Select [All | Distinct] <目标列表达式> From <表名或视图名> Where <条件表达式> Group By <列名> Order By <列名>
   ```

2. 插入语句

   ``` sql
   Insert Into 基本表名(字段名，字段名...) Values(常量，常量...)
   ```

3. 删除语句

   ``` sql
   Delete From 基本表名 Where 条件表达式
   ```

4. 修改语句

   ``` sql
   Update 基本表名 Set 列名=表达式 Where 条件表达式
   ```

## 事务

* COMMIT事务提交:该操作表示事务成功的结束，它将通知事务管理器将该事务的所有更新操作现在可以被提交或永久保留
* ROLLBACK事务回滚:改操作表示事务未成功的结束，它将通知事务管理器出了故障，数据库可能处于不一致的状态，该事务的所有更新操作必须回滚或撤销。