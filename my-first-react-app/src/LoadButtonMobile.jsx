import { useState } from 'react'
import loadIcon from './assets/refresh-outline.svg'
import './index.css'

function LoadButtonMobile({
  runEducationUpdater
  }){
  
    // console.log('Opened LoadButtonMobile.jsx');

    const [isHovered, setHovered] = useState(false);
    const [isMouse, setMouseClick] = useState(false); // setup another state for click down/up
  
    const [isShown, setShown] = useState(false);
  
    const boxStyle = {
      boxShadow: isHovered ? isMouse ? 'none' : '0 2px 6px rgba(0, 0, 0, 0.4)' : "none",
      backgroundColor: isMouse ? '#c40000' : '#ff6262',
      cursor: 'pointer'
      
    }
  
  
  
    return (
  
      
      <div className="formatOptionsInner1" 

        onClick={runEducationUpdater}
      
        onMouseEnter={() => setHovered(true)} 
        onMouseLeave={() => setHovered(false)}
  
        onMouseDown={() => setMouseClick(true)} 
        onMouseUp={() => setMouseClick(false)}
  
        style={boxStyle}
        >
        <img className="formatOptionsLogo1" src={loadIcon}/>
        <div className="formatOptionsName1"></div>
      </div>
  
    ); 
  
  }

  export default LoadButtonMobile