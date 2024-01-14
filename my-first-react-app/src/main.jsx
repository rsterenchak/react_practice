import React, { useState } from 'react'
import ReactDOM, { hydrateRoot } from 'react-dom/client'
import { createRoot } from 'react-dom/client';
import './index.css'
import MainSection from './MainSection.jsx'
import MobileExtension from './MobileExtension.jsx';


const root = createRoot(document.getElementById('root'));

// Set up a media query
const mediaQuery = window.matchMedia("(max-width: 1290px)");

// State may need to be lifted from <MainSection> to set up download, and template data buttons in MobileExtension 
 

// Initial call
if(mediaQuery.matches){

  console.log(window.innerWidth);

  console.log('Initial call w/ mainsection and mobileextension');  

  root.render(

    <React.StrictMode>
      <div id='outerContainer'>
        <MainSection 
        />
        {/* <MobileExtension /> */}
     </div>
    </React.StrictMode>,
  )

}
else{
  root.render(
    <React.StrictMode>
      <div id='outerContainer'>
        <MainSection 
        />
      </div>
    </React.StrictMode>,
  )
}

// Acts as event listener for window size changes
mediaQuery.onchange = (e) => {

  console.log(window.innerWidth);

  // Manipulating DOM section
  if (e.matches) {

    console.log('After first call w/ mainsection and mobileextension');


    root.render(
    <React.StrictMode>
      <div id='outerContainer'>
        <MainSection 
        />
        {/* <MobileExtension /> */}
     </div>
    </React.StrictMode>,
    )
    }
  
  else{
    root.render(
      <React.StrictMode>
        <div id='outerContainer'>
          <MainSection 
          />
        </div>
      </React.StrictMode>,
    )
  }
}




// console.log(mediaQuery);

// Initial check
// handleMediaChange(mediaQuery);

// Add a listener to handle changes in the media query
// mediaQuery.addEventListener(handleMediaChange, change);