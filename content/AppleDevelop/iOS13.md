---
# 文章的标题
title: "iOS 13"
# 文章的时间
date: 2023-10-07T14:11:21+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "iOS 13 新增功能与弃用的API"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

## UITableView  

### 编辑菜单  

UITableViewDelegate  

``` swift
//废弃的API
func tableView(_ tableView: UITableView, editActionsForRowAt indexPath: IndexPath) -> [UITableViewRowAction]? {
    let delete = UITableViewRowAction(style: .destructive, title: "删除") { action, indexPath in
    
    }
    let modify = UITableViewRowAction(style: .normal, title: "修改") { action, indexPath in
        
    }
    return [delete, modify]
}
//代替的API
//右侧轻扫菜单
func tableView(_ tableView: UITableView, trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {
    let deleteAction = UIContextualAction(style: .destructive, title: "删除") {  action, view, result in
            
    }
        
    let modifyAction = UIContextualAction(style: .normal, title: "修改") { action, view, result in
            
    }
        
    let swipeActions = UISwipeActionsConfiguration(actions: [deleteAction, modifyAction])

    return swipeActions
}
//左侧轻扫菜单
func tableView(_ tableView: UITableView, leadingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {
    let selectAction = UIContextualAction(style: .normal, title: "选择") { action, view, result in
            
    }
    let swipeActions = UISwipeActionsConfiguration(actions: [selectAction])
        
    return swipeActions
}
```  
