import { createContext, useEffect, useReducer } from "react"
import { CallBack} from "../api/robot";
export const RobotStateContext = createContext();
export const RobotDispatchContext = createContext();

const reducer = (state, action) => {
    switch(action.type){
        case 'INPUT_TO_ROBOT':
            return{
                context:[{
                    outputMessage:'...',
                    inputMessage:action.payload
                }]
            }
        case 'FROM_TO_ROBOT':
            const mes = {
                context:[{
                    ...state.context[0],
                    outputMessage:action.payload,
                }],
          
            }

            const cache = JSON.parse(window.localStorage.getItem('robot'));
            if(cache){
                const newList = cache.concat(mes.context);
           
                window.localStorage.setItem('robot',JSON.stringify(newList));
               
            }else{
                window.localStorage.setItem('robot',JSON.stringify(mes.context))
              
            }
            return mes
        default:
            throw new Error(`unknown action: ${action.type}`)
    }
} 

const RobotProvider = ({ children }) => {
    const initRobotData = {
        context:[],

    };
    const [state, dispatch] = useReducer(reducer, initRobotData);
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