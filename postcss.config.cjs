const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
	plugins: [require('postcss-nested'), require('autoprefixer'), require('cssnano'), purgecss({})]
}
