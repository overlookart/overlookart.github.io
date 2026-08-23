/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
    corePlugins: {
        preflight: true,
    },
    content: ['content/**/*.md', 'layouts/**/*.html'],
    theme: {
        extend: {
            backgroundImage:{
                // Bing 每日壁纸由 assets/js/main.js 动态加载（官方 API 返回 JSON，无法直接写 CSS url()）
                // 此处为 JS 加载成功前的渐变兜底
                "sitebg":"linear-gradient(135deg, #e0e7ff 0%, #fdf2f8 50%, #fbcfe8 100%)"
            },
            // 自定义 typography 插件样式
            typography: {
                DEFAULT: {
                    css: {
                        h2: {
                            'margin-top': 'unset',
                            'margin-bottom': 'unset'
                        },
                        'h2 + *': {
                            'margin-top': '1.25em'
                        },
                        '* + p': {
                            'margin-top': '1.25em'
                        },
                        'code::before': {
                            content: 'none'
                        },
                        'code::after': {
                            content: 'none'
                        },

                        'blockquote  p:first-of-type::before': {
                            content: 'none'
                        },
                        'blockquote  p:last-of-type::after': {
                            content: 'none'
                        },
                        'blockquote  p': {
                            'font-style': 'normal',
                            'font-weight': '300'
                        },
                    }
                }
            }
        },
    },
    plugins: [
        plugin((addUtilities, addComponents, e, prefix, config) => {
            // Add your custom styles here
        }),
        require('@tailwindcss/typography')({
            // 自定义 typography 插件的类名
            className: 'prose'
        }),
    ],
}
