import RobotHeader from "../components/RobotHeader"
import RobotBox from "../components/RobotBox"
import RobotFooter from "../components/RobotFooter"
import './robothome.scss'
import { useEffect } from "react"
import { getToken } from "../api/robot"
const RobotHome = ()=>{
    useEffect(()=>{
        getToken().then(res=>{
            const token = res[0]['token']
            window.localStorage.setItem('robotToken',token)
        })
    },[])
    return(
        <div className="robot-body">
            <div className="robot-container container-fluid-1200">
                <div className="robot-center">
                    <RobotHeader></RobotHeader>
                    <RobotBox></RobotBox>
                    <RobotFooter></RobotFooter>
                </div>
            </div>
        </div>
    )
}
export default RobotHome