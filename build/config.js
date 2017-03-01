const path     = require('path');

module.exports = {
    DLLPath: path.resolve(process.cwd(), './public/js'),
    bundlePath: path.resolve(process.cwd(), './public/js'),
    entry: path.resolve(process.cwd(), './src/entry.js'),
    proOutput: path.resolve(process.cwd(), './public/js'),
    devPackage: {
        'vue$': 'vue/dist/vue.js',
        'vue-router': 'vue-router/dist/vue-router.js',
        'axios': 'axios/dist/axios.js'
    },
    devDllPackage: [
        'vue/dist/vue.js',
        'vue-router/dist/vue-router.js',
        'axios/dist/axios.js'
    ],
    proPackage: {
        'vue$': 'vue/dist/vue.min.js',
        'vue-router': 'vue-router/dist/vue-router.min.js',
        'axios': 'axios/dist/axios.min.js'
    },
    proDllPackage: [
        'vue/dist/vue.min.js',
        'vue-router/dist/vue-router.min.js',
        'axios/dist/axios.min.js'
    ]
};
