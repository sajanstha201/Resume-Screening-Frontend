import logo from './logo.svg';
import './App.css';
import { ResumeScreening } from './webpage';

function App() {
  return (
    <div className='relative'>
        <div id="alert-container" className='fixed top-[20px] right-[20px] z-1000'></div>
        <div className='blur-box' id='blur-box'>
          <div className='loader-box' id='loader-box'></div>      
        </div>
        <ResumeScreening/>
    </div>
  );
}

export default App;
