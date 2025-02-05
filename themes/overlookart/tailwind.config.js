/** @type {import('tailwindcss').Config} */
const { rgb } = require('d3')
const plugin = require('tailwindcss/plugin')
module.exports = {
    corePlugins: {
        preflight: true,
    },
    content: ['content/**/*.md', 'layouts/**/*.html'],
    theme: {
        extend: {
            backgroundImage:{
                // "sitebg":"url('https://source.unsplash.com/random/1280x800?color')"
                // "sitebg":"url('https://api.paugram.com/wallpaper/?source=gh')"
                // "sitebg":"url('https://t.alcy.cc/fj/')"
                // "sitebg":"url('https://sex.nyan.xyz/api/v2/img')"

                // "sitebg":"url('https://api.yimian.xyz/img')"
                // "sitebg":"url('https://image.anosu.top/pixiv?r18=1')"
                // "sitebg":"url('https://api.asxe.vip/scenery.php')"
                // "sitebg":"url('https://www.loliapi.com/acg/')"
                // "sitebg":"url('http://edgecats.net/')"
                // "sitebg":"url('https://bing.img.run/rand_uhd.php')"
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
