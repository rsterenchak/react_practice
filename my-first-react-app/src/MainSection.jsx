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

import loadIcon from './assets/refresh-outline.svg'
import downloadIcon from './assets/download-outline.svg'

import mailIcon from './assets/mail.svg'
import phoneIcon from './assets/call.svg'
import locationIcon from './assets/location.svg'

import { personalDetails } from './personalDetails.js';


/* 
    const personal = {
      name: '',
      email:  '',
      phone:  '',
      address:  ''
    }; */

// create components for drop1, drop2, drop3
function DropButton1({
  isActive,
  onShow, 
  isName,
  isEmail,
  isPhone,
  isAddress,
  changeName,
  changeEmail,
  changePhone,
  changeAddress
  
}) {


    const [isHighlighted, setHighlighted] = useState(false);

    // const [isName, setName] = useState(''); // lift Up to mainSection
    // const [isEmail, setEmail] = useState(''); // lift Up to mainSection
    // const [isPhone, setPhone] = useState(''); // lift Up to mainSection
    // const [isAddress, setAddress] = useState(''); // lift Up to mainSection

    

/*     const setNameValue = (event) => {
      if (event.key == "Enter"){
        personal.name = event.target.value;
        console.log(personal.name);
      }
    } */
    // Create personal object
    // const currentPersonal = personalDetails(nam, emai, phon, add);



  return (

    <div className="dropDown1">
      <div className="area1">
        <img className="personalIcon" src={personalIcon}/>
        <div className="personalDetails">Personal</div>

        {isHighlighted ? ( 
        <img className="drop1"
          onClick={onShow} 
          onMouseEnter={() => setHighlighted(true)} 
          onMouseLeave={() => setHighlighted(false)} 
          style={{ border: "2px solid lightblue", cursor: 'pointer' }} 
          src={dropIconDown} 
        />
        ) : (
        <img 
          onClick={onShow}  
          className="drop1" 
          onMouseEnter={() => setHighlighted(true)} 
          onMouseLeave={() => setHighlighted(false)} 
          style={{ color: "none" }} 
          src={dropIconDown} 
        />
        )
        }
      </div>
      
      {isActive ? (
      <div className='formPersonal'>

        <p className='formName'>Name:</p>
        <input
          onChange={changeName} 
          className='nameInput' 
          type='text'
          value={isName}
        >
          </input>
      
        <p className='formEmail'>Email:</p>
        <input 
          onChange={changeEmail}
          className='emailInput' 
          type='text'
          value={isEmail}
        >
        </input>
      
        <p className='formPhone'>Phone #:</p>
        <input
          onChange={changePhone} 
          className='phoneInput' 
          type='text'
          value={isPhone}
        >
        </input>
      
        <p className='formAddress'>Address:</p>
        <input
          onChange={changeAddress} 
          className='addressInput' 
          type='text'
          value={isAddress}
        >
        </input>
      
      </div>) : (<div></div>)}
      {/* Div should generate here to show panel with parameters to be edited for personal section of resume */}

    </div>
            
  ); 
}

function DropButton2({
  isActive,
  onShow
}) {

  // Create array that will be meant to hold Education objects
  // values for object - (School, Degree, StartDate, EndDate, Location)
  const educationList = [{
    id: 0,
    title: 'Item 1',
    School: '',
    Degree: 'Item 1',
    StartDate: '',
    EndDate: '',
    Location: '',
  },
  {
    id: 1,
    title: 'Item 2',
    School: '',
    Degree: 'Item 2',
    StartDate: '',
    EndDate: '',
    Location: '',
  }];
  
  const [activeMenu, setActiveMenu] = useState(0); 

  const [isClickable, setClickable] = useState(true);

  const [isHighlighted, setHighlighted] = useState(false);
  const [isButtonHighlighted, setButtonHighlighted] = useState(false);
  
  const [isEducationList, setEducationList] = useState(educationList);

  const [isSelectedEducationId, setSelectedEducationId] = useState(0);

  function setupEditMenu(itemKey){

    setActiveMenu(1)
    setSelectedEducationId(itemKey);


  }

  const listItems = isEducationList.map(item => 

    <EducationElement 
    item={item}
    key={item.id}
    isMenu={activeMenu === 1}
    onShowEdit={() => 
      setupEditMenu(item.id)
    } 
    />
    
    );

  {/** try creating custom function for onShowEdit*/}
  
  const clickabilityStyling = {
    backgroundColor: isButtonHighlighted ? "lightblue" : "white", 
    cursor: 'pointer',
    pointerEvents: isClickable ? 'auto' : 'none' 
      
  }  

  {/* Check educationList last element to see if School property is not equal to ('') */}
  function checkItem(){

    console.log('Runs checkItem');
    
    let lastItem = isEducationList.length - 1;

    console.log(isEducationList[lastItem].School);

    if((isEducationList[lastItem].School) === ''){

      setClickable(false);

    }
    else {

      setClickable(true);

    }

  }

  function addItem(){
    console.log('Runs addItem');

    let newItem = {
      id: isEducationList.length,
      title: 'Item ' + (isEducationList.length + 1),
      School: '',
      Degree: '',
      StartDate: '',
      EndDate: '',
      Location: '',
    }

    isEducationList.push(newItem); // sets new item to array
  
    setEducationList(isEducationList); // set new item to state -> DOM 
    // setButtonHighlighted(false);
    
    checkItem(); // Determines '+' button clickability using isClickable


  }

 // ***** Next -> Create component for edit menu section *****

  return (
    <div className="dropDown2">
      <div className="area2">
        <img className="educationIcon" src={bookIcon}/>
        <div className="educationDetails">Education</div>

        {isHighlighted ? ( 
        <img 
          onClick={onShow}
          className="drop1" 
          onMouseEnter={() => setHighlighted(true)} 
          onMouseLeave={() => setHighlighted(false)} 
          style={{ border: "2px solid lightblue", cursor: 'pointer' }} 
          src={dropIconDown} 
        />
        ) : (
        <img onClick={onShow} className="drop1" onMouseEnter={() => setHighlighted(true)} onMouseLeave={() => setHighlighted(false)} style={{ color: "none" }} src={dropIconDown} />
        )
        }

      </div>

      {activeMenu === 0 && isActive ? (
      <div className='educationList'>
        
        <ul>

          {listItems}
        
        </ul>
        
      {/** Disable buttons ability to highlight with state, checks bottom ul element */}



      {isButtonHighlighted ? ( 

        <div 
          onClick={addItem}
          className='addEducation'
          onMouseEnter={() => setButtonHighlighted(true)} 
          onMouseLeave={() => setButtonHighlighted(false)} 
          style={clickabilityStyling}        
        >+
        </div>
        
        ) : (
      
        <div 
          onClick={addItem}
          className='addEducation'
          onMouseEnter={() => setButtonHighlighted(true)} 
          onMouseLeave={() => setButtonHighlighted(false)} 
          style={clickabilityStyling}        
        >+
        </div>
      )}
        
      


        </div>
        ) : (<div></div>)}

      {activeMenu === 1 && isActive ? (
      
        <EducationEditMenu 
          sendKey={isSelectedEducationId} 
          isMenu={activeMenu === 0}
          onShowEdit={() => setActiveMenu(0)}
          educationList={isEducationList}
        /> 
      
      ) : (
      
        <div></div>
      
      )}

        </div>        
      ); 



}


{/** Try lowering states for isItemHighlighted into individual components, containing independent states */}
function EducationElement({
  item,
  isMenu,
  onShowEdit,
  sendKey
}) {

  const [isItemHighlighted, setItemHighlighted] = useState(false);

  const myStyle = {
    border: isItemHighlighted ? '1px solid red' : '1px solid blue'
    
  }
  
  {/** isActive tracks regular div, isEdit will track edit component rendering*/}
  {/** On clicking an <li>, set isEdit state to equal 1(EditMenu) instead of 0(MainMenu)  */}


return(

  <li 
    onClick={onShowEdit}
    onMouseEnter={() => setItemHighlighted(true)} 
    onMouseLeave={() => setItemHighlighted(false)} 
    className='educationItem' 
    key={item.id} 
    style={myStyle}
  >
    {item.title}
  </li>

);

}

function EducationEditMenu({
  item,
  isMenu,
  onShowEdit,
  sendKey,
  educationList
}){

  const filteredItemSchool = educationList.filter(education => education.id === sendKey).map(filteredEducation => 
    filteredEducation.School
  );  

  const filteredItemDegree = educationList.filter(education => education.id === sendKey).map(filteredEducation => 
    filteredEducation.Degree
  );

  const filteredItemStart = educationList.filter(education => education.id === sendKey).map(filteredEducation => 
    filteredEducation.StartDate
  );  

  const filteredItemFinished = educationList.filter(education => education.id === sendKey).map(filteredEducation => 
    filteredEducation.EndDate
  );  

  const filteredItemLocation = educationList.filter(education => education.id === sendKey).map(filteredEducation => 
    filteredEducation.Location
  );  


  const [isSubmitHovered, setSubmitHovered] = useState(false);
  const [isCancelHovered, setCancelHovered] = useState(false); 

  const [isSchool, setSchool] = useState(filteredItemSchool);
  const [isDegree, setDegree] = useState(filteredItemDegree);
  const [isStart, setStart] = useState(filteredItemStart);
  const [isFinished, setFinished] = useState(filteredItemFinished);
  const [isLocation, setLocation] = useState(filteredItemLocation);

  // Run Validation function, based on validation also update the educationList using states
  // 12/18/2023 - Last worked on function, setting degree in isEducation is working,
  // isEducation is set when calling this (component) within (DropButton2)
  function handleListUpdate(){

    educationList[sendKey].Degree = isDegree; // setting is working!!!

    console.log(educationList[sendKey]);
  }

  function handleValidation() {

    handleListUpdate();

  }




  function handleSchoolChange (e){
    setSchool(e.target.value);
  }

  function handleDegreeChange (e){
    setDegree(e.target.value);
  }  

  function handleStartChange (e){
    setStart(e.target.value);
  } 

  function handleEndChange (e){
    setFinished(e.target.value);
  } 

  function handleLocationChange (e){
    setLocation(e.target.value);
  } 


  const submitStylings = {
    
    backgroundColor: isSubmitHovered ? '#86c5da' : '#c1e1ec',
    cursor: 'pointer'

  }

  const cancelStylings = {

    backgroundColor: isCancelHovered ? '#64e764' : 'lightgreen',
    cursor: 'pointer'

  }

  return(
    <>
      <div className='formEducation'>

        <p className='formSchool'>School:</p>
        <input
          onChange={handleSchoolChange}
          className='schoolInput' 
          type='text'
          value={isSchool}
        >
        </input>

        <p className='formDegree'>Degree:</p>
        <input
          onChange={handleDegreeChange}
          className='degreeInput' 
          type='text'
          value={isDegree}
        >
          </input>

        <p className='formStartDate'>Start:</p>
        <input 
          onChange={handleStartChange}
          className='startDateInput' 
          type='date'
          value={isStart}
        >
        </input>

        <p className='formEndDate'>Finished:</p>
        <input 
          onChange={handleEndChange}
          className='endDateInput' 
          type='date'
          value={isFinished}
        >
        </input>

        <p className='formLocation'>Location:</p>
        <input 
          onChange={handleLocationChange}
          className='locationInput' 
          type='text'
          value={isLocation}
        >
        </input>
      </div>

      <div className='formEducationControl'>

        <div 
          onClick={handleListUpdate} // Perform Validation
          className='formEducationSubmit'
          onMouseEnter={() => setSubmitHovered(true)}
          onMouseLeave={() => setSubmitHovered(false)}
          style={submitStylings}
        >
          Submit
        
        </div>
        <div 
          onClick={onShowEdit}
          className='formEducationCancel'
          onMouseEnter={() => setCancelHovered(true)}
          onMouseLeave={() => setCancelHovered(false)}
          style={cancelStylings}
        >
          Cancel
        
        </div>

      </div>

    </>
  );

}

function DropButton3({
  isActive,
  onShow
}) {

  const [isHighlighted, setHighlighted] = useState(false);

  return (
    <div className="dropDown3">
      <div className="area3">
        <img className="experienceIcon" src={bagIcon}/>
        <div className="experienceDetails">Experience</div>
        {isHighlighted ? ( 
        <img
          onClick={onShow} 
          className="drop1" 
          onMouseEnter={() => setHighlighted(true)} 
          onMouseLeave={() => setHighlighted(false)} 
          style={{ border: "2px solid lightblue", cursor: 'pointer' }} 
          src={dropIconDown} 
        />
        ) : (
        <img onClick={onShow} className="drop1" onMouseEnter={() => setHighlighted(true)} onMouseLeave={() => setHighlighted(false)} style={{ color: "none" }} src={dropIconDown} />
        )
        }
      </div>

      {isActive ? (<div>Div</div>) : (<div></div>)}

    </div>
  ); 
}

function LoadButton(){

  const [isHovered, setHovered] = useState(false);
  const [isMouse, setMouseClick] = useState(false); // setup another state for click down/up

  const boxStyle = {
    boxShadow: isHovered ? isMouse ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.4)' : "none",
    backgroundColor: isMouse ? '#c40000' : '#ff6262',
    cursor: 'pointer'
    
  }

  const [isShown, setShown] = useState(false);

  return (

    
    <div className="loadExampleBox" 
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}

      onMouseDown={() => setMouseClick(true)} 
      onMouseUp={() => setMouseClick(false)}

      style={boxStyle}>
      <img className="exampleLogo" src={loadIcon}/>
      <div className="exampleName">Load Example</div>
    </div>

  ); 


}

function DownloadButton(){

  const [isHovered, setHovered] = useState(false);
  const [isMouse, setMouseClick] = useState(false); // setup another state for click down/up

  const boxStyle = {
    boxShadow: isHovered ? isMouse ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.4)' : "none",
    backgroundColor: isMouse ? '#c40000' : '#ff6262',
    cursor: 'pointer'
    
  }

  const [isShown, setShown] = useState(false);

  return (

    
    <div className="downloadBox"
    onMouseEnter={() => setHovered(true)} 
    onMouseLeave={() => setHovered(false)}

    onMouseDown={() => setMouseClick(true)} 
    onMouseUp={() => setMouseClick(false)}

    style={boxStyle}>
      <img className="downloadLogo" src={downloadIcon}/>
      <div className="downloadName">Download (.pdf)</div>
    </div>

  ); 


}

// <Button text="Click Me!" color="blue" fontSize={12} /> 

function MainSection() {

  // Set up state for dropDown menu components
  const [activeIndex, setActiveIndex] = useState(0);

  const [activeName, setActiveName] = useState('');
  const [activeEmail, setActiveEmail] = useState('');
  const [activePhone, setActivePhone] = useState('');
  const [activeAddress, setActiveAddress] = useState('');



  let buttonNames = ['Personal', 'Education', 'Experience'];
  
  function handleNameChange (e){
    setActiveName(e.target.value);
  }

  function handleEmailChange (e){
    setActiveEmail(e.target.value);
  }

  function handlePhoneChange (e){
    setActivePhone(e.target.value);
  }
  
  function handleAddressChange (e){
    setActiveAddress(e.target.value);
  }  

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
        <DropButton1 
          changeName={handleNameChange}
          changeEmail={handleEmailChange}
          changePhone={handlePhoneChange}
          changeAddress={handleAddressChange}
          isActive={activeIndex === 0}
          onShow={() => setActiveIndex(0)}
          isName={activeName}
          isEmail={activeEmail}
          isPhone={activePhone}
          isAddress={activeAddress}
        />

        {/* React Component #2 */}
        <DropButton2 
          isActive={activeIndex === 1}
          onShow={() => setActiveIndex(1)} 
        />

        {/* React Component #3 */}
        <DropButton3 
          isActive={activeIndex === 2}
          onShow={() => setActiveIndex(2)}        
        />

      </div>

      <div id="selectionSec">
        {/* React Component #4 */}
        <div id="formatOptions">
          <div className="area4">

            <LoadButton />
            
            <DownloadButton />

          </div>
        </div>
      </div>
      <div id="footerSec">
        <div id="footerArea">
          <div className="footName">@rsterenchak</div>
          <a href='https://github.com/rsterenchak' target="_blank"><img className="footLogo" src={gitIcon} alt={'github icon link'}></img></a>
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
              <div className="fullName">{activeName}</div>
            </div>
            <div className="contact">
              <div className="email"><img src={mailIcon}/>{activeEmail}</div>
              <div className="phone"><img src={phoneIcon}/>{activePhone}</div>
              <div className="location"><img src={locationIcon}/>{activeAddress}</div>
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