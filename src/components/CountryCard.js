import React from "react";
import '../styles/country-card.css'

const CountryCard = (props) => {

  const ViewDetailsPage = (country) => {
    props.openDetailsPage(country);
  }

  return(
    <div className="country_card" onClick={() => {ViewDetailsPage(props.countryInfo.cca3)}}>
      <div className="card-img">
        <img src={props.countryInfo.flags.svg} alt="" />
      </div>
      <div className="card-details">
        <div className="name">{props.countryInfo.name.common}</div>
        <div className="population"><span className="detail-name">Population:</span><span>{props.countryInfo.population === 0?"None":String(props.countryInfo.population).split("").reverse().map((e,idx) => {return ( (idx) % 3 === 0 && idx !== 0)?e+",":e}).reverse().join("")}</span></div>
        <div className="region"><span className="detail-name">Region:</span><span>{props.countryInfo.region === ""?"None" : props.countryInfo.region}</span></div>
        <div className="capital"><span className="detail-name">Capital:</span><span>{props.countryInfo.capital.length === 0 ? "None": props.countryInfo.capital}</span></div>
      </div>
    </div>
  )
}

export default CountryCard