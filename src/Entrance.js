import React from 'react';
import { Route, Switch, Link} from 'react-router-dom'; 
import Register from './Register'; 
import logo from './Group 1.svg';
import './Entrance.css';

const Entrance = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-header__img" alt="logo" />
        <p className='App-header__text' >
          Вход
        </p>
        <form className='App-header__form'>
          <input className='App-header__input' placeholder='Логин' />
          <input className='App-header__input' placeholder='Пароль' type='password' minLength={8} />
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

      <Switch>
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default Entrance;
