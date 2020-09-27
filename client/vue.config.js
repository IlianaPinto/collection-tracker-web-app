const path = require('path');
const { env } = require('process');

module.exports = {
    outputDir: path.resolve(__dirname,'../server/public'),
    devServer:{
        proxy: 'http://localhost:3000/'
        
    }
};