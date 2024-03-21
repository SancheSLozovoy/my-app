// Register.js
import React, { useState } from 'react';
import logo from '../../assets/images/Group 1.svg';
import arrow from '../../assets/images/arrow.svg';
import './Register.css';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    }
    fetch('http://localhost:8080/api/users/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
        .then(response => response.json())
        .then(data => {
          if (password !== confirmPassword) {
            setPasswordError('Пароли не совпадают');
          } else {
            window.localStorage.setItem('user', JSON.stringify(data));
            history.push('/profile');
          }
        })
        .catch(error => console.error('Error:', error));

  };

  return (
    <div className="Register">
      <header className="Register-header">
        <img src={logo} className="Register-header__img" alt="logo" />
        <p className='Register-header__text'>
          Регистрация
        </p>
        <div className='Register-header__formArrow'>
          <span className='Registet-header__span'>
            <img onClick={() => history.goBack()} className='Register-header__arrow' src={arrow} alt="arrow" />
          </span>
          <form className='Register-header__form' onSubmit={handleSubmit}>
            <input 
              className='Register-header__input' 
              placeholder='Логин'
              value={username}
              onChange={handleUsernameChange}
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
            {passwordError && <p className="Register-header__error">{passwordError}</p>}
            <button type='submit' className='Register-header__button'>Зарегистрироваться</button>
          </form>
        </div>
      </header>
    </div>
  );
};

export default Register;
