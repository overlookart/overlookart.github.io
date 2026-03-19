---
# 文章的标题
title: "枚举"
# 文章的时间
date: 2023-07-25T09:56:15+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "枚举 (enum) 是 Swift 中用于定义一组相关值的类型"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverookArt"
---

## 概述

**枚举** (Enumeration) 为定义一组相关值提供了一种强大的方式，使代码更易读、更易维护。Swift 中的枚举比许多其他语言中的枚举更加灵活。

``` Swift
enum 枚举名称 {
    case 案例1
    case 案例2
    // ...
}
```

## 基本语法

### 定义枚举

``` Swift
enum CompassPoint {
    case north
    case south
    case east
    case west
}
```

### 简写形式

多个 case 可以写在同一行，用逗号分隔：

``` Swift
enum CompassPoint {
    case north, south, east, west
}
```

### 创建和使用枚举

``` Swift
let direction = CompassPoint.north

// 使用 switch 匹配
switch direction {
case .north:
    print("向北")
case .south:
    print("向南")
case .east:
    print("向东")
case .west:
    print("向西")
}
```

## 原始值 (Raw Values)

### 字符串原始值

``` Swift
enum Planet: String {
    case mercury = "Mercury"
    case venus = "Venus"
    case earth = "Earth"
    case mars = "Mars"
}

let earth = Planet.earth
print(earth.rawValue)  // 输出: "Earth"
```

### 整数原始值

``` Swift
enum StatusCode: Int {
    case success = 200
    case notFound = 404
    case serverError = 500
}

let status = StatusCode.success
print(status.rawValue)  // 输出: 200
```

### 自动赋值

对于整数类型，如果没有指定值，Swift 会自动递增赋值：

``` Swift
enum Planet: Int {
    case mercury = 1, venus, earth, mars, jupiter, saturn, uranus, neptune
}

print(Planet.venus.rawValue)  // 输出: 2
print(Planet.earth.rawValue)  // 输出: 3
```

对于字符串类型，Swift 会自动使用 case 名称作为原始值：

``` Swift
enum Direction: String {
    case north, south, east, west
}

print(Direction.north.rawValue)  // 输出: "north"
```

### 从原始值创建枚举

``` Swift
if let success = StatusCode(rawValue: 200) {
    print("成功: \(success)")
}

if let notFound = StatusCode(rawValue: 404) {
    print("未找到")
}
```

## 关联值 (Associated Values)

关联值允许枚举的每个 case 携带额外的数据：

``` Swift
enum Barcode {
    case upc(Int, Int, Int, Int)
    case qrCode(String)
}

let productCode = Barcode.qrCode("ABC123456")

switch productCode {
case .upc(let numberSystem, let manufacturer, let product, let check):
    print("UPC: \(numberSystem)-\(manufacturer)-\(product)-\(check)")
case .qrCode(let code):
    print("QR码: \(code)")
}
// 输出: QR码: ABC123456
```

### 简写形式

如果所有关联值都是常量或变量，可以用 `let` 或 `var` 统一声明：

``` Swift
switch productCode {
case let .upc(numberSystem, manufacturer, product, check):
    print("UPC: \(numberSystem)-\(manufacturer)-\(product)-\(check)")
case let .qrCode(code):
    print("QR码: \(code)")
}
```

## switch 匹配与 if 判断

### switch 基本用法

`switch` 语句用于匹配枚举的所有 case，必须覆盖所有情况或包含 `default` 分支：

``` Swift
enum Weather {
    case sunny(temperature: Double)
    case rainy(intensity: Double)
    case snowy(accumulation: Double)
}

let currentWeather = Weather.sunny(temperature: 28.5)

switch currentWeather {
case .sunny(let temp):
    print("晴天，温度 \(temp)°C")
case .rainy(let intensity):
    print("雨天，强度 \(intensity)")
case .snowy(let accumulation):
    print("雪天，积雪 \(accumulation)cm")
}
// 输出: 晴天，温度 28.5°C
```

### where 子句

使用 `where` 子句添加额外的条件判断：

``` Swift
switch currentWeather {
case .sunny(let temp) where temp > 30:
    print("高温天气，注意防暑")
case .sunny(let temp) where temp < 10:
    print("寒冷天气，注意保暖")
case .sunny(let temp):
    print("晴天，温度 \(temp)°C")
case .rainy(let intensity):
    print("雨天，强度 \(intensity)")
case .snowy(let accumulation):
    print("雪天，积雪 \(accumulation)cm")
}
```

### 隐式穷举

当 `switch` 语句覆盖枚举的所有 case 时，不需要 `default` 分支：

``` Swift
enum Direction {
    case north, south, east, west
}

let dir: Direction = .north

switch dir {
case .north: print("北")
case .south: print("南")
case .east:  print("东")
case .west:  print("西")
}
```

### if case 模式匹配

使用 `if case` 进行单分支模式匹配，比 `switch` 更简洁：

``` Swift
enum Status {
    case success(String)
    case failure(Int)
}

let result: Status = .success("操作成功")

// 匹配单个 case
if case .success(let message) = result {
    print("成功: \(message)")
}
// 输出: 成功: 操作成功

// 不匹配时不执行
if case .failure(let code) = result {
    print("失败: \(code)")
}
// 不打印任何内容
```

### guard case 模式匹配

使用 `guard case` 在条件不匹配时提前退出：

``` Swift
func processResult(_ result: Status) {
    guard case .success(let message) = result else {
        print("处理失败")
        return
    }
    print("处理成功: \(message)")
}

processResult(.success("完成"))  // 输出: 处理成功: 完成
processResult(.failure(404))     // 输出: 处理失败
```

### 组合条件

`if case` 可以与其他条件组合：

``` Swift
let results: [Status] = [
    .success("成功1"),
    .failure(404),
    .success("成功2"),
    .failure(500)
]

for result in results {
    if case .failure(let code) = result, code >= 500 {
        print("服务器错误: \(code)")
    }
}
// 输出: 服务器错误: 500
```

### 多 case 匹配

使用逗号分隔多个 case：

``` Swift
enum Shape {
    case circle(radius: Double)
    case rectangle(width: Double, height: Double)
    case triangle(base: Double, height: Double)
}

let shape: Shape = .circle(radius: 5)

switch shape {
case .circle, .triangle:
    print("曲线或三角形")
case .rectangle:
    print("矩形")
}
```

### 提取多个关联值

``` Swift
enum Coordinate {
    case point(x: Double, y: Double)
    case line(start: (Double, Double), end: (Double, Double))
}

let coord: Coordinate = .line(start: (0, 0), end: (10, 10))

switch coord {
case .point(let x, let y):
    print("点: (\(x), \(y))")
case .line(let (x1, y1), let (x2, y2)):
    print("线段: (\(x1),\(y1)) -> (\(x2),\(y2))")
}
```

### 解包可选枚举

使用 `if case` 解包可选值：

``` Swift
enum Optional<T> {
    case some(T)
    case none
}

let value: Optional<Int> = .some(42)

if case .some(let wrapped) = value {
    print("有值: \(wrapped)")
}
// 输出: 有值: 42

// 相当于
if case Optional.some(let wrapped) = value {
    print("有值: \(wrapped)")
}
```

## 递归枚举

递归枚举是指枚举的 case 的关联值类型包含该枚举本身。使用 `indirect` 关键字声明：

``` Swift
indirect enum ArithmeticExpression {
    case number(Int)
    case addition(ArithmeticExpression, ArithmeticExpression)
    case multiplication(ArithmeticExpression, ArithmeticExpression)
}

func evaluate(_ expression: ArithmeticExpression) -> Int {
    switch expression {
    case .number(let value):
        return value
    case .addition(let left, let right):
        return evaluate(left) + evaluate(right)
    case .multiplication(let left, let right):
        return evaluate(left) * evaluate(right)
    }
}

// 创建表达式: (2 + 3) * 4
let expression = ArithmeticExpression.multiplication(
    .addition(.number(2), .number(3)),
    .number(4)
)

print(evaluate(expression))  // 输出: 20
```

也可以在特定 case 前添加 `indirect`：

``` Swift
enum Tree {
    case empty
    indirect case node(value: Int, left: Tree, right: Tree)
}
```

## 枚举的方法和属性

### 实例属性

``` Swift
enum Weekday: String {
    case monday = "周一"
    case tuesday = "周二"
    case wednesday = "周三"
    case thursday = "周四"
    case friday = "周五"
    case saturday = "周六"
    case sunday = "周日"
    
    var isWeekend: Bool {
        switch self {
        case .saturday, .sunday:
            return true
        default:
            return false
        }
    }
}

print(Weekday.monday.isWeekend)  // 输出: false
print(Weekday.saturday.isWeekend) // 输出: true
```

### 静态方法

``` Swift
enum Temperature {
    case celsius(Double)
    case fahrenheit(Double)
    
    static func fromCelsius(_ value: Double) -> Temperature {
        return .celsius(value)
    }
    
    static func fromFahrenheit(_ value: Double) -> Temperature {
        return .fahrenheit(value)
    }
}

let temp = Temperature.fromCelsius(25.0)
```

### 实例方法

``` Swift
enum Counter {
    case value(Int)
    
    mutating func increment() {
        if case .value(let current) = self {
            self = .value(current + 1)
        }
    }
    
    mutating func increment(by amount: Int) {
        if case .value(let current) = self {
            self = .value(current + amount)
        }
    }
}

var counter = Counter.value(0)
counter.increment()
counter.increment(by: 5)
```

## CaseIterable 协议

让枚举遵循 `CaseIterable` 协议，可以遍历所有 case：

``` Swift
enum Season: String, CaseIterable {
    case spring = "春"
    case summer = "夏"
    case autumn = "秋"
    case winter = "冬"
}

for season in Season.allCases {
    print(season.rawValue)
}
// 输出: 春 夏 秋 冬
```

## 枚举初始化

### 原始值初始化

``` Swift
enum Color: String {
    case red = "红色"
    case green = "绿色"
    case blue = "蓝色"
    
    init?(colorName: String) {
        if let color = Color(rawValue: colorName) {
            self = color
        } else {
            return nil
        }
    }
}
```

### 关联值初始化

``` Swift
enum Result {
    case success(Int)
    case failure(String)
    
    init?(code: Int) {
        switch code {
        case 200...299:
            self = .success(code)
        default:
            return nil
        }
    }
}
```

## 协议遵循

枚举可以遵循多种协议：

``` Swift
// Equatable 自动合成
enum Status: Equatable {
    case active
    case inactive
    case pending
}

// Codable
enum Response: Codable {
    case data(String)
    case error(Int)
}

// 自定义协议
protocol Describable {
    var description: String { get }
}

enum Shape: Describable {
    case circle(radius: Double)
    case rectangle(width: Double, height: Double)
    
    var description: String {
        switch self {
        case .circle(let r):
            return "圆形，半径: \(r)"
        case .rectangle(let w, let h):
            return "矩形，宽: \(w)，高: \(h)"
        }
    }
}
```

## 常见用法示例

### 网络请求结果

``` Swift
enum NetworkResult {
    case success(data: Data)
    case failure(error: Error)
    case timeout(seconds: TimeInterval)
    case offline
}

func handleResponse(_ result: NetworkResult) {
    switch result {
    case .success(let data):
        print("收到数据: \(data.count) 字节")
    case .failure(let error):
        print("请求失败: \(error.localizedDescription)")
    case .timeout(let seconds):
        print("请求超时: \(seconds) 秒")
    case .offline:
        print("无网络连接")
    }
}
```

### 可选值模拟

``` Swift
enum Optional<T> {
    case some(T)
    case none
}

let value: Optional<Int> = .some(42)

switch value {
case .some(let wrapped):
    print("有值: \(wrapped)")
case .none:
    print("无值")
}
```

## 枚举与类的区别

| 特性 | 枚举 | 类 |
|------|------|-----|
| 实例创建 | 值类型 | 引用类型 |
| 继承 | 不支持 | 支持 |
| 存储属性 | 不支持 | 支持 |
| 计算属性 | 支持 | 支持 |
| 实例方法 | 支持（可修改 self） | 支持 |
| 静态属性/方法 | 支持 | 支持 |

## 枚举与关联值的比较

| 特性 | 原始值 (Raw Values) | 关联值 (Associated Values) |
|------|---------------------|---------------------------|
| 值类型 | 编译时确定 | 运行时确定 |
| 类型一致性 | 所有 case 相同类型 | 每个 case 可不同类型 |
| 用途 | 表示固定映射 | 表示动态数据 |
| 获取方式 | `rawValue` 属性 | `switch` 或 `if case` 提取 |
