const currentTask = process.env.npm_lifecycle_event 
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fse = require('fs-extra')

class RunAfterCompile {
    apply(compiler) {
        compiler.hooks.done.tap('Copy Images', function(){
            fse.copySync('./app/assets/images', './docs/assets/images')
        })
    }
}

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-hexrgba'),
    require('autoprefixer')
]

let cssConfig = {
    test : /\.css$/i,
     use: ['css-loader', {loader: 'postcss-loader', options: {postcssOptions: {plugins:  postCSSPlugins}}}]
 }

let pages = fse.readdirSync('./app').filter(function(file){
    return file.endsWith('.html')
}).map(function(page) {
    return new HtmlWebpackPlugin({
        filename: page,
        template: `./app/${page}`
    })
})

let config = {
    entry: './app/assets/scripts/APP.js',
    // plugins : [new HtmlWebpackPlugin({filename: 'index.html', template: './app/index.html'})],
    plugins :pages,
    module : {
        rules : [
            cssConfig, 
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                 loader : 'babel-loader',
                 options : {
                     presets: ['@babel/preset-react', '@babel/preset-env']
                 }
                }
             }
        ]
    }
}

if (currentTask == 'dev') {
    cssConfig.use.unshift('style-loader')

    config.output = {
            filename: 'bundled.js',
            path: path.resolve(__dirname, 'app')
        },

    config.devServer = {
        // before: function(app, server) {
        //     server._watch('./app/**/*.html')
        // },
        watchFiles: ('./app/**/*.html'),
        static: {
            directory: path.join(__dirname, "app")
          },
        hot: true,
        port: 3000,
        host: '0.0.0.0'
    },

    config.mode = 'development'
    
}

if (currentTask == 'build') {
    
    cssConfig.use.unshift(MiniCssExtractPlugin.loader)
    postCSSPlugins.push(require('cssnano'))
    config.output = {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'docs')
    },

    config.mode = 'production'
    config.optimization = {
        splitChunks : {chunks: 'all'}
    }

    config.plugins.push(
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}),
        new RunAfterCompile()
        )
}

// module.exports : {
//  
//     entry: './app/assets/scripts/APP.js',
//     output: {
//         filename: 'bundled.js',
//         path: path.resolve(__dirname, 'app')
//     },
//     devServer: {
//         // before: function(app, server) {
//         //     server._watch('./app/**/*.html')
//         // },
//         watchFiles: ('./app/**/*.html'),
//         static: {
//             directory: path.join(__dirname, "app")
//           },
//         hot: true,
//         port: 3000,
//         host: '0.0.0.0'
//     },
//     mode: 'development',
//     module : {
//         rules : [
//             {
//                test : /\.css$/i,
//                 use: ['style-loader', 'css-loader', {loader: 'postcss-loader', options: {postcssOptions: {plugins:  postCSSPlugins}}}]
//             }
//         ]
//     }
// } 

// {
//     test : /\.css$/i,
//      use: ['style-loader', 'css-loader', {loader: 'postcss-loader', options: {postcssOptions: {plugins:  postCSSPlugins}}}]
//  }

module.exports = config