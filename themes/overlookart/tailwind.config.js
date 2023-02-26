/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
    content: ['content/**/*.md', 'layouts/**/*.html'],
    theme: {
        extend: {
            backgroundImage:{
                "sitebg":"url('https://source.unsplash.com/collection/399194')"
            }
        },
    },
    plugins: [
        plugin((addUtilities, addComponents, e, prefix, config) => {
            // Add your custom styles here
        }),
        require('@tailwindcss/typography'),
    ],
}
