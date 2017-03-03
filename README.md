# Smooth with Vue2 & webpack2 & express

<img src="./public/imgs/smooth.png" />

### 当前已有
+ gulp结构化
+ webpack2
    1. 开发环境热加载
    2. 生产环境打包优化（DLL与样式和主体文件分离）
    3. 打包文件分析
+ Vue2
    1. sass：集成flex、响应式mixin
    2. ajax集中分封装
    3. router
+ express
    1. 区分环境数据mock
    2. 清晰化的转发请求
    3. 文件更改热重启
    
----

### TODO
+ webpack
    1. 优化缓存方案，现在的比较僵硬
    2. 打包提示优化
+ express
    2. 文件更改热重启后自动刷新浏览器