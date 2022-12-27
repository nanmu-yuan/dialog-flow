import { useState } from "react";

const useLocalStorage = (key,initValue)=>{
    const [storeValue,setStoreVale] = useState(()=>{
        try{
            const item = window.localStorage.getItem(key);
            return item?JSON.parse(item):initValue

        }catch(error){
            return initValue
        }
    })
    const setValue =(value)=>{
        try{
            const valueStore = value instanceof Function? value(storeValue):value;
            setStoreVale(valueStore);
            window.localStorage.setItem(key,JSON.stringify(valueStore))
        }catch(error){
            console.log(error);
        }
    }
    return [storeValue,setValue]
}
export default useLocalStorage