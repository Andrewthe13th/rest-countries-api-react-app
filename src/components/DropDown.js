import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import '../styles/dropDown.css';

const DropDown = (props) => {

  const OpenedList = () => {
    let countrySelector = document.querySelector('#countrySelector');
    countrySelector.classList.add("show");
  }

  return(
    <button className="dropDown" onClick={OpenedList}>
      <div className="dropDown-text">Filter by Region</div>
      <FontAwesomeIcon className="dropDown-icon" icon={faAngleDown}></FontAwesomeIcon>
      <ul id="countrySelector"  className="dropDownList">
        <li><a href="#country" onClick={() => props.getCountries("Africa")}>Africa</a></li>
        <li><a href="#country" onClick={() => props.getCountries("America")}>America</a></li>
        <li><a href="#country" onClick={() => props.getCountries("Asia")}>Asia</a></li>
        <li><a href="#country" onClick={() => props.getCountries("Europe")}>Europe</a></li>
        <li><a href="#country" onClick={() => props.getCountries("Oceania")}>Oceania</a></li>
      </ul>
    </button>
  )
}

export default DropDown