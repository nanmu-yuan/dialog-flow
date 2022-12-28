// 封装axios
import axios from 'axios'
import { getToken } from '../api/robot';
//创建服务
const service = new axios.create({
    baseURL:'/',
    timeout:'1000*60',
    retry: 2, //设置全局重试请求次数（最多重试几次请求）
    retryDelay: 1000, //设置全局请求间隔
    headers:{
        "Content-Type":'application/json;charset=UTF-8'
    }
})
// 请求拦截器
service.interceptors.request.use((config)=>{
    let token = localStorage.getItem('robotToken');
    if(token){
        config.headers.authorization =`Bearer ${token}`;
    }
    return config
},error=>{
    return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use((res)=>{
    return res.data
},error=>{
    if(error && error.response && error.response.status == 401){
        getToken().then(res=>{
            const token = res[0]['token']
            window.localStorage.setItem('robotToken',token)
        })
    }
    let config = error.config;
    if(!config || !config.retry) return Promise.reject(error);
    config.__retryCount = config.__retryCount || 0;
    if(config.__retryCount >= config.retry){
        return Promise.reject(error);
    }
    config.__retryCount += 1;
    let backOff = new Promise((resolve)=>{
        setTimeout(()=>{
            resolve()
        },config.retryDelay || 1)
    }) 
    return backOff.then(()=>{
        return service(config)
    })
})

export default service