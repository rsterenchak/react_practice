import { useState } from 'react';
import MobileExtension from './MobileExtension.jsx';
import Mobile from './MobileExtension.jsx'
import personalIcon from './assets/personal-outline.svg'
import bookIcon from './assets/book-outline.svg'
import bagIcon from './assets/bag-outline.svg'
import mainIcon from './assets/main-icon.png'

import dropIconUp from './assets/caret-up-outline.svg'
import dropIconDown from './assets/caret-down-outline.svg'

import gitIcon from './assets/github.svg'


// create component for entire drop down section

// create components for drop1, drop2, drop3
function DropButton1() {

  const [isHighlighted, setHighlighted] = useState(false);
  const [isShown, setShown] = useState(false);

  return (

    <div className="dropDown1">
      <div className="area1">
        <img className="personalIcon" src={personalIcon}/>
        <div className="personalDetails">Personal</div>

        {isHighlighted ? ( 
        <img className="drop1" onMouseEnter={() => setHighlighted(true)} onMouseLeave={() => setHighlighted(false)} style={{ border: "2px solid lightblue" }} src={dropIconDown} />
        ) : (
        <img className="drop1" onMouseEnter={() => setHighlighted(true)} onMouseLeave={() => setHighlighted(false)} style={{ color: "none" }} src={dropIconDown} />
        )
        }

        {/* Div should generate here to show panel with parameters to be edited for personal section of resume */}

      </div>
    </div>
            
  ); 
}

function DropButton2() {

  const [isHighlighted, setHighlighted] = useState(false);
  const [isShown, setShown] = useState(false);


  return (
    <div className="dropDown2">
      <div className="area2">
        <img className="educationIcon" src={bookIcon}/>
        <div className="educationDetails">Education</div>

        {isHighlighted ? ( 
        <img className="drop1" onMouseEnter={() => setHighlighted(true)} onMouseLeave={() => setHighlighted(false)} style={{ border: "2px solid lightblue" }} src={dropIconDown} />
        ) : (
        <img className="drop1" onMouseEnter={() => setHighlighted(true)} onMouseLeave={() => setHighlighted(false)} style={{ color: "none" }} src={dropIconDown} />
        )
        }

      </div>
    </div>
  ); 
}

function DropButton3() {

  const [isHighlighted, setHighlighted] = useState(false);
  const [isShown, setShown] = useState(false);

  return (
    <div className="dropDown3">
      <div className="area3">
        <img className="experienceIcon" src={bagIcon}/>
        <div className="experienceDetails">Experience</div>
        {isHighlighted ? ( 
        <img className="drop1" onMouseEnter={() => setHighlighted(true)} onMouseLeave={() => setHighlighted(false)} style={{ border: "2px solid lightblue" }} src={dropIconDown} />
        ) : (
        <img className="drop1" onMouseEnter={() => setHighlighted(true)} onMouseLeave={() => setHighlighted(false)} style={{ color: "none" }} src={dropIconDown} />
        )
        }
      </div>
    </div>
  ); 
}


// <Button text="Click Me!" color="blue" fontSize={12} /> 

function MainSection() {


  let buttonNames = ['Personal', 'Education', 'Experience'];


    return <>
    <div className="sideBar">
      <div className="logoSec">
        <div className="logoArea">
          <div className="appName">
            CV
            <br />
            Generator v1.0
            <br />
          </div>
          <img className="logo" src={mainIcon}/>
        </div>
      </div>
      <div className="dropDownSec">

        {/* Closest common parent of each dropDown button - will determine onClick(onShow) state */}
        


        {/* React Component #1 */}
        <DropButton1 />

        {/* React Component #2 */}
        <DropButton2 />

        {/* React Component #3 */}
        <DropButton3 />

      </div>

      <div id="selectionSec">
        {/* React Component #4 */}
        <div id="formatOptions">
          <div className="area4">
            <div className="loadExampleBox">
              <div className="exampleLogo" />
              <div className="exampleName">Load Example</div>
            </div>
            <div className="downloadBox">
              <div className="downloadLogo" />
              <div className="downloadName">Download (.pdf)</div>
            </div>
          </div>
        </div>
      </div>
      <div id="footerSec">
        <div id="footerArea">
          <a href=''><div className="footName">@rsterenchak</div></a>
          <img className="footLogo" src={gitIcon} alt={'github icon link'}></img>
        </div>
      </div>
    </div>
    <div className="mainSection">
      <div className="leftSpace" />
      <div className="resumeSec">
        {" "}
        {/* use min/max width to scale better*/}
        <div className="topRes">
          <div className="topSpace1" />
          <div className="topInfo">
            <div className="name">
              <div className="fullName">Robert Sterenchak</div>
            </div>
            <div className="contact">
              <div className="email">email</div>
              <div className="phone">phone</div>
              <div className="location">location</div>
            </div>
          </div>
          <div className="topSpace2" />
        </div>
        <div className="bottomRes">
          <div className="bottomSpace1" />
          <div className="bottomInfo">
            <div className="bottomSec1">
              <div className="edHeader">Education</div>
              <div className="dateColumn1" />
              <div className="infoColumn1" />
            </div>
            <div className="bottomSec2">
              <div className="prHeader">Professional Experience</div>
              <div className="dateColumn2" />
              <div className="infoColumn2" />
            </div>
            <div className="bottomSpace2" />
          </div>
        </div>
      </div>
      <div className="rightSpace" />
    </div>
  </>;
  }

  export default MainSection;