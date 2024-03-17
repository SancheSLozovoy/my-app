// Entrance.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import logo from './Group 1.svg';
import './Entrance.css';

const Entrance = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!login || !password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    // Если все поля заполнены, можно переходить в профиль
    window.location.href = '/profile';
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-header__img" alt="logo" />
        <p className='App-header__text'>
          Вход
        </p>
        <form className='App-header__form' onSubmit={handleSubmit}>
          <input 
            className='App-header__input' 
            placeholder='Логин' 
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required 
          />
          <input 
            className='App-header__input' 
            placeholder='Пароль' 
            type='password' 
            minLength={8} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <button type='submit' className='App-header__button'>
            Войти
          </button>
        </form>
        <div className='App-header__noAcc'>
          <p className='App-header__noAcc-p'>Нет аккаунта?</p>
          <Link to="/register" className='App-header__noAcc-link'>
            <p className='App-header__noAcc-p'>Зарегистрироваться</p>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Entrance;
