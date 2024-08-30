---
# 文章的标题
title: "Swift 的初始化"
# 文章的时间
date: 2024-08-30T14:33:34+08:00
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


## 默认初始化

* 类、结构体、枚举都有一个默认的初始化方法，默认的初始化方法不需要参数。
* 初始化方法以关键字 `init` 命名，并在方法体中进行实例变量的初始化。  

### 枚举的默认初始化

```swift
enum PersonSex {
    case Male
    case Female
    /// 默认初始化方法 声明后才能被调用
    init() {
        self = .Female
    }
}
```

### 结构体的默认初始化

```swift
struct PersonWork {
    var company: String
    var job: String
    var wages: Int
    /// 默认初始化方法 声明后才能被调用
    init() {
        company = ""
        job = ""
        wages = 0
    }
}
```

### 类的默认初始化

```swift
class Person {
    var name: String
    var sex: PersonSex
    var work: PersonWork
    
    init() {
        self.name = "name"
        self.sex = PersonSex()
        self.work = PersonWork()
    }
}
```

## 自定义初始化

* 类、结构体、枚举可以有多个自定义初始化方法
* 自定义初始化方法需要有-个或多个参数。
* 子类自定义初始化方法可以调用父类的初始化方法。
* 自定义初始化方法可以访问 `self` 属性，也可以访问 `self` 的属性和方法。
* 自定义初始化方法可以返回 `self` 以便链式调用。

### 枚举的自定义初始化

```swift
enum PersonSex {
    case Male
    case Female
    
    /// 自定义初始化方法1
    init(sex: Int) {
        self = sex == 0 ? .Female : .Male
    }
    /// 自定义初始化方法2
    init(isMale: Bool) {
        self = isMale ? .Male : .Female
    }
}
```

### 结构体的自定义初始化

```swift
struct PersonWork {
    var company: String
    var job: String
    var wages: Int
    
    /// 自定义初始化方法1
    init(company: String, job: String, wages: Int) {
        self.company = company
        self.job = job
        self.wages = wages
    }
    /// 自定义初始化方法2
    init(company: String, job: String) {
        self.company = company
        self.job = job
        self.wages = 0
    }
}
```


### 类的自定义初始化

```swift
class Person {
    var name: String
    var sex: PersonSex
    var work: PersonWork
    
    init(name: String, sex: PersonSex, work: PersonWork) {
        self.name = name
        self.sex = sex
        self.work = work
    }
    /// 自定义初始化方法1
    init(name: String, sex: Int, company: String, job: String, wages: Int) {
        self.name = name
        self.sex = PersonSex(sex: sex)
        self.work = PersonWork(company: company, job: job, wages: wages)
    }
    /// 自定义初始化方法2
    init(name: String, sex: Int, company: String, job: String) {
        self.name = name
        self.sex = PersonSex(sex: sex)
        self.work = PersonWork(company: company, job: job)
    }
}
```

## 便利初始化

* 便利初始化方法前面需要关键字 `convenience` 声明。
* 便利初始化方法需要有-个或多个参数。
* 便利初始化方法不能被子类重写。
* 便利初始化方法可以调用自身的初始化方法。
* 便利初始化方法可以调用父类的初始化方法。
* 便利初始化方法可以访问 `self` 的属性和方法。
* 便利初始化方法不能返回 `self` 以便链式调用。

### 类的便利初始化

```swift
class Person {
    var name: String
    var sex: PersonSex
    var work: PersonWork
    
    init(name: String, sex: PersonSex, work: PersonWork) {
        self.name = name
        self.sex = sex
        self.work = work
    }
    
    /// 自定义初始化方法1
    init(name: String, sex: Int, company: String, job: String, wages: Int) {
        self.init(name: name, sex: PersonSex(sex: sex), work: PersonWork(company: company, job: job, wages: wages))
    }
    /// 自定义初始化方法2
    init(name: String, sex: Int, company: String, job: String) {
        self.init(name: name, sex: PersonSex(sex: sex), work: PersonWork(company: company, job: job))
    }

    /// 便利初始化方法
    convenience init(name: String) {
        self.init(name: name, sex: 1, company: "", job: "")
    }

}
