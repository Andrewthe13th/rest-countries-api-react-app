import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../styles/searchBar.css'

const SearchBar = (props) => {

  const FocusInputField = () => {
    let countrySearch = document.querySelector('#countrySearch');
    countrySearch.focus();
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log(text);
      props.getCountries(text);
    }
  }

  const onInputChange = (e) => {
    setText(e.target.value)
  } 

  const [text,setText] = useState("");

  return (
    <div className={"searchBar".concat((props.bsearchResult)?"":" searchFailed")} onClick={FocusInputField}>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input id="countrySearch" value={text} onChange={onInputChange}  onKeyDown={handleKeyDown} type="text" placeholder="Search for a country..." />
    </div>
  )
}

export default SearchBar