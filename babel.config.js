module.exports = (api) => {
	// This caches the Babel config
	api.cache.using(() => process.env.NODE_ENV);
	return {
		presets: ['@babel/preset-env'],
		// Applies the react-refresh Babel plugin on non-production modes only
		...(!api.env('production') && { plugins: ['react-refresh/babel'] }),
		env: {
			test: {
				plugins: ['dynamic-import-node'],
			},
		},
		plugins: [
			'add-module-exports',
			'syntax-dynamic-import',
			'dynamic-import-node',
			'@babel/plugin-proposal-class-properties',
			'@babel/plugin-syntax-dynamic-import',
			[
				'@babel/plugin-transform-react-jsx',
				{
					runtime: 'automatic',
				},
			],
			[
				'babel-plugin-import',
				{
					libraryName: '@material-ui/core',
					libraryDirectory: '',
					camel2DashComponentName: false,
				},
				'tree-shaking-mui-core',
			],
			[
				'babel-plugin-import',
				{
					libraryName: '@material-ui/core/styles',
					libraryDirectory: '',
					camel2DashComponentName: false,
				},
				'tree-shaking-mui-styles',
			],
			[
				'babel-plugin-import',
				{
					libraryName: '@material-ui/core/colors',
					libraryDirectory: '',
					camel2DashComponentName: false,
				},
				'tree-shaking-mui-colors',
			],
			[
				'babel-plugin-import',
				{
					libraryName: '@material-ui/icons',
					libraryDirectory: '',
					camel2DashComponentName: false,
				},
				'tree-shaking-mui-icons',
			],
			[
				'module-resolver',
				{
					root: ['./src'],
					alias: {
						'@component': './src/components/',
						'@pages': './src/pages/',
						'@placeholders': './src/placeholders/',
						'@modules': './src/store/modules/',
						'@utils': './src/utils/',
						'@context': './src/context/',
						'@hooks': './src/hooks/',
					},
				},
			],
		],
	};
};
