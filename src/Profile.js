import './Main.css'

import React, { useState } from 'react';
import Layout from './Layout';


const Profile = () => {
  const [rating, setRating] = useState(0);
  const [login, setLogin] = useState(''); 
  const [registrationDate, setRegistrationDate] = useState(''); 
  const [avatar, setAvatar] = useState(''); 

  const changePassword = () => {
    console.log('Изменение пароля.');
  };

  const changeAvatar = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout>
      <div className="Profile">
        <div className='body__info-container'>
          <div className='body__info'>
            <div className='body__info-rating'>
              Рейтинг: {rating}
            </div>
            <div className='body__info-img'>
              <img src={avatar} className='body__info-img'/>
            </div>
            <input type="file" accept="image/*" onChange={changeAvatar} className='body__info-button' content='Изменить аватар' />
            <div className='body__info-login-container'>
              <div className='body__info-login'>Логин: {login}</div>
            </div>
            <button onClick={changePassword} className='body__info-button-password'>Изменить пароль</button>
            <div className='body__info-regDate'>Дата регистрации: {registrationDate}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
