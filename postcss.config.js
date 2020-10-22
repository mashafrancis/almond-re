module.exports = {
	plugins: {
		'postcss-preset-env': {
			browsers: 'last 2 versions',
			stage: 2,
			features: {
				'postcss-custom-properties': { preserve: false },
			},
			autoprefixer: {
				remove: false,
				grid: true,
				flexbox: true,
			},
		},
	},
};
