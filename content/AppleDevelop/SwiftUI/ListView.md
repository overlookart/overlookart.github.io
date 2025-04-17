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
    > 列表中的成员必须拥有**唯一标识**。唯一标识符允许SwiftUI为基础数据的变化自动生成动画，如插入、删除和移动。识别列表成员，要么遵守 `Identifiable` 协议，要么像 DataModel 一样，要么通过提供带有该类型唯一属性的关键路径的id参数。填充上述列表的ForEach取决于这种行为，列表初始化器也依赖于使用 `RandomAccessCollection` 的成员进行迭代。

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

列表视图还可以显示具有层次结构的数据，将相关数据分组到部分中。

1. 创建一个 SectionDataModel 结构体，表示分组数据。items 属性表示分组所有行的数据。

    ``` Swift
    struct SectionDataModel : Identifiable {
        var sectionId: UUID = UUID()
        var sectionName: String = ""
        var items: [DataModel] = []
    }
    ```

2. 将列表数据结构改造为二级数组结构，

    ``` Swift
    struct MyView: View {
            var datas: [SectionDataModel] = [
                SectionDataModel(sectionName: "分组1", items: [
                    DataModel(title: "My Title", subtitle: "subtitle"),
                    DataModel(title: "标题", subtitle: "子标题")
                ]),
                SectionDataModel(sectionName: "小池--杨万里", items: [
                    DataModel(title: "泉眼无声惜细流", subtitle: "树阴照水爱晴柔"),
                    DataModel(title: "小荷才露尖尖角", subtitle: "早有蜻蜓立上头")
                ])
            ]
            var body: some View { ... }
        }
    ```

3. 使用 `Section` 视图为列表中的数据提供层次结构。

    ``` Swift
    struct MyView: View {
        var datas: [SectionDataModel] = [ ... ]
        var body: some View {
            List {
                ForEach(datas) { section in
                    Section(header: Text(section.sectionName)) {
                        ForEach(section.items) { item in
                            ListRowView(model: item)
                        }
                    }
                }
            }
        }
    }
    ```

## 列表导航

**List** 必须被包含 在 `NavigationView` 中, 使用 `NavigationLink` 导航至下一个 View。

通过用 `NavigationView` 包装列表来设置基于导航的用户界面。`NavigationLink` 的实例包裹列表的行，以提供目标视图，以便在用户点击该行时导航。

``` Swift
NavigationView {
    MyView()
}
```

``` Swift
struct MyView: View {
    var datas: [SectionDataModel] = [ ... ]
    var body: some View {
        List {
            ForEach(datas) { section in
                Section(header: Text(section.sectionName)) {
                    ForEach(section.items) { item in
                        NavigationLink(destination: DetailView()) {
                            ListRowView(model: item)
                        }
                    }
                }
            }
        }
    }
}
```

## 列表样式

调用 **View** 协议的 `listStyle(_:)` 方法来改变列表视图的展示样式。 **ListStyle** 有下面几种静态变量：

* **automatic**：描述平台默认行为和列表外观的列表样式。
* **plain**：描述普通列表行为和外观的列表样式。页眉和页脚将悬停在列表视图的顶部和底部。
* **grouped**：描述分组列表行为和外观的列表样式。在iOS上，分组列表样式显示比普通列表样式更大的页眉和页脚，这在视觉上使不同部分的成员保持距离。
* **insetGrouped**：描述嵌集分组列表的行为和外观的列表样式。在iOS上，内嵌分组列表样式显示连续的背景颜色，该颜色从部分标题延伸到部分中列表项的两侧，一直延伸到部分页脚。这在视觉上将项目分组到比内嵌或分组样式更大的程度。

``` Swift
List {
    ForEach(datas) { item in
        ListRowView(model: item)
    }
}.listStyle(.automatic)
```

## 行内样式

* 使用 `listRowInsets(_:)` 更改列表中行内容的边距。
* 使用 `listItemTint(_:)` 设置行内特定内容关联的固定色调。
* 使用 `listRowBackground(_:)` 设置行的自定义背景视图。
* 使用 `badge(_:)` 在行内右侧展示徽章。设置徽章会导致行内背景失效。

``` Swift
...
List {
    ForEach(datas) { item in
        ListRowView(model: item)
            .listRowInsets(.init(top: 8, leading: 8, bottom: 8, trailing: 8))
            .listItemTint(.green)
            .listRowBackground(Color.purple.opacity(0.1))
            .badge("❤️")
    }
}
...
```

## 分割线样式  

* 使用 `listRowSeparatorTint(_:edges:)` 设置分割线颜色
* 使用 `listRowSeparator(_:edges:)` 设置分割线显示隐藏
* 使用 `listSectionSeparatorTint(_:edges:)` 设置分组分割线颜色
* 使用 `listSectionSeparator(_:edges:)` 设置分组分割线显示隐藏

``` Swift
List {
    Section(header: Text("分组标题")){
        ListRowView(model: item)
            .listRowSeparatorTint(.yellow, edges: .all)
            .listRowSeparator(.hidden, edges: .all)
    }
    .listSectionSeparatorTint(.cyan, edges: .all)
    .listSectionSeparator(.hidden, edges: .top)
}
```