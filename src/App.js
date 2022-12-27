import RobotHome from './page/RobotHome';
import RobotProvider from './contexts/robot';
import './App.scss'
function App() {
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