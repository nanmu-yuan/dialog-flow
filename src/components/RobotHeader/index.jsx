import { useContext, useEffect, useState } from 'react'
import './robotheader.scss'
const RobotHeader=(props)=>{
    const {siteName} = props;
    return(
        <div className="robot-header">
            <div className="photo robot-logo">{siteName.slice(0,1).toUpperCase()}</div>
            <div className="profile">
                <p className="p-name">{siteName}</p>
                <p className="p-intro">
                   Customer Service
                </p>
            </div>
        </div>
    )
}
export default RobotHeader