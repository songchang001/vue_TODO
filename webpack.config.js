const path=require('path');
const HTMLPlugin=require('html-webpack-plugin')
const webpack = require('webpack')

const isDev=process.env.NODE_ENV==='production'

const config={
    target:'web',
    entry:path.join(__dirname,'src/index.js'),
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dish')
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            }, 
            {
                test:/\.jsx$/,
                loader:'babel-loader'
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{sourceMap:true}
                    },
                    'less-loader'
                ]
            },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,
                            name:'[name]-aaa.[ext]'
                        }                    
                    }
                ]
                
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'progess.env':{
                NODE_ENV:isDev?'"developent"':'"production"'
            }
        }),
        new HTMLPlugin()
    ]
}

if(isDev){
    config.devtool='#cheap-module-eval-source-map'
    config.devServer={
        port:8008,
        host:'127.0.0.1',
        overlay:{
            errors:true
        },
        hot:true,
        //open:true, //自动打开页面
        // historyFallback:{

        // }
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),//启用 模块热替换插件
        new webpack.NoEmitOnErrorsPlugin()      //在编译出现错误时，确保输出资源不会包含错误
    )
}


module.exports=config;