const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
module.exports = {
    entry: ['babel-polyfill','./src/js/index.js'],//from where the the buddling proces to start 
    output: {
        path : path.resolve(__dirname,'dist'),//to where all the bundle.js path
        filename:'js/bundle.js'//name of the bundled js file
    },
    watch:true,
    devServer:{//to make sure that we dont build the bundle every time
        contentBase:'./dist',//the path or directory where the index.html file needs to injected
        
    },
    plugins:[//complex processing of input files
            new htmlPlugin({
                filename:'index.html', // the file to which src index need to copied from 
                template:'./src/index.html' // path of src
             })
        ],
    module :{ //import or load or process them like converting sass to css,ES& to ES5
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader'
                }                
            }
        ]
    }
};