import React, { useState } from 'react';
import logo from './Group 1.svg';
import arrow from './arrow.svg';
import './Register.css';
import InputMask from 'react-input-mask';
import { useHistory } from 'react-router-dom';

export default function Register() {

  const history = useHistory();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError('Пароли не совпадают');
    } 
  };

  return (
    <div className="Register">
      <header className="Register-header">
        <img src={logo} className="Register-header__img" alt="logo" />
        <p className='Register-header__text' >
          Регистрация
        </p>
        <div className='Register-header__formArrow'>
            <span className='Registet-header__span'>
                <img onClick={() => history.goBack()} className='Register-header__arrow' src={arrow}/>
            </span>
            <form className='Register-header__form' onSubmit={handleSubmit}>
            <input 
                className='Register-header__input' 
                placeholder='Логин' 
                required 
            />
            <input 
                className='Register-header__input' 
                placeholder='Пароль' 
                type='password' 
                minLength={8} 
                value={password}
                onChange={handlePasswordChange}
                required 
            />
            <input 
                className='Register-header__input' 
                placeholder='Повторите пароль' 
                type='password' 
                minLength={8} 
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required 
            />
            {passwordError && <p className="Register-header__error">{passwordError} </p>}
            <InputMask 
                className='Register-header__input'
                mask="+7(999)999-99-99" 
                placeholder="Номер телефона"
                required 
            />
                <button onClick={() => history.goBack()} type='submit' className='Register-header__button'>
                Зарегистрироваться
            </button> 
            <span 
                className='App-header__back-arrow' 
                onClick={() => history.goBack()}
            ></span>
            </form>
        </div>
      </header>
    </div>
  );
}

