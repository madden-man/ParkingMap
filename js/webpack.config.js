const defaults = require('@wordpress/scripts/config/webpack.config');

module.exports = {
	...defaults,
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
};

// This shows how we could compile multiple SPAs
// https://dev.to/alexstandiford/make-webpack-configuration-easy-with-wordpress-scripts-26kk
