import { useState } from 'react'
import trashIcon from './assets/trash-outline.svg'
import './index.css'

function ClearButtonMobile({
    runExperienceUpdate
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
  
      
      <div className="formatOptionsInner2" 

        onClick={runExperienceUpdate}
      
        onMouseEnter={() => setHovered(true)} 
        onMouseLeave={() => setHovered(false)}
  
        onMouseDown={() => setMouseClick(true)} 
        onMouseUp={() => setMouseClick(false)}
  
        style={boxStyle}
        >
        <img className="formatOptionsLogo2" src={trashIcon}/>
        <div className="formatOptionsName2"></div>
      </div>
  
    ); 
  
  }

  export default ClearButtonMobile