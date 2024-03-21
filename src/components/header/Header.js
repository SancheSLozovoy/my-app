// Header.js
import React from 'react';
import './Header.css'
import logo from '../../assets/images/Group 2.svg';
import acc from '../../assets/images/Account.svg';
import stat from '../../assets/images/statistics.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav className='header__nav'>
        <ul className='header__ul'>
          <li className='header__li'>
            <Link to="/"><img src={logo} alt="logo"/></Link>
          </li>
          <li className='header__li'>
            <Link to={window.localStorage.getItem('user') && window.localStorage.getItem('user') !== {} ? "/profile" : "/login"}><img src={acc} alt="account"/></Link>
          </li>
          <li className='header__li'>
            <Link to={window.localStorage.getItem('user') && window.localStorage.getItem('user') !== {} ? "/statistics" : "/login"}><img src={stat} alt="statistics"/></Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
