import axios from 'axios';
import qs from 'qs';

// 引入element ui中的loading和message组件
import {Loading, Message} from 'element-ui';

const Axios = axios.create({
    baseURL: "http://beta-business.mf-data.com/api/v1", // 默认请求接口的路径
    timeout: 60000,//如果请求的时间超过'timeout'，请求将被中止
    responseType: "json",// 响应的数据格式 json
    withCredentials: true, // 跨域是否带Token、cookie
    headers: {//自定义的请求头
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        "Accept": "application/json, text/javascript"
    },
    // xsrf 设置
    // xsrfCookieName: "XSRF-TOKEN",
    // xsrfHeaderName: "X-XSRF-TOKEN",
});

let loadingInstance;
// 当我们需要统一处理http请求和响应时我们通过设置拦截器处理方便很多
//请求拦截器
Axios.interceptors.request.use(
    // 在发送请求之前做些什么
    config => {
        config.data = qs.stringify(config.data);//将请求数据转换为form-data格式
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // if(token){
        //   config.params = {'token':token}
        // config.headers.Authorization = token;
        // }

        // element ui Loading方法
        loadingInstance = Loading.service({
            lock: true,
            text: '拼命加载中...',
        });
        return config;
    },
    // 对请求错误做些什么
    error => {
        loadingInstance.close();//关闭element ui Loading
        Message.error(error);//element ui的消息弹窗组件
        return Promise.reject(clientId);
    }
);

//响应拦截器即异常处理
Axios.interceptors.response.use(
    // 对响应数据做点什么
    response => {
        loadingInstance.close();//关闭element ui Loading
        if (response.status != 200) {
            Message.error(response.msg);
        }
        return response;
    },
    // 对响应错误做点什么
    error => {
        loadingInstance.close();//关闭element ui Loading
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    Message.error('错误请求');
                    break;
                case 401:
                    Message.error('未授权，请重新登录');
                    break;
                case 403:
                    Message.error('拒绝访问');
                    break;
                case 404:
                    Message.error('请求错误，未找到该资源');
                    break;
                case 405:
                    Message.error('请求方法未允许');
                    break;
                case 408:
                    Message.error('请求超时');
                    break;
                case 500:
                    Message.error('服务器端出错');
                    break;
                case 501:
                    Message.error('网络未实现');
                    break;
                case 502:
                    Message.error('网络错误');
                    break;
                case 503:
                    Message.error('服务不可用');
                    break;
                case 504:
                    Message.error('网络超时');
                    break;
                case 505:
                    Message.error('http版本不支持该请求');
                    break;
                default:
                    Message.error('连接错误' + response.data.msg);
            }
        } else {
            Message.error('连接到服务器失败');
        }
        return Promise.resolve(error.response)
    }
);

// 封装get请求
export function Get(url, params = {}) {
    return new Promise((resolve, reject) => {
        Axios.get(url, {
            params: params
        }).then(response => {
            // console.log(response)
            resolve(response.data);
        }).catch(error => {
            reject(error)
        })
    })
}

// 封装post请求
export function Post(url, data = {}) {
    return new Promise((resolve, reject) => {
        Axios.post(url, data).then(response => {
            resolve(response.data);
        }, error => {
            reject(error)
        })
    })
}

// 封装put请求
export function Put(url, data = {}) {
    return new Promise((resolve, reject) => {
        Axios.put(url, data).then(response => {
            resolve(response.data);
        }, error => {
            reject(error)
        })
    })
}

// 封装delete请求
export function Delete(url, data = {}) {
    return new Promise((resolve, reject) => {
        Axios.delete(url, data).then(response => {
            resolve(response.data);
        }, error => {
            reject(error)
        })
    })
}
