import './App.css';
import { ResumeScreening } from './webpage';

function App() {
  return (
    <div className='relative bg-[#E7eff6]'>
        <div id="alert-container" className='absolute top-[20px] right-[20px]' style={{zIndex:'10'}}></div>
        <div className='blur-box' id='blur-box'>
          <div className='loader-box' id='loader-box'></div>      
        </div>
        <ResumeScreening/>
    </div>
  );
}

export default App;
