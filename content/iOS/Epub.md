---
# 文章的标题
title: "EPUB"
# 文章的时间
date: 2023-07-15T16:02:28+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "Epub 电子书 的解析器和阅读器"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverookArt"
---

## Epub 解包器  

EPUB 文件其实是一个压缩包，使用压缩工具可将其解压，得到一个 EPUB 文件夹。

在 iOS 平台使用开源的解压缩工具库 SSZipArchive ，

``` swift 
// Unpacker.swift
import SSZipArchive
import Foundation
class Unpacker: NSObject {
    /// Epub 文件解包
    /// - Parameters:
    ///   - epubFileURL: 原文件路径
    ///   - unPackageURL: 解包文件路径
    func unPackage(epubFileURL: URL, unPackageURL: URL) -> Bool {
        guard FileManager.default.fileExists(atPath: epubFileURL.path) else {
            debugPrint("未找到 epub 文件", epubFileURL.path)
            return false
        }
        if FileManager.default.fileExists(atPath: unPackageURL.path) {
            debugPrint("解包路径已存在:",unPackageURL.path)
            return true
        }
        return SSZipArchive.unzipFile(atPath: epubFileURL.path, toDestination: unPackageURL.path, delegate: self)
    }
}

/// 解压文件代理方法
extension Unpacker: SSZipArchiveDelegate {
    /// 将要解包
    func zipArchiveWillUnzipArchive(atPath path: String, zipInfo: unz_global_info) { }
    
    /// 是否解包
    func zipArchiveShouldUnzipFile(at fileIndex: Int, totalFiles: Int, archivePath: String, fileInfo: unz_file_info) -> Bool { return true }
    
    /// 将要生成解包后的文件路径
    func zipArchiveWillUnzipFile(at fileIndex: Int, totalFiles: Int, archivePath: String, fileInfo: unz_file_info) { }
    
    /// 解包完成生成解压后的文件夹
    func zipArchiveDidUnzipFile(at fileIndex: Int, totalFiles: Int, archivePath: String, fileInfo: unz_file_info) { }
    
    /// 解包进度
    func zipArchiveProgressEvent(_ loaded: UInt64, total: UInt64) { }
    
    /// 解包完成
    func zipArchiveDidUnzipArchive(atPath path: String, zipInfo: unz_global_info, unzippedPath: String) { }

    /// 解包完成
    func zipArchiveDidUnzipFile(at fileIndex: Int, totalFiles: Int, archivePath: String, unzippedFilePath: String) { }
}

```

``` shell
/-
 |-META-INF
  |-container.xml (该文件EPUB阅读器读取EPUB内容(content.opf)文件路径)
```

/META-INF/container.xml 该文件始终存在，否则就是非法的 EPUB 文件，解析器会通过该文件逐步将 EPUB 文件内容解析出来。

## Epub 解析器  

根据 EPUB 文件夹结构来确定解析流程  
> 需要解析的 EPUB 文件类型都是 XML 类型, 虽然有些文件的后缀不是 xml，但里面的内容都是由 xml 标签组成。
> 这里使用到的 XML 解析工具是 SwiftSoup。

``` markmap
# EPUB解压后文件
* 解析 container.xml 文件
    * 获取 content.opf 文件路径

* 解析  content.opf 文件  
    * metadata  (元数据，包含书籍名称，版权，作者，出版方等信息)
    * manifest  (整本书的文件清单, 包含目录文件 toc.ncx 路径)
    * spine  (书脊，所有xhtml文档的线性阅读顺序)  
* 解析 toc.ncx 文件  
    * label (目录标题)  
    * contentSrc (内容资源文件路径)
```

### 解析器委托代理事件  

``` swift  
// Parser.swift
protocol ParserDelegate {
    
    /// 开始解析 epub
    func beginParserEpub(url: URL)
    
    /// 已解析 container
    func didParserContainer()
    
    /// 已解析 Content
    func didParserContent()
    
    /// 已解析 TOC
    func didParserToc()
    
    /// 解析 epub 完成
    func endedParserEpub()
    
    /// 解析 Epub 出错
    func errorParserEpub(error: ParserError)
}
```  

### 枚举解析失败错误  

``` swift
enum ParserError: Error {
    /// 无效的文件
    case FileInvalid(message: String, fileUrl: URL?)
    
    /// 转 String 失败
    case ToStrFailed(message: String, data: Data?)
    
    /// 转 XML 失败
    case ToXMLFailed(message: String, xmlStr: String)
    
    /// content 内容缺失
    case ContentLack(message: String)
}
```

### 解析器类实现  

``` swift  
// Parser.swift
class Parser {
    /// 声明解析后
    var parserData = ParserData()
    /// 声明代理
    var delegate: ParserDelegate?

    /// 开始解析 Epub解压后的 文件内容
    private func beginParserEpub(url: URL) throws { ··· }  

    /// 解析 container 文件
    private func parseContainer() throws { ··· }  

    /// 解析 content 文件
    private func parseContent() throws { ··· }

    /// 解析 TOC 目录
    private func parseToc() throws { ··· }


    /// 衍生方法

    /// 解析外部的 container 文件
    public func parseContainer(data: Data) throws  -> Container { ··· }
    /// 解析外部的 Content 文件
    public func parseContent(data: Data) throws -> Content { ··· }
    /// 解析外部的 TOC 目录文件
    public func parseToc(data: Data) throws -> Toc { ··· }  
    
}
```

### 解析后的数据  

``` markmap
# ParserData
    * Container  
        * ResourcePath
    * Content
        * Metadata  
            * title  书名
            * creators  作者
            * publisher  出版方
            * identifier 唯一标识  
            * date 出版日期  
            * rights 版权  
            * description 描述  
            * language 语言  
            * cover 封面图
        * Manifest  
            * [Resource]  
                * id 唯一标识
                * href 文件相对路径
                * mediaType 文件类型
                * rootPath 文件根路径
        * Spine  
            * [SpineItem]  
                * idref  
                * Resource
                * content 页面内容
                * audio 音频地址
                * permissions 阅读权限 0可读 1试读 2付费
    * Toc
        * [NavItem] 
            * id 唯一标识
            * label 章节标题
            * contentSrc 章节内容资源
            * navItems 子章节
```

## Epub 阅读器  
