import { useState } from 'react'
import gitIcon from './assets/github.svg'
import LoadButtonMobile from './LoadButtonMobile.jsx';
import ClearButtonMobile from './ClearButtonMobile.jsx';
import './index.css'

function MobileExtension({
  passedEducationUpdater,
  passedResumeClear
}) {
  
  
  return (
      <div id='footSection'>

        <div id='innerFoot1'>
          <div id='formatOptionsNew'>

            <LoadButtonMobile
              runEducationUpdater={passedEducationUpdater}
            />

            <ClearButtonMobile
              runResumeClear={passedResumeClear}
            />

          </div>

        </div>

        <div id='innerFoot2'>
          <div id='footerAreaNew'>
            <div id='footerAreaInner'>
              <div className='footAreaText'></div>
              <a href='https://github.com/rsterenchak' target="_blank">
                <img className='footAreaLogo' src={gitIcon} alt={'github icon link'}></img>
              </a>
              {/* <div id='footAreaLogo'></div> */}
            </div>
          </div>

        </div>

      </div>
  )
}

export default MobileExtension
