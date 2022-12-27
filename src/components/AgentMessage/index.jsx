import React,{Component} from "react";
import './agentmessage.scss'
 const AgentMessage =(props)=>{
    const {input} = props;
    if(input.inputMessage){
        return(
            <React.Fragment>
                <div className="item-user">
                    <div className="content content-user">
                        <p>{input.inputMessage}</p>
                    </div>
                    <div className="user-avatar">
                    </div>
                </div>
            </React.Fragment>
        )
    }else{
        return(
            ''
        )
    }
 
}
export default AgentMessage