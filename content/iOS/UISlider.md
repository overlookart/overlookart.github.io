---
# 文章的标题
title: "UISlider"
# 文章的时间
date: 2023-08-26T22:31:18+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "UISlider 的使用及自定义技巧"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverookArt"
---

## UISlider 的使用  

``` swift

let slider = UISlider()
// 设置滑块的最小值
slider.minimumValue = 0
// 设置滑块的最大值
slider.maximumValue = 1
// 设置滑块的当前值
slider.value = 0.5
// 有动画效果的设置滑块值
slider.setValue(0.5, animated: true)

```

## 改变 Slider 的外观  

``` swift
// 滑块最小值的图标，位于最左侧位置
slider.minimumValueImage
// 滑块最大值的图标，位于最右侧位置
slider.maximumValueImage
// 滑块拇指的着色颜色
slider.thumbTintColor
// 滑块起始位置到滑块位置的着色颜色
slider.minimumTrackTintColor
// 滑块的位置到滑块结束位置的着色颜色
slider.maximumTrackTintColor
```

## 改变 Slider 的交互行为  

``` swift
// 滑块值变化时是否连续触发更新事件，当为 false 时滑块值变化结束后才会触发，这对非及时更新功能场景很有用
slider.isContinuous = true
slider.behavioralStyle
slider.preferredBehavioralStyle
```

## 在滑块的位置添加其他 View  

``` swift
class CustomSlider: UISlider {
    private lazy var overlayView: UIView = {
        let view = UIView()
        view.backgroundColor = .red
        // 将叠加视图的用户交互关闭
        view.isUserInteractionEnabled = false
        reture view
    }()

    /// 初始化方法
    override init(frame: CGRect) {
        super.init(frame: frame)
        //以 thumbImg 的大小修改 Slider 的 thumb 大小
        self.setThumbImage(UIImage(named: "thumbImg"), for: .normal);
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    /// 重写滑块拇指大小的方法
    override func thumbRect(forBounds bounds: CGRect, trackRect rect: CGRect, value: Float) -> CGRect {
        let r = super.thumbRect(forBounds: bounds, trackRect: rect, value: value)
        // 将叠加视图的 frame 改为滑块拇指的 frame，这样就能达到叠加视图根据滑块拇指位置及时更新
        overlayView.frame = r
        return r
    }

    /// 将用户交互事件穿透到 UISlider 上
    override func hitTest(_ point: CGPoint, with event: UIEvent?) -> UIView? {
        let view = super.hitTest(point, with: event)
        if view == overlayView {
            return nil
        }
        return view
    }

}
```