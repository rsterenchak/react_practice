import { useState } from 'react'
import LoadButtonMobile from './LoadButtonMobile.jsx';
import ClearButtonMobile from './ClearButtonMobile.jsx';
import './index.css'

function MobileExtension({

}) {
  
  
  return (
      <div id='footSection'>

        <div id='innerFoot1'>
          <div id='formatOptionsNew'>

            <LoadButtonMobile 
            />

            <ClearButtonMobile

            />

          </div>

        </div>

        <div id='innerFoot2'>
          <div id='footerAreaNew'>
            <div id='footerAreaInner'>
              <div id='footAreaText'></div>
              <div id='footAreaLogo'></div>
            </div>
          </div>

        </div>

      </div>
  )
}

export default MobileExtension
