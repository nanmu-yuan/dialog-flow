import { useEffect, useState } from 'react'
import './robotheader.scss'
const RobotHeader=()=>{
    const [info,setInfo] = useState({
        title:'',
        name:''
    });
    useEffect(()=>{
        const siteName = window.location.href.split("index/")[1]||"Customer";
        const name = siteName.slice(0,1).toUpperCase()
        setInfo((state)=>{
            return{
                ...state,
                title:siteName,
                name:name
            }
        })
    },[])
    return(
        <div className="robot-header">
            <div className="photo robot-logo">{info.name}</div>
            <div className="profile">
                <p className="p-name">{info.title}</p>
                <p className="p-intro">
                   Customer Service
                </p>
            </div>
        </div>
    )
}
export default RobotHeader