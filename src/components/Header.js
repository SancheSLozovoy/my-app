// Header.js
import React from 'react';
import './Header.css'
import logo from '../Group 2.svg';
import acc from '../Account.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav className='header__nav'>
        <ul className='header__ul'>
          <li className='header__li'>
            <Link to="/main"><img src={logo} alt="logo" /></Link>
          </li>
          <li className='header__li'>
            <Link to="/profile"><img src={acc} alt="account" /></Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
