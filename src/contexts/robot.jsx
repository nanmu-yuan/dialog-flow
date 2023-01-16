import { createContext, useEffect, useReducer } from "react"
import { CallBack} from "../api/robot";
export const RobotStateContext = createContext();
export const RobotDispatchContext = createContext();

const reducer = (state, action) => {
    switch(action.type){
        case 'MODIFY_SITE_NAME':
            return{
                ...state,
                siteName:action.payload

            }
        case 'INPUT_TO_ROBOT':
            return{
                ...state,
                context:[{
                    outputMessage:'...',
                    inputMessage:action.payload
                }]
            }
        case 'FROM_TO_ROBOT':
            const mes = {
                ...state,
                context:[{
                    ...state.context[0],
                    outputMessage:action.payload,
                }],
          
            }
            const {siteName} = state;
            const cache = JSON.parse(window.localStorage.getItem(siteName));
            if(cache){
                const newList = cache.concat(mes.context);
                if(newList.length>=20){
                    
                }
                window.localStorage.setItem(siteName,JSON.stringify(newList));
            }else{
                window.localStorage.setItem(siteName,JSON.stringify(mes.context))
            }
            return mes
        default:
            throw new Error(`unknown action: ${action.type}`)
    }
} 

const RobotProvider = ({ children }) => {
    const initRobotData = {
        context:[],
        siteName:''

    };
    const [state, dispatch] = useReducer(reducer, initRobotData);
    const cloudAndShoplazaCom = (data)=>{
        const _data = data.toLowerCase();
        const flag = _data.indexOf("shoplaza_")>=0 || _data.indexOf("cloud_")>=0;
        if(flag){
            return _data.split("shoplaza_")[1]?_data.split("shoplaza_")[1]:_data.split("cloud_")[1]
        }else{
            return data
        }
}
    useEffect(()=>{
        const siteName =cloudAndShoplazaCom(window.location.href.split("index/")[1].split("/")[0]);
        dispatch({
            type:'MODIFY_SITE_NAME',
            payload:siteName
        })
    },[])
    return (
        <RobotDispatchContext.Provider value={dispatch}>
            <RobotStateContext.Provider value={state}>
                {children}
            </RobotStateContext.Provider>
        </RobotDispatchContext.Provider>

    )
}
export const inputToRobot=(dispatch,data)=>{
    queryRobotCallBackMessage(data,dispatch)
    dispatch({
        type:'INPUT_TO_ROBOT',
        payload:data
    })
   
}
const queryRobotCallBackMessage = (inputData,dispatch)=>{

    CallBack(inputData).then(res=>{
        const output = res.queryResult.fulfillmentText;
       dispatch({
            type:'FROM_TO_ROBOT',
            payload:output
           })
    })
}
export default RobotProvider