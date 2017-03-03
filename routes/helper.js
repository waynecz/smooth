const axios       = require('axios');
const mockHandler = require('../mock').mockHandler;

const defaultHandler = (req, res, next, data) => res.json(data);

/**
 *
 * @param router 路由对象
 * @param comeList 需要转发的urlList
 */
const transfer = (router, comeList) => {
    /**
     *
     * @param come 监听的url
     * @param to 转发到的url
     * @param handler 处理器
     * @param method 请求方法
     */
    let rule = (come, to, handler = defaultHandler, method = 'post') => {
        to = to || come;

        router[method.toLowerCase()](come, mockHandler((req, res, next) => {
            config = {
                method: 'post',
                url: to
            };

            let carrier     = method === 'post' ? 'body' : 'params';
            config[carrier] = req[carrier];

            axios(config).then(data => {
                handler(req, res, next, data)
            }).catch(err => {
                res.json({message: '出错了'})
            })
        }));
    };

    comeList.forEach(url => {
        rule(url.come, url.to, url.handler, url.method)
    })
};

module.exports = {
    transfer
};