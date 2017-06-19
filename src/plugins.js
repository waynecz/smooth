import APIS from './components/api/index'

export default {
    install (Vue, options) {
        Vue.prototype.jax = (url, data, option = {loading: false, errmsg: '请求发生异常'}) => {
            return axios({
                url: url,
                data: data,
                method: 'POST'
            }).catch(e => {
                console.warn(e);
            }).then(res => {
                if (res.data.success) {
                    return res.data
                } else {
                    console.log(res.data.message || option.errmsg);
                    return res.data
                }
            })
        };

        Vue.prototype.api = APIS
    }
};