---
# 文章的标题
title: "AVPlayer 音频播放器"
# 文章的时间
date: 2024-10-29T16:43:12+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "基于 AVPlayer 的音频播放器，播放器的加载状态(成功/失败)、 播放器的播放状态(播放/暂停)、播放器的加载进度、播放器的播放进度、播放器的 Seek 功能。"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

播放器是管理媒体资产的播放和时间的控制器对象。使用AVPlayer实例播放基于文件的本地和远程媒体，如QuickTime电影和MP3音频文件，以及使用HTTP直播提供的视听媒体。

## 初始化 Player  

``` Swift
private var player: AVPlayer = AVPlayer(playerItem: nil)
```

## 监听 AVPlayer 属性

``` Swift
/// 添加 player 监听
private func addPlayerObserver(){
    player.addObserver(self, forKeyPath: "timeControlStatus", options: .new, context: nil)
    let interval = CMTimeMakeWithSeconds(1.0, preferredTimescale: 600)
    timeObserverToken = player.addPeriodicTimeObserver(forInterval: interval, queue: .main) { time in
        if self.player.currentItem?.status == .readyToPlay {
            self.playerTimePlayChange(time: time)
        }
    }
}
    
/// 移除 player 监听
private func removePlayerObserver(){
    player.removeObserver(self, forKeyPath: "timeControlStatus")
    if let token = timeObserverToken {
        player.removeTimeObserver(token)
        timeObserverToken = nil
    }
}
```

## 设置播放数据  

使用播放器一次播放单个媒体资产。您可以使用其replaceCurrentItem（with:）方法重复使用播放器实例来播放其他媒体资产，但它一次只管理单个媒体资产的播放。每次播放新的媒体资产时，都需要重新设置

``` Swift
/// 设置 player 的播放数据
///
/// 在这里可以重置 audio 相关的控件
private func setupPlay(){
    // 重置播放器的进度控制数据
    audioSlider.updatePlayTime(0, totalTime: 0)
    // 重置播放按钮状态
    playBtn.isSelected = false
    guard let model = self.audioDeatilModel else { return }
    if let url = URL(string: model.playUrl) {
        setupPlayerItem(url: url)
    }else{
        debugPrint("无效的播放地址")
    }
}
    
private func setupPlayerItem(url: URL){
    // 移除之前的 AVPlayerItem 监听
    removePlayerItemObserver()
    // 创建 AVPlayerItem
    let item = AVPlayerItem(asset: AVAsset(url: url))
    // 设置 AVPlayerItem 监听
    addPlayerItemObserver(item: item)
    // 将 AVPlayerItem 设置到播放器
    player.replaceCurrentItem(with: item)
}
```

## 监听 AVPlayerItem 的属性  

``` Swift
/// 添加 playerItem 监听
private func addPlayerItemObserver(item: AVPlayerItem){
    /// 添加加载状态
    item.addObserver(self, forKeyPath: "status", options: .new, context: nil)
    /// 添加缓存状态
    item.addObserver(self, forKeyPath: "loadedTimeRanges", options: .new, context: nil)
    /// 添加播放完成状态
    NotificationCenter.default.addObserver(self, selector: #selector(playEnd), name: .AVPlayerItemDidPlayToEndTime, object: item)
}
    
/// 移除 playerItem 监听
private func removePlayerItemObserver(){
    // 移除加载状态监听
    player.currentItem?.removeObserver(self, forKeyPath: "status")
    // 移除缓存状态监听
    player.currentItem?.removeObserver(self, forKeyPath: "loadedTimeRanges")
    // 移除播放完成状态监听
    NotificationCenter.default.removeObserver(self, name: .AVPlayerItemDidPlayToEndTime, object: nil)
}
```

## 重写自身的 observeValue 方法  

``` Swift
override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
    if let playerItem = object as? AVPlayerItem {
        if keyPath == "status" {
            playerLoadStatusChange(PlayerItem: playerItem)
        }else if keyPath == "loadedTimeRanges" {
            playerLoadTimeRangesChange(PlayerItem: playerItem)
        }
    } else if let _ = object as? AVPlayer {
        if keyPath == "timeControlStatus" {
            playerTimeControlStatusChange()
        }
    }
}
````

## 播放器的状态与进度  

``` Swift
/// AVPlayer 加载 AVPlayerItem 的状态
/// - Parameter item: 加载中的 AVPlayerItem
///
/// 控制前进、回退、及进度控件的启用状态
private func playerLoadStatusChange(PlayerItem item: AVPlayerItem){
    self.setupSeekControl(isEnable: player.currentItem?.status == .readyToPlay)
    switch player.currentItem?.status {
        case .readyToPlay:
            debugPrint("准备播放")
            if let duration = player.currentItem?.duration {
                audioSlider.updatePlayTime(0, totalTime: CMTimeGetSeconds(duration))
            }
            // 自动播放(列表循环播放时，音频数据准备好后不需要点播放按钮自动播放)
            if playAuto {
                playAudio()
            }
        case .failed:
            debugPrint("加载失败")
        case .unknown:
            debugPrint("未知状态")
        case .none:
            debugPrint("空状态")
        @unknown default:
            fatalError()
    }
}

/// AVPlayer 缓存 AVPlayerItem 的进度
/// - Parameter item: 缓存中的 AVPlayerItem
private func playerLoadTimeRangesChange(PlayerItem item: AVPlayerItem){
    if let timeRange = player.currentItem?.loadedTimeRanges.first?.timeRangeValue {
        let startSeconds = CMTimeGetSeconds(timeRange.start)
        let durationSeconds = CMTimeGetSeconds(timeRange.duration)
        let bufferedDuration = startSeconds + durationSeconds
        let totalDuration = CMTimeGetSeconds(item.duration)
        let bufferProgress = bufferedDuration / totalDuration
        let str = String(format: "缓存进度:%.0f", bufferProgress * 100) + "%"
        debugPrint(str)
    }
}

/// AVPlayer 的播放状态
///
/// 在这里更新播放按钮的 播放暂停状态
private func playerTimeControlStatusChange(){
    switch player.timeControlStatus {
        case .paused:
            debugPrint("AVPlayer: ->paused")
            playBtn.isSelected = false
        case .waitingToPlayAtSpecifiedRate:
            debugPrint("AVPlayer: ->waiting")
            playBtn.isSelected = false
        case .playing:
            debugPrint("AVPlayer: ->playing")
            playBtn.isSelected = true
        @unknown default:
            fatalError()
    }
}

/// AVPlayer 的播放时间
///
/// 在这里更新进度控件的信息, 如播放进度、播放时长、总时长
/// - Parameter time: 播放时间
private func playerTimePlayChange(time: CMTime){
    let currentTime = CMTimeGetSeconds(time)
    let totalTime = CMTimeGetSeconds(self.player.currentItem?.duration ?? CMTimeMake(value: 1, timescale: 1))
    debugPrint("当前播放时间: \(currentTime) 秒, 总时长: \(totalTime) 秒")
    if !audioSlider.isTracking && !isSeeking {
        self.audioSlider.updatePlayTime(currentTime, totalTime: totalTime)
    }

    // 定时关闭    
    if let date = playEndDate, date.timeIntervalSince1970 - Date().timeIntervalSince1970 <= 0 {
        pauseAudio()
        clearClokcInfo()
    }
}
```

## 播放器的控制  

``` Swift
/// 播放
public func playAudio(){
    if player.currentItem?.status == .readyToPlay {
        player.play()
        /// 设置播放速率
        player.rate = playRate
    }
}

/// 暂停
public func pauseAudio(){
    player.pause()
}

/// 跳到播放位置
/// - Parameter value: 目标位置 0～1
///
/// 这是以播放进度为基准的跳转播放
private func seekJump(Progress value: Float){
    if let playItem = player.currentItem {
        let totalTime = playItem.duration.seconds
        if totalTime.isNaN { return }
        let playTime = totalTime * value.double
        let targetTime = CMTimeMakeWithSeconds(playTime, preferredTimescale: 600)
        audioSlider.updatePlayTime(playTime, totalTime: totalTime)
        setupSeekControl(isEnable: false)
        self.isSeeking = true
        player.seek(to: targetTime) { isFinish in
            self.isSeeking = false
            self.setupSeekControl(isEnable: true)
        }
    }
}

/// 跳到指定位置
/// - Parameter time: 目标位置 秒
///
/// 这是以步进时间为基准的跳转播放
/// 例如：快进10秒，则调用 seekJump(StepTime: 10)，快退5秒，则调用 seekJump(StepTime: -5)
private func seekJump(StepTime stepTime: Double) {
    if let playItem = player.currentItem {
        let totalTime = playItem.duration.seconds
        if totalTime.isNaN { return }
        let currentTime = player.currentTime().seconds
        var targetTime = currentTime + stepTime
        if targetTime < 0 { targetTime = 0 }
        if targetTime > totalTime { targetTime = totalTime }
        let time = CMTime(seconds: targetTime, preferredTimescale: 600)
        audioSlider.updatePlayTime(targetTime, totalTime: totalTime)
        setupSeekControl(isEnable: false)
        self.isSeeking = true
        player.seek(to: time) { isFinish in
            self.isSeeking = false
            self.setupSeekControl(isEnable: true)
        }
    }
}
```
