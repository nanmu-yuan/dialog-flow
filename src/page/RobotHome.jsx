import RobotHeader from "../components/RobotHeader"
import RobotBox from "../components/RobotBox"
import RobotFooter from "../components/RobotFooter"
import './robothome.scss'
import { RobotStateContext } from '../contexts/robot'
import { useEffect,useContext } from "react"
import Help from "../components/Help"

const RobotHome = (props)=>{
    const data = useContext(RobotStateContext);
    const {siteName} = data;
    return(
        <div className="robot-body">
            <div className="robot-container container-fluid-1200">
                <div className="robot-center">
                    <RobotHeader siteName = {siteName}></RobotHeader>
                    <RobotBox data = {data}></RobotBox>
                    <RobotFooter></RobotFooter>
                </div>
            </div>
        </div>
    )
}
export default RobotHome