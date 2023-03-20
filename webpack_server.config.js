const path = require("path");
const webpack = require("webpack");
//const nodeExternals = require("webpack-node-externals"); // to ignore all node_modules
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackPugManifestPlugin = require('webpack-pug-manifest-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

//const envResult = require('dotenv').config();
//const env = process.env;

/*const loaderExclusion = [ 
	path.resolve(__dirname, 'node_modules/'),
	path.resolve(__dirname, 'edited_modules/')
];*/


module.exports = {
  entry: {
	/* Page Entries */
	home: {
		import: './views/pages/home/app.js'
	},
	map: {
		import: './views/pages/map/app.js'
	},
  	about: {
		import: './views/pages/about/app.js'
	},
	examples: {
		import: './views/pages/examples/app.js'
	},
  	browser: {
		import: './views/pages/browser/app.js'
	},
  	contact: {
		import: './views/pages/contact/app.js'
	},
  	faq: {
		import: './views/pages/faq/app.js'
	},
  	plot: {
		import: './views/pages/plot/app.js'
	},
	/* Templates Entries */
	template_basic: {
		import: './views/templates/basic/app.js'
	},
	/* Entities Entries */
	entity_remains: {
		import: './views/pages/entity/app.js'
	},
	/* JS Snippets */
	"archeo_utilities": {
		import: './views/js-snippets/archeo-utilities/archeo-utilities.js',
		library: {
			name: "ArcheoUtilities",
			type: 'umd'
		}
	},
	"archeo_requests": {
		import: './views/js-snippets/archeo-requests/archeo-requests.js',
		library: {
			name: "ArcheoRequests",
			type: 'umd'
		}
	},
	// Exports Default Objects //
	"archeo_map": {
		import: './views/js-snippets/archeo-map/archeo-map.js',
		library: {
			name: "ArcheoMap",
			type: 'umd'
		}
	},
	"archeo_legend": {
		import: './views/js-snippets/archeo-legend/archeo-legend.js',
		library: {
			name: "ArcheoLegend",
			type: 'umd'
		}
	},
	"archeo_search": {
		import: './views/js-snippets/archeo-searcher/archeo-searcher.js',
		library: {
			name: "ArcheoSearcher",
			type: 'umd'
		}
	},
	"archeo_cache": {
		import: './views/js-snippets/archeo-cache/archeo-cache.js',
		library: {
			name: "ArcheoCache",
			type: 'umd'
		}
	},
	"archeo_session": {
		import: './views/js-snippets/archeo-session/archeo-session.js',
		library: {
			name: "ArcheoSession",
			type: 'umd'
		}
	},
	"archeo_ui": {
		import: './views/js-snippets/archeo-ui/archeo-ui.js',
		library: {
			name: "ArcheoUI",
			type: 'umd'
		}
	},
	"archeo_events": {
		import: './views/js-snippets/archeo-events/archeo-events.js',
		library: {
			name: "ArcheoEvents",
			type: 'umd'
		}
	}
  },
  externals: {
	/* root means global variable */
	//jquery: { commonjs: 'jQuery', commonjs2: 'jQuery', amd: 'jQuery', root: 'jQuery' },
	jquery: 'jQuery',
	json5: { commonjs: 'JSON5', commonjs2: 'JSON5', amd: 'JSON5', root: 'JSON5' },
	'jquery-mousewheel': { commonjs: 'jquery-mousewheel', commonjs2: 'jquery-mousewheel', amd: 'jquery-mousewheel', root: 'jquery-mousewheel' },
	'malihu-custom-scrollbar-plugin': { commonjs: 'malihu-custom-scrollbar-plugin', commonjs2: 'malihu-custom-scrollbar-plugin', amd: 'malihu-custom-scrollbar-plugin', root: 'malihu-custom-scrollbar-plugin' }
	/* Ignore librarized snippets */
	//'graphql_requests': { commonjs: 'ArcheoRequests', commonjs2: 'ArcheoRequests', amd: 'ArcheoRequests', root: 'ArcheoRequests' },
	//'archeo_map': { commonjs: 'ArcheoMap', commonjs2: 'ArcheoMap', amd: 'ArcheoMap', root: 'ArcheoMap' },
	//'archeo_utilities': { commonjs: 'ArcheoUtilities', commonjs2: 'ArcheoUtilities', amd: 'ArcheoUtilities', root: 'ArcheoUtilities' },
	//'archeo_legend': { commonjs: 'ArcheoLegend', commonjs2: 'ArcheoLegend', amd: 'ArcheoLegend', root: 'ArcheoLegend' }
  },
  output: {
    path: path.join(__dirname, "public"),
    publicPath: "/",
	filename: 'js/[name].[contenthash].js', // contenthash should sufficide; contenthash
	crossOriginLoading: 'anonymous',
	globalObject: 'window'
  },
  target: "web", //"node", I will be using 'web' for now
  node: {
    __dirname: false,
    __filename: false
  },
  mode: "production", // "production", // development
  //mode: "production",
  optimization: {
	minimize: true, //false
	minimizer: [
		new UglifyJsPlugin(),
		new TerserPlugin({
		  extractComments: false,
		}),
	],/*commnet*/
	splitChunks: {
		cacheGroups: {
			styles: {
				name: 'modules',
				type: 'css/mini-extract',
				test: /\.css$/,
				chunks: 'all',
				enforce: true
				//maxSize: 100000 // 100 kb
			},
			ol: {
				name: 'ol',
				test: /node_modules[\\\/]ol/,
				chunks: 'all',
				//enforce: true,
				maxSize: 150000 // 150 kb
			}
		},
	  },
  },
  resolve: {
    alias: {
      Views: path.resolve(__dirname, 'views'),
      JsSnippets: path.resolve(__dirname, 'views/js-snippets'),
      Source: path.resolve(__dirname, 'src'),
      Routes: path.resolve(__dirname, 'routes'),
      Images: path.resolve(__dirname, 'public/img'),

	  /* Pages */
      Pages: path.resolve(__dirname, 'views/pages')
	}
  },
  module: {
    rules: [
	  /* Load sites scripts */
	  {
		test: { and: [/\.js$/] },
        use: [
		  	{ 
				loader: "babel-loader",
				options: {
					// \\ for Windows, \/ for Mac OS and Linux
					"exclude": [ /node_modules[\\\/]core-js/, /node_modules[\\\/]webpack[\\\/]buildin/ ]
					/*exclude: [ 
						path.resolve(__dirname, 'node_modules/'),
						path.resolve(__dirname, 'edited_modules/')
					]*/
				},
				
			}
		]
      },
      {
        test: /\.pug$/,
        use: [{
          loader: "pug-loader",
          options: {
            root: path.join(__dirname, 'views')
          }
        }]
      },
      {
		test: /\.(s*)css$/,
		use: [
		{
			loader: MiniCssExtractPlugin.loader
		},{
			loader: "css-loader", // translates CSS into CommonJS #2
		},{
			loader: "sass-loader", // compiles Sass to CSS, using Node Sass by default #1
            options: {
            	includePaths: [path.join(__dirname, 'views')]
            }
		}]
	  },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
			  outputPath: 'img',
			  name(resourcePath, resourceQuery) {
				// `resourcePath` - `/absolute/path/to/file.js`
				// `resourceQuery` - `?foo=bar`
	
				if (process.env.NODE_ENV === 'development') {
				  return '[name].[ext]';
				}
				return '[contenthash].[ext]';
			  },
            }
          },
        ],
      },
      {
		test: /jquery-mousewheel/,
		use: [{
			loader: "imports-loader?define=>false&this=>window"
		}]
      },
      {
		test: /malihu-custom-scrollbar-plugin/,
		use: [{
			loader: "imports-loader?define=>false&this=>window"
		}]
      }
    ]
  },
  plugins: [
	new MiniCssExtractPlugin({
		filename: 'css/[name].[contenthash].css',
		linkType: 'text/css'
	}),
    new WebpackPugManifestPlugin({
	  filename: "[name]-scripts.pug", //"[name]-scripts.pug",
      assetPattern: '[\\\/][name][-.]?(?:[anyhash]\\.){1,2}js$',
      contentPattern: 'script(defer type="text/javascript" src="/[asset]")',
      outputDir: "../views/assets/"
	}),
    new WebpackPugManifestPlugin({
      filename: "[name]-styles.pug",
      assetPattern: '[\\\/][name][-.]?(?:[anyhash]\\.){1,2}css$',
      contentPattern: 'link(defer rel="stylesheet" href="/[asset]")',
      outputDir: "../views/assets/"
	}),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['js/*.js', 'css/*.css', 'js/*.txt', 'css/*.txt'],
	})
  ]
};
