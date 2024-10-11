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
    id1[Persistent Container  NSPersistentContainer]
    id2[Model  NSManagedObjectModel]
    id3[Context  NSManagedObjectContext]
    id4[Store Coordinattor  NSPersistentStoreCoordinator ]
    id5[(Store 存储空间)]

    id1 --- id2
    id1 --- id3
    id1 --- id4 
    id4 <---从存储中保存和获取数据的实例--- id5
```

NSManagedObjectModel的实例表示您的应用程序的模型文件，描述您的应用程序的类型、属性和关系。  

NSManagedObjectContext上下文的实例跟踪对应用程序类型实例的更改。  

NSPersistentStoreCoordinator存储协调员的实例从存储中保存和获取应用程序类型的实例。  

NSPersistentContainer 持久性容器的实例同时设置模型、上下文和存储协调员。  

## 创建持久容器  

``` Swift
class AppDelegate: UIResponder, UIApplicationDelegate {

    ···
    /// CoreData 持久容器
    private(set) lazy var persistentContainer: NSPersistentContainer = {
        // name 传数据模型文件名称
        let container = NSPersistentContainer(name: "DataStore")
        container.loadPersistentStores { description, error in
            if let error = error {
                fatalError("Unable to load persistent stores: \(error)")
            }
        }
        return container
    }()
    ···
}
```

持久容器创建后 分别在其managedObjectModel、viewContext和persistentStoreCoordinator属性中保存对模型、上下文和存储协调器实例的引用。  

## 将持久容器的引用传递给视图控制器  

在应用程序的根视图控制器中，引入 CoreData,并创建一个变量来保存对持久容器的引用。  

``` Swift
import UIKit
import CoreData
class ViewController: UIViewController {
    var container: NSPersistentContainer!

    override func viewDidLoad() {
        super.viewDidLoad()
        guard container != nil else {
            fatalError("This view needs a persistent container.")
        }
        // 持久容器可用.
    }
}

// iOS13 在 SceneDelegate 将 AppDelegate 的持久容器引用传递到 rootViewController
class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let _ = (scene as? UIWindowScene) else { return }
        if let rootVC = window?.rootViewController as? ViewController, let appDelegate = UIApplication.shared.delegate as? AppDelegate {
            rootVC.container = appDelegate.persistentContainer
        }
    }
}
```