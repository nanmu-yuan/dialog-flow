import React, { useContext, useEffect, useRef, useState } from "react";
import { RobotDispatchContext,inputToRobot,DealOrder } from "../../contexts/robot";
import './robotfooter.scss'
const initAction = {
    inputData: '',
    disabled: true
}
const RobotFooter = () => {
    const [initState,setInitState] = useState(initAction);
    const robotDispatch = useContext(RobotDispatchContext);
    const inputRef = useRef();
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
    const order = (e)=>{
        const mes = e.target.innerText;
        DealOrder('order',robotDispatch)
        inputRef.current.focus()
        
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
                    <input value={initState.inputData} ref={inputRef} onInput={input} placeholder="Type your message briefly here" className="robot-search-input message-input"></input>
                    <button className="robot-input-btn" disabled={initState.disabled}  onClick={change} >Enter</button>
                </div>
            </div>
        )
    
}
export default RobotFooter