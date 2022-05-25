import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import '../styles/header.css';

const Header  = (props) => {

  return(
    <header className=''>
      <div className='container'>
        <button className="homepage" onClick={props.navHome}>Where in the world?</button>
        <button className='darkmode' onClick={props.toggleTheme}>
          <FontAwesomeIcon icon={faMoon} />
          <div className='buttonText'>Dark Mode</div>
        </button>
      </div>
    </header>
  )
  

}

export default Header