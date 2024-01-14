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
import trashIcon from './assets/trash-outline.svg'

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
  isEdSwitch,
  updateEdList
}) {



  const [activeMenu, setActiveMenu] = useState(0); 

  const [isHighlighted, setHighlighted] = useState(false);
  const [isButtonHighlighted, setButtonHighlighted] = useState(false);

  const [isSelectedEducationId, setSelectedEducationId] = useState(0);

  const [currentList, setList] = useState(isEducationList);


  function setupEditMenu(itemKey){

    setActiveMenu(1)
    setSelectedEducationId(itemKey);
    isEdSwitch(false)
    
    // setList(isEducationList) // works in getting rid of element!!

  }

  let listItems = currentList.map(item => 

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

    let newEducationList = currentList;

    let newItem = {
      id: Math.random(),
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
    
    checkClickable(newEducationList); // Determines '+' button clickability using isClickable

  }

  // shows items and updates state within component itself (currentList)
  function cleanItems(){
    onShow()
    setList(isEducationList)
    checkClickable()
  }

  function cleanAfterDelete(item){
    
    console.log('runs cleanAfterDelete');
    console.log(item);

    if(item === undefined){

      setList(isEducationList)
      // updateEdList(isEducationList)
    }
    else{

      setList(item)
      // updateEdList(item)
      // setEducationList(item) // async issue is not updating until after checkClickable()
    
    }

    checkClickable(item)
  }

  return (
    <div className="dropDown2">
      <div className="area2">
        <img className="educationIcon" src={bookIcon}/>
        <div className="educationDetails">Education</div>

        {isHighlighted ? ( 
        <img 
          onClick={cleanItems}
          className="drop1" 
          onMouseEnter={() => setHighlighted(true)} 
          onMouseLeave={() => setHighlighted(false)} 
          style={{ border: "2px solid lightblue", cursor: 'pointer' }} 
          src={dropIconDown} 
        />
        ) : (
        <img 
          onClick={cleanItems} 
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
          educationList={currentList}
          setupEducationList={setList}
          runCheck ={(item) => cleanAfterDelete(item)}
          setEdOn={isEdSwitch}
          updateMainState={updateEdList} // tied to dropDownButton 2 list
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
    border: isItemHighlighted ? '1px solid red' : '1px solid black'
    
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

{/** Try lowering states for isItemHighlighted into individual components, containing independent states */}
function ExperienceElement({
  item,
  isMenu,
  onShowEdit,
  sendKey
}) {

  const [isItemHighlighted, setItemHighlighted] = useState(false);

  const myStyle = {
    border: isItemHighlighted ? '1px solid red' : '1px solid black'
    
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

function ExperienceNameElement({
  item,
  activeEducation,
  isEdSection
}) {

  const myStyle = {
    
  }

return(

  <div 
    className='experienceName' 
    style={myStyle}
  >

  {isEdSection ? (

    <>

    <div className='educationSchool'>{item.Company}</div>
    <div className='educationDegree'>{item.Job}</div>
    <div className='educationDegree'>{item.Description}</div>

    </>

  ) : (

    <>

    <div className='educationSchool'>{item.Company}</div>
    <div className='educationDegree'>{item.Job}</div>
    <div className='educationDegree'>{item.Description}</div>
    
    </>

  )}

  </div>

);

}

function EducationDateElement({
  item,
  activeEducation,
  isEdSection
}) {

  const myStyle = {
    
  }

  let start = item.StartDate;
  let end = item.EndDate;


  let firstMonth = start.slice(5,7);
  let firstYear = start.slice(0,4);
  
  let secondMonth = end.slice(5,7);
  let secondYear = end.slice(0,4);
  
  let combinedFirst = firstMonth + '/' + firstYear;
  let combinedSecond = secondMonth + '/' + secondYear;



return(

  <div 
    className='educationDate' 
    style={myStyle}
  >

  {isEdSection ? (

    <>

      <div className='educationStart'>{combinedFirst} - {combinedSecond}</div>
      <div className='educationEnd'>{item.Location}</div>

    </>

  ) : (

    <>

      <div className='educationStart'>{combinedFirst} - {combinedSecond}</div>
      <div className='educationEnd'>{item.Location}</div>

    </>

  )}

  </div>

);

}

function ExperienceDateElement({
  item,
  activeEducation,
  isEdSection
}) {

  const myStyle = {
    
  }

  let start = item.StartDate;
  let end = item.EndDate;


  let firstMonth = start.slice(5,7);
  let firstYear = start.slice(0,4);
  
  let secondMonth = end.slice(5,7);
  let secondYear = end.slice(0,4);
  
  let combinedFirst = firstMonth + '/' + firstYear;
  let combinedSecond = secondMonth + '/' + secondYear;




return(

  <div 
    className='experienceDate' 
    style={myStyle}
  >

  {isEdSection ? (

    <>

      <div className='educationStart'>{combinedFirst} - {combinedSecond}</div>
      <div className='educationEnd'>{item.Location}</div>

    </>

  ) : (

    <>

      <div className='educationStart'>{combinedFirst} - {combinedSecond}</div>
      <div className='educationEnd'>{item.Location}</div>

    </>

  )}

  </div>

);

}


function EducationEditMenu({
  onShowEdit,
  sendKey,
  educationList, // activeEducation -> isEducationList -> educationList
  runCheck,
  setupEducationList, // setList -> setupEducationList
  setEdOn,
  updateMainState
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

  const newEducationList = educationList.filter((education) => education.id !== sendKey); // list without element you are working with

  const newEducationListAdded = educationList.filter((education) => education.id === sendKey);

  const [isSubmitHovered, setSubmitHovered] = useState(false);
  const [isCancelHovered, setCancelHovered] = useState(false); 
  const [isDeleteHovered, setDeleteHovered] = useState(false); 

  const [isSchoolInput, setSchoolInput] = useState(false);
  const [isDegreeInput, setDegreeInput] = useState(false);
  const [isStartInput, setStartInput] = useState(false);
  const [isEndInput, setEndInput] = useState(false);
  const [isLocationInput, setLocationInput] = useState(false);

  const [isSchool, setSchool] = useState(filteredItemSchool);
  const [isDegree, setDegree] = useState(filteredItemDegree);
  const [isStart, setStart] = useState(filteredItemStart);
  const [isFinished, setFinished] = useState(filteredItemFinished);
  const [isLocation, setLocation] = useState(filteredItemLocation);

  

  let schoolType = typeof isSchool;
  let degreeType = typeof isDegree;

  let startType = typeof isStart;
  let endType = typeof isFinished;  

  let locationType = typeof isLocation;




  function handleListUpdate(){

    if(handleValidation() === true){

    }

    else{

      newEducationListAdded[0].School = isSchool;
      newEducationListAdded[0].title = isDegree;
      newEducationListAdded[0].Degree = isDegree;
      newEducationListAdded[0].StartDate = isStart;
      newEducationListAdded[0].EndDate = isFinished;
      newEducationListAdded[0].Location = isLocation;    
 

      newEducationList.push(newEducationListAdded);


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
    let startValidation = false
    let endValidation = false
    let locationValidation = false


    // if school is string
    if(schoolType === 'string'){

      // console.log('isSchool is string')

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

      // console.log('isSchool is object')
      
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

      // console.log('isDegree is string')
      
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

      // console.log('isDegree is object')
      if(isDegree[0].length > 0){

        degreeValidation = true
        setDegreeInput(false)
      }
      else{

        degreeValidation = false
        setDegreeInput(true)

      }      

    }

    // if start is string
    if(startType === 'string'){

      // console.log('isStart is string')
      if(isStart.length > 0){

        startValidation = true
        setStartInput(false)
      }
      else{

        startValidation = false
        setStartInput(true)

      }      

    }

    // else start is object
    else{

      // console.log('isStart is object')
      if(isStart[0].length > 0){

        startValidation = true
        setStartInput(false)
      }
      else{

        startValidation = false
        setStartInput(true)

      }      

    }

    // if end is string
    if(endType === 'string'){

      // console.log('isFinished is string')
      if(isFinished.length > 0){

        endValidation = true
        setEndInput(false)
      }
      else{

        endValidation = false
        setEndInput(true)

      }      

    }

    // else end is object
    else{

      // console.log('isFinished is object')
      if(isFinished[0].length > 0){

        endValidation = true
        setEndInput(false)
      }
      else{

        endValidation = false
        setEndInput(true)

      }      

    }

    // if location is string
    if(locationType === 'string'){

      // console.log('isLocation is string')
      if(isLocation.length > 0){

        locationValidation = true
        setLocationInput(false)
      }
      else{

        locationValidation = false
        setLocationInput(true)

      }      

    }

    // else location is object
    else{

      // console.log('isLocation is object')
      if(isLocation[0].length > 0){

        locationValidation = true
        setLocationInput(false)
      }
      else{

        locationValidation = false
        setLocationInput(true)

      }      

    }    



    // Complete check for returning false or true to handleListUpdate()
    if((schoolValidation && degreeValidation && startValidation && endValidation && locationValidation) === true){

      return false

    }

    else{

      return true

    }



  }

  function handleCancel(){

    onShowEdit();
    runCheck(educationList); // allows clickability for adding new education
    setEdOn(true);

  }

  function handleDelete(){
    
    educationList = newEducationList;

    const newList = educationList;
 
    setupEducationList(newList);
    updateMainState(newList);

    onShowEdit(); // turn off edit menu

    runCheck(newList); // allows clickability for adding new education
    
    setEdOn(true); // turns Education section information back on      

    
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

  const startInputStylings = {
    border: isStartInput ? '1px solid red' : '1px solid black'

  }  

  const endInputStylings = {
    border: isEndInput ? '1px solid red' : '1px solid black'

  }  

  const locationInputStylings ={
    border: isLocationInput ? '1px solid red' : '1px solid black'
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
          style={startInputStylings}
        >
        </input>

        <p className='formEndDate'>Finished:</p>
        <input 
          onChange={handleEndChange}
          className='endDateInput' 
          type='date'
          value={isFinished}
          style={endInputStylings}
        >
        </input>

        <p className='formLocation'>Location:</p>
        <input 
          onChange={handleLocationChange}
          className='locationInput' 
          type='text'
          value={isLocation}
          style={locationInputStylings}
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

function ExperienceEditMenu({
  onShowEdit,
  sendKey,
  educationList, // activeEducation -> isEducationList -> educationList
  runCheck,
  setupEducationList, // setList -> setupEducationList
  setEdOn,
  updateMainState
}){


  const filteredItemCompany = educationList.filter(education => education.id === sendKey).map(filteredEducation => 
    filteredEducation.Company
  );  

  const filteredItemJob = educationList.filter(education => education.id === sendKey).map(filteredEducation => 
    filteredEducation.Job
  );

  const filteredItemDescription = educationList.filter(education => education.id === sendKey).map(filteredEducation => 
    filteredEducation.Description
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

  const newEducationList = educationList.filter((education) => education.id !== sendKey); // list without element you are working with

  const newEducationListAdded = educationList.filter((education) => education.id === sendKey);

  const [isSubmitHovered, setSubmitHovered] = useState(false);
  const [isCancelHovered, setCancelHovered] = useState(false); 
  const [isDeleteHovered, setDeleteHovered] = useState(false); 

  const [isSchoolInput, setSchoolInput] = useState(false);
  const [isDegreeInput, setDegreeInput] = useState(false);
  const [isDescriptionInput, setDescriptionInput] = useState(false);
  const [isStartInput, setStartInput] = useState(false);
  const [isEndInput, setEndInput] = useState(false);
  const [isLocationInput, setLocationInput] = useState(false);

  const [isSchool, setSchool] = useState(filteredItemCompany);
  const [isDegree, setDegree] = useState(filteredItemJob);
  const [isDescription, setDescription] = useState(filteredItemDescription);
  const [isStart, setStart] = useState(filteredItemStart);
  const [isFinished, setFinished] = useState(filteredItemFinished);
  const [isLocation, setLocation] = useState(filteredItemLocation);

  

  let schoolType = typeof isSchool;
  let degreeType = typeof isDegree;
  let descriptionType = typeof isDescription;


  let startType = typeof isStart;
  let endType = typeof isFinished;  

  let locationType = typeof isLocation;

  function handleListUpdate(){

    if(handleValidation() === true){

    }

    else{

      // console.log(educationList);
      // console.log(sendKey);

      newEducationListAdded[0].Company = isSchool;
      newEducationListAdded[0].title = isDegree;
      newEducationListAdded[0].Job = isDegree;
      newEducationListAdded[0].Description = isDescription;
      newEducationListAdded[0].StartDate = isStart;
      newEducationListAdded[0].EndDate = isFinished;
      newEducationListAdded[0].Location = isLocation;    
 
      newEducationList.push(newEducationListAdded);


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
    let descriptionValidation = false
    let startValidation = false
    let endValidation = false
    let locationValidation = false


    // if school is string
    if(schoolType === 'string'){

      // console.log('isSchool is string')

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

      // console.log('isSchool is object')
      
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

      // console.log('isDegree is string')
      
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

      // console.log('isDegree is object')
      if(isDegree[0].length > 0){

        degreeValidation = true
        setDegreeInput(false)
      }
      else{

        degreeValidation = false
        setDegreeInput(true)

      }      

    }

    // if degree is string
    if(descriptionType === 'string'){

      // console.log('isDegree is string')
      
      if(isDescription.length > 0){

        descriptionValidation = true
        setDescriptionInput(false)
      }
      else{

        descriptionValidation = false
        setDescriptionInput(true)

      }      

    }

    // else degree is object
    else{

      // console.log('isDegree is object')
      if(isDescription[0].length > 0){

        descriptionValidation = true
        setDescriptionInput(false)
      }
      else{

        descriptionValidation = false
        setDescriptionInput(true)

      }      

    }


    // if start is string
    if(startType === 'string'){

      // console.log('isStart is string')
      if(isStart.length > 0){

        startValidation = true
        setStartInput(false)
      }
      else{

        startValidation = false
        setStartInput(true)

      }      

    }

    // else degree is object
    else{

      // console.log('isStart is object')
      if(isStart[0].length > 0){

        startValidation = true
        setStartInput(false)
      }
      else{

        startValidation = false
        setStartInput(true)

      }      

    }

    // if start is string
    if(endType === 'string'){

      // console.log('isFinished is string')
      if(isFinished.length > 0){

        endValidation = true
        setEndInput(false)
      }
      else{

        endValidation = false
        setEndInput(true)

      }      

    }

    // else degree is object
    else{

      // console.log('isFinished is object')
      if(isFinished[0].length > 0){

        endValidation = true
        setEndInput(false)
      }
      else{

        endValidation = false
        setEndInput(true)

      }      

    }

    // if start is string
    if(locationType === 'string'){

      // console.log('isLocation is string')
      if(isLocation.length > 0){

        locationValidation = true
        setLocationInput(false)
      }
      else{

        locationValidation = false
        setLocationInput(true)

      }      

    }

    // else degree is object
    else{

      // console.log('isLocation is object')
      if(isLocation[0].length > 0){

        locationValidation = true
        setLocationInput(false)
      }
      else{

        locationValidation = false
        setLocationInput(true)

      }      

    }    



    // Complete check for returning false or true to handleListUpdate()
    if((schoolValidation && degreeValidation && startValidation && endValidation && locationValidation) === true){

      return false

    }

    else{

      return true

    }



  }

  function handleCancel(){

    onShowEdit();
    runCheck(educationList); // allows clickability for adding new education
    setEdOn(true);

  }

  function handleDelete(){
    
    educationList = newEducationList;

    const newList = educationList;

    // updateMainState(educationList); // create passFunction that runs function that updates state for two componenets up
    
    setupEducationList(newList);
    updateMainState(newList);

    onShowEdit(); // turn off edit menu

    runCheck(newList); // allows clickability for adding new education
    
    setEdOn(true); // turns Education section information back on      

    
  }


  function handleSchoolChange (a){
    
    setSchool(a.target.value);
  }

  function handleDegreeChange (e){
    setDegree(e.target.value);
  }  

  function handleDescriptionChange (f){
    setDescription(f.target.value);
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

  const descriptionInputStylings = {
    border: isDescriptionInput ? '1px solid red' : '1px solid black'

  }

  const startInputStylings = {
    border: isStartInput ? '1px solid red' : '1px solid black'

  }  

  const endInputStylings = {
    border: isEndInput ? '1px solid red' : '1px solid black'

  }  

  const locationInputStylings ={
    border: isLocationInput ? '1px solid red' : '1px solid black'
  }

  return(
    <>
      <div className='formExperience'>

        <p className='formSchool'>Company:</p>
        <input
          onChange={handleSchoolChange}
          className='schoolInput' 
          type='text'
          value={isSchool} // value should be taken from educationList initially, then allowed to change from isSchool
          style={schoolInputStylings}
        >
        </input>

        <p className='formDegree'>Job Title:</p>
        <input
          onChange={handleDegreeChange}
          className='degreeInput' 
          type='text'
          value={isDegree}
          style={degreeInputStylings}
        >
          </input>

        <p className='formDescription'>Description:</p>
        <input
          onChange={handleDescriptionChange}
          className='descriptionInput' 
          type='text'
          value={isDescription}
          style={descriptionInputStylings}
        >
        </input>          

        <p className='formStartDate'>Start:</p>
        <input 
          onChange={handleStartChange}
          className='startDateInput' 
          type='date'
          value={isStart}
          style={startInputStylings}
        >
        </input>

        <p className='formEndDate'>Finished:</p>
        <input 
          onChange={handleEndChange}
          className='endDateInput' 
          type='date'
          value={isFinished}
          style={endInputStylings}
        >
        </input>

        <p className='formLocation'>Location:</p>
        <input 
          onChange={handleLocationChange}
          className='locationInput' 
          type='text'
          value={isLocation}
          style={locationInputStylings}
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
  onShow,
  isEducationList, // activeExList
  setEducationList,
  isClickable,
  checkClickable,
  isEdSwitch,
  updateEdList
}) {


  const [activeMenu, setActiveMenu] = useState(0); 

  const [isHighlighted, setHighlighted] = useState(false);
  const [isButtonHighlighted, setButtonHighlighted] = useState(false);

  const [isSelectedEducationId, setSelectedEducationId] = useState(0);

  const [currentList, setList] = useState(isEducationList);


  function setupEditMenu(itemKey){

    setActiveMenu(1)
    setSelectedEducationId(itemKey);
    isEdSwitch(false)
    
    // setList(isEducationList) // works in getting rid of element!!

  }

  let listItems = currentList.map(item => 

    <ExperienceElement 
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

    let newEExperienceList = currentList;

    let newItem = {
      id: Math.random(),
      title: 'Item ' + (isEducationList.length + 1),
      Company: '',
      Job: '',
      Description: '',
      StartDate: '',
      EndDate: '',
      Location: '',
    }

    // isEducationList.push(newItem); // sets new item to array
  
    newEExperienceList.push(newItem); // sets new item to array

    setEducationList(newEExperienceList) // set new item to state -> DOM 
    
    checkClickable(newEExperienceList); // Determines '+' button clickability using isClickable

  }

  // shows items and updates state within component itself (currentList)
  function cleanItems(){
    onShow()
    setList(isEducationList)
    checkClickable()
  }

  function cleanAfterDelete(item){
    
    console.log('runs cleanAfterDelete');
    console.log(item);

    if(item === undefined){

      setList(isEducationList)

    }
    else{

      setList(item)
    
    }

    checkClickable(item)
  }

  return (
    <div className="dropDown3">
      <div className="area3">
        <img className="experienceIcon" src={bagIcon}/>
        <div className="experienceDetails">Experience</div>
        {isHighlighted ? ( 
        <img
          onClick={cleanItems} 
          className="drop1" 
          onMouseEnter={() => setHighlighted(true)} 
          onMouseLeave={() => setHighlighted(false)} 
          style={{ border: "2px solid lightblue", cursor: 'pointer' }} 
          src={dropIconDown} 
        />
        ) : (
        <img onClick={cleanItems} 
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
      
        <ExperienceEditMenu 
          sendKey={isSelectedEducationId} 
          isMenu={activeMenu === 0}
          onShowEdit={() => 
            setActiveMenu(0)
          }
          educationList={currentList}
          setupEducationList={setList}
          runCheck ={(item) => cleanAfterDelete(item)}
          setEdOn={isEdSwitch}
          updateMainState={updateEdList} // tied to dropDownButton 2 list
        /> 
      
      ) : (
      
        <div></div>
      
      )}

        </div>  
  ); 
}

function LoadButton({
  setupEducationInfo,
  setupPresets
}){

  const [isHovered, setHovered] = useState(false);
  const [isMouse, setMouseClick] = useState(false); // setup another state for click down/up

  const [isShown, setShown] = useState(false);

  const boxStyle = {
    boxShadow: isHovered ? isMouse ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.4)' : "none",
    backgroundColor: isMouse ? '#c40000' : '#ff6262',
    cursor: 'pointer'
    
  }



  return (

    
    <div className="loadExampleBox" 
      onClick={setupPresets}
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

function DownloadButton({
  clearResume

}){

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
      onClick={clearResume}
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}

      onMouseDown={() => setMouseClick(true)} 
      onMouseUp={() => setMouseClick(false)}

      style={boxStyle}
      >
      <img className="downloadLogo" src={trashIcon}/>
      <div className="downloadName">Clear Resume</div>
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
  let educationList = [];
  let experienceList = []; 

  const [activeEducation, setActiveEducation] = useState(educationList);
  const [activeExperience, setActiveExperience] = useState(experienceList);

  const [activeEdClickable, setEdClickable] = useState(true);
  const [activeExClickable, setExClickable] = useState(true); 

  const [activeEdSection, setActiveEdSection] = useState(true); // responsible for turning off/on Education Info
  const [activeExSection, setActiveExSection] = useState(true); // responsible for turning off/on Experience Info

  const [activeEdList, setEdList] = useState(activeEducation);
  const [activeExList, setExList] = useState(activeExperience); 
 
  let listEducationInfo = activeEdList.map(item => 

    <EducationNameElement 
      item={item}
      key={item.id}
      isEdSection={activeEdSection}
      activeEducation
    />
    );

  let listEducationDates = activeEdList.map(item => 

    <EducationDateElement 
      item={item}
      key={item.id}
      isEdSection={activeEdSection}
      activeEducation
    />
    );    

  let listExperienceInfo = activeExList.map(item => 

    <ExperienceNameElement 
      item={item}
      key={item.id}
      isExSection={activeExSection}
      activeExperience
    />
  );


  let listExperienceDates = activeExList.map(item => 
  
    <ExperienceDateElement 
      item={item}
      key={item.id}
      isExSection={activeExSection}
      activeExperience
    />
  );    
  
  
  let presetEducation = [
    
    {
      id: Math.random(),
      title: 'Associates',
      School: 'Yuppers Uni',
      Degree: 'Associates',
      StartDate: '2020-01-01',
      EndDate: '2023-01-01',
      Location: 'Somewhere',
    }
    
  ]
    
  let presetExperience = [

    {
      id: Math.random(),
      title: 'System Administrator',
      Company: 'Booz Allen Hamilton',
      Job: 'System Administrator',
      Description: 'sdkfklsdjafl',
      StartDate: '2021-10-23',
      EndDate: '2024-06-17',
      Location: 'Somewhere',
    }
    
  ]
      
    
  function updateForPresets(){
    
    console.log('run updateForPresets function');

    setActiveName('Billy Jefferson');
    setActiveEmail('bjefferson@gmail.com');
    setActivePhone('8884561234');
    setActiveAddress('Somewhere');

    setEdList(presetEducation) // Adds Education Presets to DOM
    setExList(presetExperience) // Adds Experience Presets to DOM

    setActiveIndex(0)// change dropdown set to cause a page re-render

  }      


  function clearResumeInfo(){

    console.log('run clearResumeInfo function');

    setActiveName('');
    setActiveEmail('');
    setActivePhone('');
    setActiveAddress('');

    setEdList(educationList) // Adds Education Presets to DOM
    setExList(experienceList) // Adds Experience Presets to DOM   
    
    setActiveIndex(0)// change dropdown set to cause a page re-render

  }

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
  function checkItem(item){

    console.log('runs checkItem');
    
    // when i click on add button item is underfined, this needs to be passed to checkItem(item)

    console.log(item);

    if(item !== undefined){

      let lastItem = item.length - 1;

      if(item.length > 0){

        if((item[lastItem].School) === ''){

          setEdClickable(false);
          console.log('entered if > if - set false');
        }
        else {

          setEdClickable(true);
          console.log('entered if > else - set true');
        }
      }
      else{

        setEdClickable(true);

        console.log('entered else - set true');
      }
    
    }
    else{

      setEdClickable(true);

    }

  }

  function checkExItem(item){

    console.log('runs checkItem');
    
    // when i click on add button item is underfined, this needs to be passed to checkItem(item)

    console.log(item);

    if(item !== undefined){

      let lastItem = item.length - 1;

      if(item.length > 0){

        if((item[lastItem].Job) === ''){

          setExClickable(false);
          console.log('entered if > if - set false');
        }
        else {

          setExClickable(true);
          console.log('entered if > else - set true');
        }
      }
      else{

        setExClickable(true);

        console.log('entered else - set true');
      }
    
    }
    else{

      setExClickable(true);

    }

  }

  function cleanEducationList(){

    let newArray = []

    let counter = activeEducation.length - 1;

    if(activeEducation.length > 0){

      while(counter > -1){

        if(activeEducation[counter].Degree != ''){

          
          newArray.push(activeEducation[counter])

        }

        counter--;
      }

    }


    // console.log(newArray); //  showing updated array without element
    setActiveEducation(newArray)
    setEdList(newArray) 
    
    // console.log(activeEdList); // showing old array with element
    // console.log(activeEdList);

  }

  function cleanExperienceList(){

    console.log('runs cleanExperienceList');

    let newArray = []

    let counter = activeExperience.length - 1;

    if(activeExperience.length > 0){

      while(counter > -1){

        if(activeExperience[counter].Job != ''){

          
          newArray.push(activeExperience[counter])

        }

        counter--;
      }

    }


    console.log(newArray); //  showing updated array without element
    setActiveExperience(newArray)
    setExList(newArray)     

  }

  function cleanupForDrop1(){

    setActiveIndex(0);

    checkItem();

    if(activeEdClickable === false){

      // cleanup isEducationList - *** Needs fix to enable same sorting everytime (1/8/2024) ***
      cleanEducationList();
      
      // console.log(activeEdList);
      // cleanup isExperienceList 

    }
  }

  function cleanupForDrop2(){
    
    console.log('run cleanupForDrop2');

    setActiveIndex(1)

    checkExItem();

    console.log(activeExClickable);

    if(activeExClickable ===  false){

      cleanExperienceList();

    }


  }

  function cleanupForDrop3(){

    setActiveIndex(2)

    checkItem();

    if(activeEdClickable === false){

      cleanEducationList();
      
    }
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
        


        {/* DropDown Component #1 */}
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

        {/* DropDown Component #2 */}
        <DropButton2 
          isActive={activeIndex === 1}
          onShow={cleanupForDrop2} 
          isEducationList={activeEdList} 
          setEducationList={setActiveEducation}
          isClickable={activeEdClickable}
          checkClickable={(item) => checkItem(item)}
          isEdSwitch={setActiveEdSection}
          updateEdList={setEdList}
        />

        {/* DropDown Component #3 */}
        <DropButton3 
          isActive={activeIndex === 2}
          onShow={cleanupForDrop3}
          isEducationList={activeExList} 
          setEducationList={setActiveExperience}
          isClickable={activeExClickable}
          checkClickable={(item) => checkExItem(item)}
          isEdSwitch={setActiveExSection}
          updateEdList={setExList}                  
        />

      </div>

      <div id="selectionSec">
        {/* React Component #4 */}
        <div id="formatOptions">
          <div className="area4">

            <LoadButton 
              setupEducationInfo={setActiveEducation}
              setupPresets={() => updateForPresets()}
            />
            
            <DownloadButton 
              clearResume={() => clearResumeInfo()}
            />

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

                {listEducationDates}

              </div>
              <div className="infoColumn1">

                {listEducationInfo}

              </div>
            </div>
            <div className="bottomSec2">
              <div className="prHeader">Professional Experience</div>
              <div className="dateColumn2">

                {listExperienceDates} 

              </div>
              <div className="infoColumn2">

                {listExperienceInfo}

              </div>
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
// - Just added ability to assign unique IDs for education elements, fine tune 
//   Make sure there are no bugs in functionality. using Math.random()
//
// - (WORKING, but further testing is required) Items require two presses on the 
//   delete button to be removed from the DOM. 
//   *** NEED CODE CLEANUP ASAP ***
   


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