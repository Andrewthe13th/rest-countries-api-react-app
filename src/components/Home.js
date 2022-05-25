import React,{useEffect, useState} from 'react'
import SearchBar from './SearchBar'
import DropDown from './DropDown'
import CountryCard from './CountryCard'
import '../styles/home.css'

const Home = props => {

  async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags,cca3');
    const json = await response.json();
    console.log(json);
    setCountries(json);
  }

  async function fetchCountriesByName(name) {
    if(name === ""){fetchCountries();return}

    const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,population,region,capital,flags,cca3`);
    if(response.status !== 200){setSearch(false);return;}

    const json = await response.json();
    setCountries(json);
    setSearch(true);
  }

  async function fetchCountriesByRegion(region) {
    const response = await fetch(`https://restcountries.com/v3.1/region/${region}?fields=name,population,region,capital,flags,cca3`);
    const json = await response.json();
    console.log(json);
    setCountries(json);
  }

  useEffect(() => {
    if(countries.length === 0)
      fetchCountries()
  })

  const [countries,setCountries] = useState([]);
  const [search,setSearch] = useState(true);

  return (
    <main>
      <div className="container">
        <div className='filters'>
          <div className="filter-group">
            <SearchBar bsearchResult={search}  getCountries={fetchCountriesByName}></SearchBar>
            <DropDown getCountries={fetchCountriesByRegion}></DropDown>
          </div>
          <div className="country-container">
            { countries.length !== 0
            ? countries.map((e) => <CountryCard openDetailsPage={props.openDetailsPage} countryInfo={e}></CountryCard>)
            : <div>No countries found</div>}
          </div>
        </div>
        <div className='card-container'>
        </div>
      </div>
    </main>
  )
}

export default Home