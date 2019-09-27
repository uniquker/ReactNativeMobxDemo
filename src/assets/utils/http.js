import {
    ToastAndroid,
} from 'react-native';
import axios from 'axios';

const ut = 'https://movie.douban.com';
const instance = axios.create({
    baseURL: ut,
    // headers: { 'X-Custom-Header': 'foobar' }
});

//请求拦截处理
instance.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

//返回拦截处理
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
axios.defaults.timeout =  15 * 3 * 1000;
/**
 * 
 * @param {*} url    url
 * @param {*} params 请求参数
 * @param {*} config 一些特定配置 
 */
export const get = async (url, params, config = { auth: false }) => {
    return new Promise((resolve, reject) => {
        
        console.log('【url】' + JSON.stringify(url));
        console.log('【params】' + JSON.stringify(params));
        instance.get(url, params, {
            headers: {
                'Authorization': config.auth//配置token之类得东西
            }
        })
        .then(res => {
            console.log("【status】" + res.status + " 【" + JSON.stringify(res.data))
            if (res.status == 200) {
                resolve(res.data)
            } else {
                let r = { "status": -1, "msg": "system error." };
                if (res.data && res.data.msg) {
                    r = res.data;
                }
                reject(r);
                ToastAndroid.show(r.msg, ToastAndroid.SHORT);
            }
        })
        .catch(error => {
            console.log("【error】" + JSON.stringify(error))
            reject({ "status": -3, "msg": "system exception.", log: error })
        })
    })
}