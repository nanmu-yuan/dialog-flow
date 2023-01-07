import React, { useContext, useRef, useState } from "react";
import { RobotDispatchContext,inputToRobot, } from "../../contexts/robot";
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
        let mes = e.target.innerText;
        setTimeout(() => {
            inputToRobot(robotDispatch,mes)
        })
        inputRef.current.focus()
        
    }
    const keyUp = (e)=>{
       
        if(e.keyCode == 13){
           setTimeout(()=>{
            change()
           })
        }
    }
        return (
            <div className="robot-footer">
                <div className="robot-associate">
                    <ul>
                        <li onClick={order}>Track order</li>
                        <li onClick={order}>Cancel order</li>
                        <li onClick={order}>Staff Service</li>
                    </ul>
                </div>
                <div className="robot-search">
                    <input value={initState.inputData} ref={inputRef} onInput={input} onKeyUp = {keyUp} placeholder="Type your message briefly here" className="robot-search-input message-input"></input>
                    <button className="robot-input-btn" disabled={initState.disabled}  onClick={change} >Enter</button>
                </div>
            </div>
        )
    
}
export default RobotFooter