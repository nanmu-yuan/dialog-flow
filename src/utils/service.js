// 封装axios
import axios from 'axios'
import { getToken } from '../api/robot';
//创建服务
const service = new axios.create({
    baseURL:'/',
    timeout:'1000*60',
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
   return Promise.reject(error)
})

export default service