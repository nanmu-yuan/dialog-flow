import RobotHome from './page/RobotHome';
import RobotProvider from './contexts/robot';
import { useEffect } from 'react';
import './App.scss'
import { getToken } from "./api/robot"
function App() {
  useEffect(()=>{
    console.log('12312')
    getToken().then(res=>{
        const token = res[0]['token']
        window.localStorage.setItem('robotToken',token)
    })
},[])
  return (
    <div className="App">
      <div className="box1">
        <RobotProvider>
          <RobotHome ></RobotHome>
        </RobotProvider>
      </div>
    </div>
  );
}

export default App;