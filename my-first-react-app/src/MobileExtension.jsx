import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'

function MobileExtension() {
  console.log('entered mobileExtension component')
  return (
      <div id='footSection'>

        <div id='innerFoot1'>
          <div id='formatOptionsNew'>
            <div id='formatOptionsInner1'>
              <div id='formatOptionsLogo1'></div>
              <div id='formatOptionsName1'></div>
            </div>
            <div id='formatOptionsInner2'>
            <div id='formatOptionsLogo2'></div>
              <div id='formatOptionsName2'></div>              
            </div>
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
