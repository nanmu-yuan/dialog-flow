import React, { useContext, useEffect, useState } from "react";
import { RobotDispatchContext,inputToRobot,queryOrder } from "../../contexts/robot";
import './robotfooter.scss'
const initAction = {
    inputData: '',
    disabled: true
}
const RobotFooter = () => {
    const [initState,setInitState] = useState(initAction);
    const robotDispatch = useContext(RobotDispatchContext);
    const change = () => {
        initState.inputData.trim()&& inputToRobot(robotDispatch,initState.inputData);
        setInitState(state => {
            return {
                ...state,
                inputData: '',
                disabled: true
            }
        })
    }
    const input = (e) => {
        setInitState(state=>{
            return{
                ...state,
                disabled:e.target.value.trim()?false:true,
                inputData:e.target.value
            }
        })
    }
    const order = ()=>{
        queryOrder(robotDispatch)
    }
    useEffect(()=>{
            document.onkeydown = (e) => {
                if (e.key === 'Enter') {
                   change()

                }
            }
        
    },[initState])
        return (
            <div className="robot-footer">
                <div className="robot-associate">
                    <ul>
                        <li onClick={order}>Tracking</li>
                    </ul>
                </div>
                <div className="robot-search">
                    <input value={initState.inputData} onInput={input} placeholder="Type your message briefly here" className="robot-search-input message-input"></input>
                    <button className="robot-input-btn" disabled={initState.disabled}  onClick={change} >Enter</button>
                </div>
            </div>
        )
    
}
export default RobotFooter