import { useEffect, useState,useContext,useRef} from "react";
import { RobotStateContext } from "../../contexts/robot";
import './robotbox.scss'
import GuestMessage from "../GuestMessage";
import AgentMessage from "../AgentMessage";
import Help from "../Help";


const RobotBox=(props)=>{
    const messageView = useRef(null);
    const messageViewBox = useRef(null);
    const {siteName} = useContext(RobotStateContext)
    const newList = JSON.parse(window.localStorage.getItem(siteName))||[]
    const  {data} = props;
    useEffect(()=>{
        window.addEventListener('resize',()=>{
            messageViewBox.current.scrollTop =  messageView.current.scrollHeight + 90;
        })
      messageViewBox.current.scrollTop =  messageView.current.scrollHeight+90;
    },[props])
        return(
            <div className="robot-ctn scrollHeight" ref={messageViewBox}>
              
                <ul className="" ref={messageView}>
                    <li><Help></Help></li>
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
                       data.context.map((item,index) => {
                           if( item && item.outputMessage=='...'){
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