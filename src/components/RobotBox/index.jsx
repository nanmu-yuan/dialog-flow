import { useEffect, useState,useContext,useRef} from "react";
import { RobotStateContext } from "../../contexts/robot";
import './robotbox.scss'
import GuestMessage from "../GuestMessage";
import AgentMessage from "../AgentMessage";
import { IsPC } from "../../utils/agent";
let calcNum = ''
if(IsPC()){
    calcNum = 250
}else{
    calcNum = 320
}
const defaultHeight=document.documentElement.clientHeight-calcNum
const RobotBox=(props)=>{
    const messageView = useRef(null);
    const messageViewBox = useRef(null);
    const [height,setDefaultHeight] = useState(defaultHeight);
    const RobotState = useContext(RobotStateContext);
    const newList = JSON.parse(window.localStorage.getItem('robot'))||[]
    useEffect(()=>{
        window.addEventListener('resize',()=>{
            setDefaultHeight(document.documentElement.clientHeight-calcNum)
        })
       messageViewBox.current.scrollTop =  messageView.current.scrollHeight+20;
    }) 
        return(
            <div className="robot-ctn" ref={messageViewBox} style={{'height':`${height}px`}} >
                <ul className="" ref={messageView}>
                    {
                        newList.map((item, index) => {
                                return (
                                    <li className="dialogue-item" key={index}>
                                        <div className="guess-outer">
                                            <AgentMessage input={item}></AgentMessage>
                                            <GuestMessage output={item} ></GuestMessage>
                                        </div>
                                    </li>
                                )
                        })
                    }
                    {
                        RobotState.context.map((item,index) => {
                           if(item.outputMessage=='...'){
                            return(
                                <li className="dialogue-item" key={index}>
                                <div className="guess-outer">
                                    <AgentMessage input={item}></AgentMessage>
                                    <GuestMessage output = {item} ></GuestMessage>
                                </div>
                            </li>
                            )
                           }
                        })
                    }
                </ul>
            </div>
        )
    
}
export default RobotBox