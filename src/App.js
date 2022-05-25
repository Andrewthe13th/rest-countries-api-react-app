import React from 'react';
import { useState,useEffect } from 'react';
import Header from './components/Header.js';
import Home from './components/Home.js';
import Details from './components/Details.js';
import './styles/app.css';



function App() {

  // global Function
  window.onclick = function(event) {
    if (!event.target.matches('.dropDown')) {
      let dropdowns = document.getElementsByClassName("dropDownList");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  //global Variable
  const [country,setCountry] = useState("");
  const [mainPage,setMainPage] = useState("Home");
  const [darkMode,setDarkMode] = useState(false);
  const [rerender,setRerender] = useState(false);

  const openHomePage = () => {
    console.log("Trying to reset Home page");
    if(mainPage === "Home"){
      console.log("Rerender should reset");
      setRerender(!darkMode);
    }else
    console.log("should only be called in details page");
      setMainPage('Home');
  }
  const openDetailsPage = (country) => {
    console.log("Opening Details page: " + String(country));
    // detailPage_Country = country;
    setCountry(country);
    setMainPage('Details');
  }

  const getMainPage = () => {
    switch(mainPage){
      case ('Home'):
        return <Home openDetailsPage={openDetailsPage}></Home>;
      case ('Details'):
        return <Details openHomePage={openHomePage}  country={country}></Details>;
      default:
        return <div>no page selected</div>
    }
  }

  const toggleDarkMode = () => {
    darkMode ? setDarkMode(false): setDarkMode(true);
  }

  useEffect(()=> {
    if(darkMode)
      document.body.classList.add("dark");
    else{document.body.classList.remove("dark");}

    document.body.classList.add("body");
  })

    return (
      <div className={"App ".concat(darkMode?"dark":"")}>
        <Header navHome={openHomePage} toggleTheme={toggleDarkMode}></Header>
        {getMainPage()}
      </div>
)

}
export default App;