import * as axiosBase from './index'

const siteName = window.location.href.split("index/")[1].split("/")[0];
const useEmail = window.location.href.split("index/")[1].split("/")[1];
const cloudAndShoplazaCom = (data)=>{
        const flag = data.indexOf("shoplaza_")>=0 || data.indexOf("Cloud_")>=0;
        if(flag){
            return data.split("shoplaza_")[1]?data.split("shoplaza_")[1]:data.split("Cloud_")[1]
        }else{
            return data
        }
}

export const queryImagePath =(params)=>{
    params = params || {};
    return axiosBase.get('/api/xxx',params)
}
export const register = (params)=>{
    params = params || {}
    return axiosBase.post('/api/register',params)
}
export const login = (params)=>{
    params = params || {};
    return axiosBase.post('/api/login',params)
}
// export const queryProduct =(params)=>{
//     params = params || {};
//     return axiosBase.get('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json',params)
// }
export const queryProduct =(params)=>{
    params = params || {};
    return axiosBase.get('https://smartsend.seamarketings.com/api/v3/base_template/',params)
}

export const CallBack =(data)=>{
    const params ={
        "queryInput":{
            "text":{
                "text":data,
                "languageCode":"en-US"
            }
        },
        "queryParams":{
            "contexts":[
                {
                    "name": "projects/customer-370905/agent/sessions/1234567891/contexts/Site",
                    "lifespanCount": 2,
                    "parameters":{
                        "siteName": cloudAndShoplazaCom(siteName),
                        "email":useEmail
                    }
                }
            ]
        }
    }
    return axiosBase.post('https://dialogflow.googleapis.com/v2/projects/customer-370905/agent/sessions/*:detectIntent',params)
}

export const getToken =()=>{
    return axiosBase.get('https://www.allindesk.com/cs/ggtoken',null)
}