import logo from './Group 1.svg';
import './App.css';


function Entrance() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-header__img" alt="logo" />
        <p className='App-header__text' >
        Вход
        </p>
        <form className='App-header__form'>
        <input className='App-header__input' placeholder='Логин'>
        </input >
        <input className='App-header__input' placeholder='Пароль' type='password' minLength={8}>
        </input>
        <button  type='submit' className='App-header__button'>
          Войти
        </button> 
        </form>
        <div className='App-header__noAcc'>
          <p className='App-header__noAcc-p'>Нет аккаунта?</p>
          <a href='./Register' className='App-header__noAcc-link'><p className='App-header__noAcc-p'>Зарегистрироваться</p></a>
        </div>
      </header>
    </div>
  );
}

export default Entrance;
