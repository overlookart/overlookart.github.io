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
                "sitebg":"url('https://source.unsplash.com/random/1280x800?simple,color,bright')"
            },
            // 自定义 typography 插件样式
            typography: {
                DEFAULT: {
                    css: {
                        'code::before': {
                            content: ''
                        },
                        'code::after': {
                            content: ''
                        }
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
