import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import '../styles/details.css'



const Details = (props) => {

  async function fetchCountryDetails(){
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${country.code}?fields=name,nativeName,population,region,subregion,capital,tld,currencies,languages,borders,flags`);
    if (response.status !== 200){console.log("Country Details Response Failed");setCountry({code: props.country, details: null, borderCountries: []});return}
    const json = await response.json();
    const data = json;
    // setCountryDetails(data)


    // console.log(data.borders)
    let borderCountriesResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${data.borders.map((e,idx,array) => {return e})}&fields=name,cca3`);
    if (borderCountriesResponse.status !== 200){console.log("Border Country Response Failed");setCountry({...country,details: data,borderCountries: []});return}
    const borderJson = await borderCountriesResponse.json();
    setCountry({...country,details: data,borderCountries: borderJson});
    // setBorderCountries(borderJson);
    // console.log(borderJson);

    
  }

  const refreshPage = (borderCountry) => {
    console.log("Reseting Details");
    setCountry({code: borderCountry, details: null, borderCountries: []});
  }

  useEffect(() => {
    if(country.details === null){
      fetchCountryDetails();
    }
  })
  
  const [country,setCountry] = useState({code: props.country, details: null, borderCountries: []});
  // const [country.details,setCountryDetails] = useState(null);
  // const [borderCountries,setBorderCountries] = useState([]);

  /* Iter Currencies */
  const getCurrencies = (currencies) => {
    let currencyList = [];

    Object.values(currencies).map( (e,i) => {
      return currencyList.push( <span key={i}>{e.name}</span> )
    })

    return currencyList   
  }



  return (
    <>
    {country.details !== null ?
    <div className="details-page">
      <div className="container">
        <button className="back-button" onClick={props.openHomePage}>
          <FontAwesomeIcon icon={faLeftLong}></FontAwesomeIcon>
          <div>Back</div>
        </button>
        <div className="country">
          <div className="details-flag">
            <img src={country.details.flags.svg} alt="" />
          </div>
          <div className="details-info">
            <div className="country-name">{country.details.name.common}</div>
            <div className="country-details">
              <section className="top">
                <div className="country-detail"><span className="header">Official Name:</span><span></span>{country.details.name.official}</div>
                <div className="country-detail"><span className="header">Population:</span><span>{String(country.details.population).split("").reverse().map((e,idx) => {return ( (idx) % 3 === 0 && idx !== 0)?e+",":e}).reverse().join("")}</span></div>
                <div className="country-detail"><span className="header">Region:</span><span>{country.details.region}</span></div>
                <div className="country-detail"><span className="header">Sub Region:</span><span>{country.details.subregion === ""? "None": country.details.subregion}</span></div>
                <div className="country-detail"><span className="header">Capital:</span><span>{country.details.capital.length === 0?"None":country.details.capital}</span></div>
              </section>
              <section className="middle">
                <div className="country-detail"><span className="header">Top Level Domain:</span>{Object.values(country.details.tld).map((e,i,a) => {return <span className="country-lang" key={i}>{e}{(i+1 !== a.length)?", ":""}</span>})}</div>
                <div className="country-detail"><span className="header">Currencies:</span>{getCurrencies(country.details.currencies)}</div>
                <div className="country-detail"><span className="header">Languages:</span>{Object.values(country.details.languages).map((e,i,a) => {return <span className="country-lang" key={i}>{e}{(i+1 !== a.length)?", ":""}</span>})}</div>
              </section>
              <section className="bottom">
                <div className="country-detail"><span className="header">Border Countries:</span></div>
                <div className="border-countries">
                  {country.borderCountries.length > 0 ? country.borderCountries.map((e,i)=>{
                    return(<button onClick={() => refreshPage(String(e.cca3))}  key={i} className="country-tag">{e.name.common}</button>)
                  }): <div>None</div>}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
    : <div>Loading</div>}
    </>
  )
}

export default Details