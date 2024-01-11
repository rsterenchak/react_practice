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
  onShow,
  isEducationList,
  setEducationList,
  isClickable,
  checkClickable,
  isEdSwitch
}) {

  const [activeMenu, setActiveMenu] = useState(0); 

  const [isHighlighted, setHighlighted] = useState(false);
  const [isButtonHighlighted, setButtonHighlighted] = useState(false);

  const [isSelectedEducationId, setSelectedEducationId] = useState(0);

  function setupEditMenu(itemKey){

    setActiveMenu(1)
    setSelectedEducationId(itemKey);
    isEdSwitch(false)

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


  function addItem(){
    console.log('Runs addItem');

    let newEducationList = isEducationList;

    let newItem = {
      id: isEducationList.length,
      title: 'Item ' + (isEducationList.length + 1),
      School: '',
      Degree: '',
      StartDate: '',
      EndDate: '',
      Location: '',
    }

    // isEducationList.push(newItem); // sets new item to array
  
    newEducationList.push(newItem); // sets new item to array

    setEducationList(newEducationList) // set new item to state -> DOM 
    
    checkClickable(); // Determines '+' button clickability using isClickable


  }


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
          onShowEdit={() => 
            setActiveMenu(0)
          }
          educationList={isEducationList}
          setupEducationList={setEducationList}
          runCheck ={() => checkClickable()}
          setEdOn={isEdSwitch}
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


{/** Currently working on elements to be added to middle section when array is populated */}
function EducationNameElement({
  item,
  activeEducation,
  isEdSection
}) {

  const myStyle = {
    
  }

return(

  <div 
    className='educationName' 
    style={myStyle}
  >

  {isEdSection ? (

    <>

    <div className='educationSchool'>{item.School}</div>
    <div className='educationDegree'>{item.Degree}</div>

    </>

  ) : (

    <>

    <div className='educationSchool'>{item.School}</div>
    <div className='educationDegree'>{item.Degree}</div>
    
    </>

  )}

  </div>

);

}

function EducationDateElement({
  item
}) {

  const myStyle = {
    
  }

return(

  <div 
    className='educationDate' 
    style={myStyle}
  >

    {item.StartDate}
    {item.EndDate}


  </div>

);

}

  

function EducationEditMenu({
  onShowEdit,
  sendKey,
  educationList, // activeEducation -> isEducationList -> educationList
  runCheck,
  setupEducationList,
  setEdOn
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
  const [isDeleteHovered, setDeleteHovered] = useState(false); 

  const [isSchoolInput, setSchoolInput] = useState(false);
  const [isDegreeInput, setDegreeInput] = useState(false);

  const [isSchool, setSchool] = useState(filteredItemSchool);
  const [isDegree, setDegree] = useState(filteredItemDegree);
  const [isStart, setStart] = useState(filteredItemStart);
  const [isFinished, setFinished] = useState(filteredItemFinished);
  const [isLocation, setLocation] = useState(filteredItemLocation);

  let schoolType = typeof isSchool;
  let degreeType = typeof isDegree;


  function handleListUpdate(){

    if(handleValidation() === true){

    }

    else{

      educationList[sendKey].School = isSchool;
      educationList[sendKey].title = isDegree;
      educationList[sendKey].Degree = isDegree;
      educationList[sendKey].StartDate = isStart;
      educationList[sendKey].EndDate = isFinished;    
 
      console.log(educationList[sendKey]);


      // console.log(educationList);

      onShowEdit(); // turn off edit menu

      runCheck(); // allows clickability for adding new education

      setEdOn(true); // turns Education section information back on
    }

    // console.log(educationList[sendKey]);
  }

  function handleValidation(){

    let schoolValidation = false
    let degreeValidation = false

    // if school is string
    if(schoolType === 'string'){

      console.log('isSchool is string')

      if(isSchool.length > 0){

        schoolValidation = true
        setSchoolInput(false)

      }
      else{

        schoolValidation = false
        setSchoolInput(true)

      }

    }

    // else school is object
    else{

      console.log('isSchool is object')
      
      if(isSchool[0].length > 0){

        schoolValidation = true
        setSchoolInput(false)
      }
      else{

        schoolValidation = false
        setSchoolInput(true)
        

      }

    }

    // if degree is string
    if(degreeType === 'string'){

      console.log('isDegree is string')
      if(isDegree.length > 0){

        degreeValidation = true
        setDegreeInput(false)
      }
      else{

        degreeValidation = false
        setDegreeInput(true)

      }      

    }

    // else degree is object
    else{

      console.log('isDegree is object')
      if(isDegree[0].length > 0){

        degreeValidation = true
        setDegreeInput(false)
      }
      else{

        degreeValidation = false
        setDegreeInput(true)

      }      

    }


    // Complete check for returning false or true to handleListUpdate()
    if((schoolValidation && degreeValidation) === true){

      return false

    }

    else{

      return true

    }



  }

  function handleCancel(){

    onShowEdit();
    setEdOn(true);

  }

  function handleDelete(){
    
    onShowEdit();
    setEdOn(true);

  }


  function handleSchoolChange (a){
    
    setSchool(a.target.value);
  }

  function handleDegreeChange (e){
    setDegree(e.target.value);
  }  

  function handleStartChange (b){
    setStart(b.target.value);
  } 

  function handleEndChange (c){
    setFinished(c.target.value);
  } 

  function handleLocationChange (d){
    setLocation(d.target.value);
  } 


  const submitStylings = {
    
    backgroundColor: isSubmitHovered ? '#86c5da' : '#c1e1ec',
    cursor: 'pointer'

  }

  const cancelStylings = {

    backgroundColor: isCancelHovered ? '#64e764' : 'lightgreen',
    cursor: 'pointer'

  }

  const deleteStylings = {

    backgroundColor: isDeleteHovered ? '#f73b26' : '#f97566',
    cursor: 'pointer'

  }

  const schoolInputStylings = {
    border: isSchoolInput ? '1px solid red' : '1px solid black'

  }

  const degreeInputStylings = {
    border: isDegreeInput ? '1px solid red' : '1px solid black'

  }

  return(
    <>
      <div className='formEducation'>

        <p className='formSchool'>School:</p>
        <input
          onChange={handleSchoolChange}
          className='schoolInput' 
          type='text'
          value={isSchool} // value should be taken from educationList initially, then allowed to change from isSchool
          style={schoolInputStylings}
        >
        </input>

        <p className='formDegree'>Degree:</p>
        <input
          onChange={handleDegreeChange}
          className='degreeInput' 
          type='text'
          value={isDegree}
          style={degreeInputStylings}
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
          onClick={handleCancel}
          className='formEducationCancel'
          onMouseEnter={() => setCancelHovered(true)}
          onMouseLeave={() => setCancelHovered(false)}
          style={cancelStylings}
        >
          Cancel
        
        </div>

        <div 
          onClick={handleDelete}
          className='formEducationDelete'
          onMouseEnter={() => setDeleteHovered(true)}
          onMouseLeave={() => setDeleteHovered(false)}
          style={deleteStylings}
        >
          Delete
        
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


function MainSection() {

  // Set up state for dropDown menu components
  const [activeIndex, setActiveIndex] = useState(0);

  const [activeName, setActiveName] = useState('');
  const [activeEmail, setActiveEmail] = useState('');
  const [activePhone, setActivePhone] = useState('');
  const [activeAddress, setActiveAddress] = useState('');


  let buttonNames = ['Personal', 'Education', 'Experience'];
  

  // Create array that will be meant to hold Education objects
  // values for object - (School, Degree, StartDate, EndDate, Location)
  const educationList = [];

  const [activeEducation, setActiveEducation] = useState(educationList);
  const [activeEdClickable, setEdClickable] = useState(true);

  const [activeEdSection, setActiveEdSection] = useState(true); // responsible for turning off/on Education Info

  // mapped array within Main -> EducationNameElement -> 
  let listEducationInfo = activeEducation.map(item => 

    <EducationNameElement 
      item={item}
      key={item.id}
      isEdSection={activeEdSection}
      activeEducation
    />
    );



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


  {/* Check educationList last element to see if School property is not equal to ('') */}
  function checkItem(){

    console.log('Runs checkItem');
    
    let lastItem = activeEducation.length - 1;

    // console.log(typeof activeEducation[lastItem].School);

    if(activeEducation.length > 0){

      if((activeEducation[lastItem].School) === ''){

        setEdClickable(false);

      }
      else {

        setEdClickable(true);

      }
    }
    else{

      setEdClickable(true);

    }

  }

  function cleanEducationList(){

    let newArray = []

    // console.log(activeEducation)

    let counter = activeEducation.length - 1;

    if(activeEducation.length > 0){

      while(counter > -1){

        if(activeEducation[counter].Degree != ''){

          
          newArray.push(activeEducation[counter])
          console.log(newArray);

        }

        counter--;
      }

    }

    setActiveEducation(newArray)
  }

  function cleanExperienceList(){


  }

  function cleanupForDrop1(){

    console.log('run cleanup for Dropdown 1');

    setActiveIndex(0);

    checkItem();

    if(activeEdClickable === false){

      // cleanup isEducationList - *** Needs fix to enable same sorting everytime (1/8/2024) ***
      cleanEducationList();
      
      
      // cleanup isExperienceList 

    }
  }

  function cleanupForDrop2(){

    setActiveIndex(1)

    checkItem();


    // cleanup isExperienceList

  }

  function cleanupForDrop3(){

    setActiveIndex(2)

    checkItem();

    if(activeEdClickable === false){

      // cleanup isEducationList - *** Needs fix to enable same sorting everytime (1/8/2024) ***
      cleanEducationList();
      
    }
  }



    // make function to be passed to DropButton2 -> EducationEditMenu -> tie to Submit button click


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
          onShow={cleanupForDrop1}
          isName={activeName}
          isEmail={activeEmail}
          isPhone={activePhone}
          isAddress={activeAddress}
        />

        {/* React Component #2 */}
        <DropButton2 
          isActive={activeIndex === 1}
          onShow={cleanupForDrop2} 
          isEducationList={activeEducation}
          setEducationList={() => setActiveEducation(activeEducation)}
          isClickable={activeEdClickable}
          checkClickable={() => checkItem()}
          isEdSwitch={setActiveEdSection}

        />

        {/* React Component #3 */}
        <DropButton3 
          isActive={activeIndex === 2}
          onShow={cleanupForDrop3}        
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
              <div className="dateColumn1">



              </div>
              <div className="infoColumn1">

                {listEducationInfo}

              </div>
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



// IDEAS for Issues
// - (SOLVED) try forcing re-render upon submit button click
//   function needs to turn off/on EducationNameElement, 
//   turn off when edit menu is on and turn on when edit menu is off
//
// 
//
//
   


  // Old - EducationEditMenu Component
  /* 
function EducationEditMenu({
  onShowEdit,
  sendKey,
  educationList, 
  runCheck,
  setupEducationList
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

  const [isSchoolInput, setSchoolInput] = useState(false);
  const [isDegreeInput, setDegreeInput] = useState(false);

  const [isSchool, setSchool] = useState(filteredItemSchool);
  const [isDegree, setDegree] = useState(filteredItemDegree);
  const [isStart, setStart] = useState(filteredItemStart);
  const [isFinished, setFinished] = useState(filteredItemFinished);
  const [isLocation, setLocation] = useState(filteredItemLocation);

  let schoolType = typeof isSchool;
  let degreeType = typeof isDegree;


  function handleListUpdate(){

    if(handleValidation() === true){

    }

    else{

      educationList[sendKey].School = isSchool;
      educationList[sendKey].title = isDegree;
      educationList[sendKey].Degree = isDegree;
      educationList[sendKey].StartDate = isStart;
      educationList[sendKey].EndDate = isFinished;    
 
      console.log(educationList[sendKey]);


      // console.log(educationList);

      onShowEdit(); // turn off edit menu

      runCheck(); // allows clickability for adding new education
    }

    // console.log(educationList[sendKey]);
  }

  function handleValidation(){

    let schoolValidation = false
    let degreeValidation = false

    // if school is string
    if(schoolType === 'string'){

      console.log('isSchool is string')

      if(isSchool.length > 0){

        schoolValidation = true
        setSchoolInput(false)

      }
      else{

        schoolValidation = false
        setSchoolInput(true)

      }

    }

    // else school is object
    else{

      console.log('isSchool is object')
      
      if(isSchool[0].length > 0){

        schoolValidation = true
        setSchoolInput(false)
      }
      else{

        schoolValidation = false
        setSchoolInput(true)
        

      }

    }

    // if degree is string
    if(degreeType === 'string'){

      console.log('isDegree is string')
      if(isDegree.length > 0){

        degreeValidation = true
        setDegreeInput(false)
      }
      else{

        degreeValidation = false
        setDegreeInput(true)

      }      

    }

    // else degree is object
    else{

      console.log('isDegree is object')
      if(isDegree[0].length > 0){

        degreeValidation = true
        setDegreeInput(false)
      }
      else{

        degreeValidation = false
        setDegreeInput(true)

      }      

    }


    // Complete check for returning false or true to handleListUpdate()
    if((schoolValidation && degreeValidation) === true){

      return false

    }

    else{

      return true

    }



  }


  function handleSchoolChange (a){
    
    setSchool(a.target.value);
  }

  function handleDegreeChange (e){
    setDegree(e.target.value);
  }  

  function handleStartChange (b){
    setStart(b.target.value);
  } 

  function handleEndChange (c){
    setFinished(c.target.value);
  } 

  function handleLocationChange (d){
    setLocation(d.target.value);
  } 


  const submitStylings = {
    
    backgroundColor: isSubmitHovered ? '#86c5da' : '#c1e1ec',
    cursor: 'pointer'

  }

  const cancelStylings = {

    backgroundColor: isCancelHovered ? '#64e764' : 'lightgreen',
    cursor: 'pointer'

  }

  const schoolInputStylings = {
    border: isSchoolInput ? '1px solid red' : '1px solid black'

  }

  const degreeInputStylings = {
    border: isDegreeInput ? '1px solid red' : '1px solid black'

  }

  return(
    <>
      <div className='formEducation'>

        <p className='formSchool'>School:</p>
        <input
          onChange={handleSchoolChange}
          className='schoolInput' 
          type='text'
          value={isSchool} // value should be taken from educationList initially, then allowed to change from isSchool
          style={schoolInputStylings}
        >
        </input>

        <p className='formDegree'>Degree:</p>
        <input
          onChange={handleDegreeChange}
          className='degreeInput' 
          type='text'
          value={isDegree}
          style={degreeInputStylings}
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
 */