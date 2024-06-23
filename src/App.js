import logo from './logo.svg';
import './App.css';
import { ResumeScreening } from './webpage';

function App() {
  return (
    <div>
        <div id="alert-container"></div>
        <div className='blur-box' id='blur-box'>
          <div className='loader-box' id='loader-box'></div>      
        </div>
        <ResumeScreening/>
    </div>
  );
}

export default App;
