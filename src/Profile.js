import './Main.css'

import React, { useState } from 'react';
import Layout from './Layout';
import axios from "axios";
import imageToBase64 from 'image-to-base64/browser';

const Profile = () => {
  const [rating, setRating] = useState(0);
  const [login, setLogin] = useState(''); 
  const [registrationDate, setRegistrationDate] = useState(''); 
  const [avatar, setAvatar] = useState(''); 

  const changePassword = () => {
    console.log('Изменение пароля.');
  };

  const changeAvatar = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    await handleChangeAvatar();
  };

  const handleChangeAvatar = async () => {
    const base64Image = imageToBase64(avatar).then(
      async (response) => {
        await updateUsersProfilePicture(1, response);
      }
    );

  }


  const updateUsersProfilePicture = async (user_id, picture) => {
    /**
     * Update user's profile picture
     * @param {number} user_id - User ID
     * @throws {Error} If update fails
     */
    try {
      const response = await axios.put(`${URL}/users/${user_id}/picture`, {
        picture: picture,
      });
    } catch (error) {
      throw new Error("Failed to update user's profile picture");
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
            <label htmlFor="avatarInput" className="body__info-button">
                Изменить аватар
                <input
                    id="avatarInput"
                    type="file"
                    accept="image/*"
                    onChange={changeAvatar}
                />
            </label>    
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
