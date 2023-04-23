---
# 文章的标题
title: "Xcode 报错"
# 文章的时间
date: 2023-04-23T16:15:32+08:00
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

## Xcode 报错  

> 版本:14.3  
> 报错内容: ld: file not found: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/lib/arc/libarclite_iphoneos.a  

现在Xcode 14.3移除相关库是因为支持的最低部署版本的系统都已经内置了，所以没必要再额外链接，至少Xcode 14支持的最低部署目标iOS 11及以上版本的系统肯定是没问题的。如果应用最低部署目标版本本身不低于iOS 11，解决这个问题很简单，只需要将第三方库部署目标的iOS版本设置成和应用最低部署目标的iOS版本一致。

在 Podfile 文件上加上以下脚本  

``` shell
post_install do |installer|
    # 获取Pods项目中的目标数组(targets）然后遍历目targets
    installer.pods_project.targets.each do |target|
        # 通过目标对象（target）获取构建配置数组 (build_configurations)遍历构建配置数组
        target.build_configurations.each do |config|
            # 修改构建配置对象中的构建设置 (build_settings），将iOS 部署目标版本设为 11.0
            config.build_settings["IPHONEOS_DEPLOYMENT_TARGET"] = '11.0'
        end
    end
end

# 最后执行 pod install
```

---
