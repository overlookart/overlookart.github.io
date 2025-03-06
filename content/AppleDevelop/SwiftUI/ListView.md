---
# 文章的标题
title: "ListView"
# 文章的时间
date: 2025-03-05T09:15:43+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "一个列表视图，用于显示一列垂直的视图，功能类似 UITableView"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

**ListView** 是一种复杂的容器类型，当它对当前显示来说太大时，它会自动提供滚动。您可以通过为列表中的行提供单独的视图来构建列表，或者使用`ForEach` 来遍历一组数据来构建列表。您还可以混合这些策略，混合任意数量的单个视图和 `ForEach` 结构。

## 展示数据

1. 创建一个结构体，并遵守 `Identifiable` 协议。 该结构体用于表示列表数据模型。

    ``` Swift
    struct DataModel: Identifiable {
        var id: UUID = UUID()
        var title: String = ""
        var subtitle: String = ""
    }
    ```

    > [!IMPORTANT]
    > 列表中的成员必须拥有**唯一标识**。唯一标识符允许SwiftUI为基础数据的变化自动生成动画，如插入、删除和移动。识别列表成员，要么遵守 `Identifiable` 协议，要么像Person一样，要么通过提供带有该类型唯一属性的关键路径的id参数。填充上述列表的ForEach取决于这种行为，列表初始化器也依赖于使用 `RandomAccessCollection` 的成员进行迭代。

2. 在 View 中声明一个数组变量，用户存放 DataModel 类型的元素。作为 ListView 展示内容的数据源。

    ``` Swift
    struct MyView: View {
        var datas: [DataModel] = [
            DataModel(title: "My Title", subtitle:"subtitle"),
            DataModel(title: "标题", subtitle: "子标题")
        ]
        var body: some View { ... }
    }
    ```

3. 在视图的 body 中声明 ListView，并在其内部通过 `ForEach` 遍历列表的数据源 **datas**，并为每条数据声明 Text 来展示数据的 title

    ``` Swift
    struct MyView: View {
        var datas: [DataModel] = [ ... ]
        var body: some View {
            ListView {
                ForEach(datas) { item in
                    Text(item.title)
                }
            }
        }
    }
    ```

## 自定义行视图

在列表内展示复杂内容，使用自定义 View 将更多的视图组合成更复杂的东西。随着行视图变得更加复杂，将视图重构为单独的视图结构，传递行需要渲染的数据。

1. 创建一个自定视图 ListRowView，声明一个要渲染的数据变量，在内部的视图用数据进行渲染。

    ``` Swift
    struct ListRowView: View {
        var model: DataModel
        var body: some View {
            VStack(alignment: .leading, spacing: 8){
                Text(model.title)
                    .font(.headline)
                Label(model.subtitle, systemImage: "exclamationmark.circle")
                    .font(.subheadline)
            }
        }
    }
    ```

2. 在 **ListView** 内的 `ForEach` 中使用自定义行视图 **ListRowView** 进行列表视图的渲染

    ``` Swift
    struct MyView: View {
        var datas: [DataModel] = [ ... ]
        var body: some View {
            ListView {
                ForEach(datas) { item in
                    ListRowView(model: item)
                }
            }
        }
    }
    ```

## 列表分组
