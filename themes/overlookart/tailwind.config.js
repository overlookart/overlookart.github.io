/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
    content: ['content/**/*.md', 'layouts/**/*.html'],
    theme: {
        extend: {
            backgroundImage:{
                "sitebg":"url('https://source.unsplash.com/random/1280x800?light,wallpapers,hd')"
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
