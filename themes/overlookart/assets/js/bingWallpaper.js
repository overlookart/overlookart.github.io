/**
 * Bing 每日壁纸模块
 * 官方接口返回 JSON，无法直接用于 CSS url()，故在 JS 中动态设置背景
 * CSS 中保留渐变兜底，此模块负责加载并应用壁纸
 */
const WALLPAPER_CACHE_KEY = 'overlookart-bing-wallpaper';
const BING_API_URL = 'https://bing.biturl.top/?resolution=UHD&format=json&index=0&mkt=zh-CN';
const BING_BG_SELECTOR = '#site-bg';

const bingWallpaper = {
    /**
     * 加载 Bing 每日壁纸：
     * 1. 命中缓存则立即展示（Bing 图片 max-age=8 天，浏览器磁盘缓存秒出）
     * 2. 后台静默刷新 API，start_date 变化才换图并更新缓存
     * 失败时保留 CSS 渐变兜底
     */
    async load() {
        const bg = document.querySelector(BING_BG_SELECTOR);
        if (!bg) return;
        const cached = this.getCached();
        if (cached?.url) {
            this.apply(bg, cached.url);
        }
        try {
            // 官方 HPImageArchive 接口不带 CORS 头，浏览器 fetch 会被拦截，
            // 故使用带 access-control-allow-origin: * 的镜像 bing.biturl.top，
            // 其返回的图片直链仍来自官方 www.bing.com
            const res = await fetch(BING_API_URL);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            if (!data.url) throw new Error('empty response');
            // start_date 变化才换图并更新缓存；同一天保持后台静默
            if (!cached || cached.start_date !== data.start_date) {
                this.saveCache(data.start_date, data.url);
                this.apply(bg, data.url);
            }
        } catch (err) {
            console.warn('Bing wallpaper refresh failed, using cached/fallback:', err);
        }
    },

    getCached() {
        try {
            return JSON.parse(localStorage.getItem(WALLPAPER_CACHE_KEY));
        } catch (err) {
            console.warn('read wallpaper cache failed:', err);
            return null;
        }
    },

    saveCache(startDate, url) {
        localStorage.setItem(WALLPAPER_CACHE_KEY, JSON.stringify({ start_date: startDate, url }));
    },

    // 预加载大图，成功后再替换背景，避免闪烁
    apply(bg, url) {
        const img = new Image();
        img.onload = () => {
            bg.style.backgroundImage = `url('${url}')`;
        };
        img.src = url;
    },
};

export { bingWallpaper };
