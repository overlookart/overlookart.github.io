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
                "sitebg":"url('https://source.unsplash.com/random/1280x800?color,bright,nature,space')"
            },
            // 自定义 typography 插件样式
            typography: {
                DEFAULT: {
                    css: {
                        'max-width': '90ch',
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
                        
                        'tbody td': {
                            'vertical-align': 'middle'
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
