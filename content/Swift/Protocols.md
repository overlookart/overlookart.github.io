---
# 文章的标题
title: "Protocols"
# 文章的时间
date: 2026-03-31T11:49:47+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "Swift 协议（Protocols）学习笔记，涵盖协议语法、属性/方法要求、可变方法、初始化器、协议类型、委托模式、扩展协议一致性等内容。"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

> 本文整理自 [The Swift Programming Language — Protocols](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/protocols/)。

---

## 概述

**协议（Protocol）** 定义了一套方法、属性及其他要求的蓝图，用于适配特定任务或功能。类、结构体或枚举可以**采纳（adopt）** 协议，并提供这些要求的具体实现。任何满足协议要求的类型都被称为**遵循（conform）** 该协议。

除了指定遵循类型必须实现的要求外，还可以扩展协议来实现部分要求或添加额外功能，供遵循类型使用。

---

## 协议语法

协议的定义方式与类、结构体和枚举非常相似：

```swift
protocol SomeProtocol {
    // 协议定义写在这里
}
```

自定义类型通过在类型名称后放置协议名称（以冒号分隔）来声明采纳某个协议。可以列出多个协议，以逗号分隔：

```swift
struct SomeStructure: FirstProtocol, AnotherProtocol {
    // 结构体定义写在这里
}
```

如果类有父类，则先列出父类，再列出协议：

```swift
class SomeClass: SomeSuperclass, FirstProtocol, AnotherProtocol {
    // 类定义写在这里
}
```

> **注意：** 因为协议是类型，所以它们的名称应以大写字母开头（如 `FullyNamed`、`RandomNumberGenerator`），以匹配 Swift 中其他类型的命名规范（如 `Int`、`String`、`Double`）。

---

## 属性要求

协议可以要求遵循类型提供特定名称和类型的实例属性或类型属性。协议不指定属性是存储属性还是计算属性——它只指定所需的属性名称和类型，以及该属性必须是只读还是读写。

- 如果协议要求属性是可读写的，则该属性不能由常量存储属性或只读计算属性来满足。
- 如果协议只要求属性是可读的，则任何类型的属性都可以满足该要求。

属性要求始终使用 `var` 关键字声明为变量属性。读写属性用 `{ get set }` 标注，只读属性用 `{ get }` 标注：

```swift
protocol SomeProtocol {
    var mustBeSettable: Int { get set }
    var doesNotNeedToBeSettable: Int { get }
}
```

类型属性要求始终使用 `static` 关键字前缀：

```swift
protocol AnotherProtocol {
    static var someTypeProperty: Int { get set }
}
```

### 示例：`FullyNamed` 协议

```swift
protocol FullyNamed {
    var fullName: String { get }
}
```

```swift
struct Person: FullyNamed {
    var fullName: String
}
let john = Person(fullName: "John Appleseed")
// john.fullName 是 "John Appleseed"
```

更复杂的类示例：

```swift
class Starship: FullyNamed {
    var prefix: String?
    var name: String
    init(name: String, prefix: String? = nil) {
        self.name = name
        self.prefix = prefix
    }
    var fullName: String {
        return (prefix != nil ? prefix! + " " : "") + name
    }
}
var ncc1701 = Starship(name: "Enterprise", prefix: "USS")
// ncc1701.fullName 是 "USS Enterprise"
```

---

## 方法要求

协议可以要求遵循类型实现特定的实例方法和类型方法。这些方法写在协议定义中，与普通方法相同，但没有花括号和方法体。

类型方法要求始终以 `static` 关键字前缀：

```swift
protocol SomeProtocol {
    static func someTypeMethod()
}
```

### 示例

```swift
protocol RandomNumberGenerator {
    func random() -> Double
}
```

```swift
class LinearCongruentialGenerator: RandomNumberGenerator {
    var lastRandom = 42.0
    let m = 139968.0
    let a = 3877.0
    let c = 29573.0
    func random() -> Double {
        lastRandom = ((lastRandom * a + c)
            .truncatingRemainder(dividingBy: m))
        return lastRandom / m
    }
}
let generator = LinearCongruentialGenerator()
print("Here's a random number: \(generator.random())")
// 打印 "Here's a random number: 0.3746499199817101"
print("And another one: \(generator.random())")
// 打印 "And another one: 0.729023776863283"
```

---

## 可变方法

值类型（结构体和枚举）的实例方法如果需要修改实例本身，需要在 `func` 前加 `mutating` 关键字。

如果协议中的实例方法要求旨在修改遵循类型的实例，则应在协议定义中标记为 `mutating`：

```swift
protocol Togglable {
    mutating func toggle()
}
```

> **注意：** 如果将协议实例方法要求标记为 `mutating`，在类中实现该方法时不需要写 `mutating` 关键字。`mutating` 仅用于结构体和枚举。

```swift
enum OnOffSwitch: Togglable {
    case off, on
    mutating func toggle() {
        switch self {
        case .off:
            self = .on
        case .on:
            self = .off
        }
    }
}
var lightSwitch = OnOffSwitch.off
lightSwitch.toggle()
// lightSwitch 现在等于 .on
```

---

## 初始化器

协议可以要求遵循类型实现特定的初始化器：

```swift
protocol SomeProtocol {
    init(someParameter: Int)
}
```

### 类的协议初始化器实现

在遵循协议的类中实现初始化器要求时，必须使用 `required` 修饰符：

```swift
class SomeClass: SomeProtocol {
    required init(someParameter: Int) {
        // 初始化器实现写在这里
    }
}
```

`required` 修饰符确保所有子类也提供该初始化器的实现，从而也遵循该协议。

如果子类重写了父类的指定初始化器，同时实现了协议的匹配初始化器要求，则需要同时标记 `required` 和 `override`：

```swift
protocol SomeProtocol {
    init()
}

class SomeSuperClass {
    init() {
        // 初始化器实现
    }
}

class SomeSubClass: SomeSuperClass, SomeProtocol {
    required override init() {
        // 初始化器实现
    }
}
```

> **注意：** 标记为 `final` 的类不需要 `required` 修饰符，因为 final 类不能被子类化。

### 可失败初始化器要求

协议可以定义可失败初始化器要求（`init?`）。

- 可失败初始化器要求可以由可失败或不可失败的初始化器来满足。
- 不可失败初始化器要求只能由不可失败或隐式解包可失败初始化器来满足。

---

## 仅有语义要求的协议

并非所有协议都需要包含方法或属性要求。有些协议只描述**语义要求**——即关于类型行为和所支持操作的要求。

Swift 标准库定义了几个没有方法或属性要求的协议：

- **`Sendable`** — 可以在并发域之间共享的值
- **`Copyable`** — Swift 可以在传递给函数时复制的值
- **`BitwiseCopyable`** — 可以逐位复制的值

```swift
struct MyStruct: Copyable {
    var counter = 12
}

extension MyStruct: BitwiseCopyable { }
```

通常不需要手动编写对这些协议的遵循——Swift 会隐式添加遵循。

---

## 协议作为类型

协议本身不实现任何功能，但可以作为类型在代码中使用。

### 三种使用方式

| 方式 | 说明 |
|------|------|
| **泛型约束（Generic Constraint）** | 适用于任何遵循协议的类型，具体类型由调用方选择 |
| **不透明类型（Opaque Type）** | API 实现选择具体类型，但对外隐藏，只保证遵循某协议 |
| **存在类型 / 装箱协议类型（Boxed Protocol Type）** | 运行时可以是任何遵循协议的类型，Swift 添加间接层（box），有性能开销 |

---

## 委托模式

委托是一种设计模式，允许类或结构体将部分职责交给（委托给）另一个类型的实例。

```swift
class DiceGame {
    let sides: Int
    let generator = LinearCongruentialGenerator()
    weak var delegate: Delegate?

    init(sides: Int) {
        self.sides = sides
    }

    func roll() -> Int {
        return Int(generator.random() * Double(sides)) + 1
    }

    func play(rounds: Int) {
        delegate?.gameDidStart(self)
        for round in 1...rounds {
            let player1 = roll()
            let player2 = roll()
            if player1 == player2 {
                delegate?.game(self, didEndRound: round, winner: nil)
            } else if player1 > player2 {
                delegate?.game(self, didEndRound: round, winner: 1)
            } else {
                delegate?.game(self, didEndRound: round, winner: 2)
            }
        }
        delegate?.gameDidEnd(self)
    }

    protocol Delegate: AnyObject {
        func gameDidStart(_ game: DiceGame)
        func game(_ game: DiceGame, didEndRound round: Int, winner: Int?)
        func gameDidEnd(_ game: DiceGame)
    }
}
```

关键点：
- 委托属性声明为 `weak` 以避免强引用循环
- 协议继承 `AnyObject` 标记为仅限类遵循（class-only protocol）
- 委托属性是可选类型，使用可选链调用方法

```swift
class DiceGameTracker: DiceGame.Delegate {
    var playerScore1 = 0
    var playerScore2 = 0

    func gameDidStart(_ game: DiceGame) {
        print("Started a new game")
        playerScore1 = 0
        playerScore2 = 0
    }

    func game(_ game: DiceGame, didEndRound round: Int, winner: Int?) {
        switch winner {
        case 1:
            playerScore1 += 1
            print("Player 1 won round \(round)")
        case 2:
            playerScore2 += 1
            print("Player 2 won round \(round)")
        default:
            print("The round was a draw")
        }
    }

    func gameDidEnd(_ game: DiceGame) {
        if playerScore1 == playerScore2 {
            print("The game ended in a draw.")
        } else if playerScore1 > playerScore2 {
            print("Player 1 won!")
        } else {
            print("Player 2 won!")
        }
    }
}
```

---

## 通过扩展添加协议遵循

即使无法访问现有类型的源代码，也可以通过扩展使其采纳并遵循新协议。

```swift
protocol TextRepresentable {
    var textualDescription: String { get }
}
```

```swift
extension Dice: TextRepresentable {
    var textualDescription: String {
        return "A \(sides)-sided dice"
    }
}
```

### 条件遵循（Conditional Conformance）

泛型类型可能只在特定条件下才能遵循协议。使用 `where` 子句指定约束：

```swift
extension Array: TextRepresentable where Element: TextRepresentable {
    var textualDescription: String {
        let itemsAsText = self.map { $0.textualDescription }
        return "[" + itemsAsText.joined(separator: ", ") + "]"
    }
}

let myDice = [d6, d12]
print(myDice.textualDescription)
// 打印 "[A 6-sided dice, A 12-sided dice]"
```

### 通过扩展声明协议采纳

如果类型已经满足了协议的所有要求，但尚未声明采纳该协议，可以通过空扩展来声明：

```swift
struct Hamster {
    var name: String
    var textualDescription: String {
        return "A hamster named \(name)"
    }
}
extension Hamster: TextRepresentable {}
```

> **注意：** 类型不会仅因为满足协议要求就自动采纳协议，必须显式声明采纳。

---

## 合成实现（Synthesized Implementation）

Swift 可以自动为 `Equatable`、`Hashable` 和 `Comparable` 提供协议遵循，无需编写样板代码。

### `Equatable` 的合成实现

适用于以下自定义类型：
- 只有存储属性且都遵循 `Equatable` 的结构体
- 只有关联类型且都遵循 `Equatable` 的枚举
- 没有关联类型的枚举

```swift
struct Vector3D: Equatable {
    var x = 0.0
    var y = 0.0
    var z = 0.0
}
// == 运算符由 Swift 自动生成
```

### `Hashable` 的合成实现

适用于只有遵循 `Hashable` 的存储属性的结构体和只有遵循 `Hashable` 的关联类型的枚举：

```swift
struct GridPoint: Hashable {
    var x: Int
    var y: Int
}
```

### `Comparable` 的合成实现

适用于只有遵循 `Comparable` 的存储属性的结构体和只有遵循 `Comparable` 的关联类型的枚举：

```swift
struct Version: Comparable {
    var major: Int
    var minor: Int
    var patch: Int
}

let v1 = Version(major: 1, minor: 0, patch: 0)
let v2 = Version(major: 1, minor: 1, patch: 0)
print(v1 < v2)  // true
```

---

## 协议集合（Collection of Protocols）

协议可以在集合（如数组或字典）中用作类型。

```swift
let things: [TextRepresentable] = [game, d12, simonTheHamster]

for thing in things {
    print(thing.textualDescription)
}
// A game of Snakes and Ladders with 25 squares
// A 12-sided dice
// A hamster named Simon
```

> **注意：** 当协议类型用作集合中的类型时，Swift 使用**存在类型（existential type）**，这涉及动态分发和间接层的性能开销。

---

## 协议继承

协议可以继承一个或多个其他协议，并在继承要求的基础上添加更多要求。语法类似于类继承，但可以选择列出多个父协议：

```swift
protocol InheritingProtocol: SomeProtocol, AnotherProtocol {
    // 协议定义
}
```

示例：

```swift
protocol PrettyTextRepresentable: TextRepresentable {
    var prettyTextualDescription: String { get }
}
```

---

## 类专属协议（Class-Only Protocols）

通过让协议继承 `AnyObject`，可以限制协议只能被类类型采纳：

```swift
protocol SomeClassOnlyProtocol: AnyObject, SomeInheritedProtocol {
    // 类专属协议定义
}
```

这在委托属性需要声明为 `weak` 时非常有用。

---

## 协议组合（Protocol Composition）

可以同时要求类型遵循多个协议，而无需定义新的临时协议。使用 `&` 连接：

```swift
protocol Named {
    var name: String { get }
}

protocol Aged {
    var age: Int { get }
}

struct Person: Named, Aged {
    var name: String
    var age: Int
}

func wishHappyBirthday(to celebrator: Named & Aged) {
    print("Happy birthday, \(celebrator.name), you're \(celebrator.age)!")
}

let birthdayPerson = Person(name: "Malcolm", age: 21)
wishHappyBirthday(to: birthdayPerson)
// 打印 "Happy birthday, Malcolm, you're 21!"
```

协议组合还可以包含一个类类型：

```swift
class Location {
    var latitude: Double
    var longitude: Double
    init(latitude: Double, longitude: Double) {
        self.latitude = latitude
        self.longitude = longitude
    }
}

class City: Location, Named {
    var name: String
    init(name: String, latitude: Double, longitude: Double) {
        self.name = name
        super.init(latitude: latitude, longitude: longitude)
    }
}

func beginConcert(in location: Location & Named) {
    print("Hello, \(location.name)!")
}

let seattle = City(name: "Seattle", latitude: 47.6, longitude: -122.3)
beginConcert(in: seattle)
// 打印 "Hello, Seattle!"
```

---

## 检查协议遵循

可以使用类型转换来检查实例是否遵循某个协议：

- `is` — 检查实例是否遵循某协议
- `as?` — 向下转为协议类型，返回可选值
- `as!` — 强制向下转为协议类型

```swift
protocol HasArea {
    var area: Double { get }
}

class Circle: HasArea {
    let pi = 3.1415927
    var radius: Double
    var area: Double { return pi * radius * radius }
    init(radius: Double) { self.radius = radius }
}

class Country: HasArea {
    var area: Double
    init(area: Double) { self.area = area }
}

class Animal {
    var legs: Int
    init(legs: Int) { self.legs = legs }
}

let objects: [AnyObject] = [
    Country(area: 243_610),
    Circle(radius: 5.0),
    Animal(legs: 4)
]

for object in objects {
    if let objectWithArea = object as? HasArea {
        print("Area is \(objectWithArea.area)")
    } else {
        print("Something that doesn't have an area")
    }
}
// Area is 243610.0
// Area is 78.5398175
// Something that doesn't have an area
```

---

## 可选协议

可以为协议定义可选要求——遵循类型不需要实现这些要求。可选要求在协议中使用 `optional` 修饰符标记。

> **注意：** 可选协议要求仅在协议标记了 `@objc` 属性时可用。`@objc` 协议只能被继承自 Objective-C 类的类或其他 `@objc` 类采纳，结构体和枚举不能采纳。

```swift
@objc protocol CounterDataSource {
    @objc optional func increment(forCount count: Int) -> Int
    @objc optional var fixedIncrement: Int { get }
}
```

调用可选方法或访问可选属性时，它们会自动变为可选类型：

```swift
class Counter {
    var count = 0
    var dataSource: CounterDataSource?

    func increment() {
        if let amount = dataSource?.increment?(forCount: count) {
            count += amount
        } else if let amount = dataSource?.fixedIncrement {
            count += amount
        }
    }
}
```

---

## 协议扩展

可以通过扩展协议来提供方法和计算属性的默认实现。遵循类型可以直接使用这些默认实现，也可以提供自己的实现来覆盖。

```swift
extension RandomNumberGenerator {
    func randomBool() -> Bool {
        return random() > 0.5
    }
}

let generator = LinearCongruentialGenerator()
print("Here's a random Boolean: \(generator.randomBool())")
// 打印 "Here's a random Boolean: true"
```

### 提供默认实现

可以通过协议扩展为协议的任何要求提供默认实现，包括方法、计算属性、下标和初始化器：

```swift
extension PrettyTextRepresentable {
    var prettyTextualDescription: String {
        return textualDescription
    }
}
```

### 为协议扩展添加约束

可以通过 `where` 子句为协议扩展添加约束：

```swift
extension Collection where Element: Equatable {
    func allEqual() -> Bool {
        for element in self {
            if element != self.first {
                return false
            }
        }
        return true
    }
}

let equalDice = [d6, d6, d6]
let differentDice = [d6, d12]
print(equalDice.allEqual())    // true
print(differentDice.allEqual()) // false
```

---

## 隐式协议遵循

Swift 会自动为某些类型添加对常见协议的遵循。例如：

- 如果结构体或枚举的所有属性/关联类型都遵循 `Equatable`，则 Swift 自动为其合成 `Equatable` 遵循
- 如果泛型类型的所有泛型参数都遵循某协议，Swift 可能自动添加条件遵循
- Swift 隐式为合适的类型添加 `Sendable`、`Copyable` 等语义协议的遵循

---

## 总结

| 概念 | 说明 |
| ------ | ------ |
| **协议定义** | protocol SomeProtocol { ... } |
| **属性要求** | var propertyName: Type { get } 或 { get set } |
| **方法要求** | func methodName() -> ReturnType |
| **可变方法** | mutating func methodName() |
| **初始化器要求** | init(parameter: Type) |
| **类专属协议** | protocol SomeProtocol: AnyObject { ... } |
| **协议继承** | protocol Child: Parent { ... } |
| **协议组合** | SomeProtocol & AnotherProtocol |
| **协议扩展** | extension SomeProtocol { ... } |
| **条件遵循** | extension SomeType: SomeProtocol where ... { ... } |
