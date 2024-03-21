import '../main/Main.css'

import React, {useEffect, useState} from 'react';
import Layout from '../../components/layout/Layout';
import axios from "axios";
import {useHistory} from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const [avatar, setAvatar] = useState('');
  const [user, setUser] = useState({});
  const [formattedDate, setFormattedDate] = useState('');
  const [showChangeLogin, setShowChangeLogin] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (localUser) {
      setUser(localUser);
    }
  }, []);
  const handleEditLogin = () => {
    setShowChangeLogin(!showChangeLogin);
  };

  const changeAvatar = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar(reader.result);
      console.log(reader.result)
      user.picture = reader.result;
      window.localStorage.setItem('user', JSON.stringify(user));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    await updateUsersProfilePicture(reader.result);
  };

  const changeLogin = async (event) => {
    event.preventDefault()
    await updateUsersUsername(user.id, event.target[0].value);
    handleEditLogin();
    const localUser = JSON.parse(localStorage.getItem('user'));
    localUser.username = event.target[0].value;
    localStorage.setItem('user', JSON.stringify(localUser));
    setUser(localUser);
  };
  const handleLogout = () => {
    localStorage.removeItem('user');
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (localUser) {
      setUser(localUser);
    }
    history.push('/');
  }
  const updateUsersUsername = async (user_id, username) => {
    /**
     * Update user's username
     * @param {number} user_id - User ID
     * @returns {Object} Response data
     * @throws {Error} If update fails
     */
    try {
      const response = await axios.put(`/users/${user_id}/username`, {
        username: username,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to update user's username");
    }
  }
  const deleteUser = async (user_id) => {
    /**
     * Delete a user
     * @param {number} user_id - User ID
     * @returns {Object} Response data
     * @throws {Error} If deletion fails
     */
    try {
      const response = await axios.delete(`/users/${user_id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  };

  const handleDeleteUser = async () => {
    await deleteUser(user.id);
    handleLogout();
    localStorage.removeItem('user');
  }

  const changePassword = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (user) {
      await changePasswordRequest(user.id, newPassword);
      handleEditPassword();
      const localUser = JSON.parse(localStorage.getItem('user'));
      localUser.password = newPassword;
      localStorage.setItem('user', JSON.stringify(localUser));
      setUser(localUser);
    }
  };

  const changePasswordRequest = async (id, password) => {
    /**
     * Change user's password
     * @param {number} user_id - User ID
     * @param {string} password - New password
     * @returns {Object} Response data
     * @throws {Error} If update fails
     */
    try {
      const response = await axios.put(`/users/${id}/password`, {
        "password": password // Заменено с newPassword на password
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to change password: " + error.message); // Добавлен вывод сообщения об ошибке
    }
  };


  const handleEditPassword = () => {
    setShowChangePassword(!showChangePassword);
  };

  const updateUsersProfilePicture = async (picture) => {
    /**
     * Update user's profile picture
     * @param {number} user_id - User ID
     * @throws {Error} If update fails
     */
    try {
      const response = await axios.put(`/users/${user.id}/picture`, {
        picture: picture,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to update user's profile picture");
    }
  };

  useEffect(()=>{
    const date = new Date(user.dateRegistered);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: January is 0 in JavaScript Date
    const year = date.getFullYear();

    setFormattedDate(`${day}.${month}.${year}`);

    if (user.picture) {
      setAvatar(user.picture);
      }

  }, [user])
  return (
    <Layout>
      <div className="Profile">
        <div className='body__info-container'>
          <div className='body__info'>
            <div className='body__info-rating'>
              Рейтинг: {user.rating}
            </div>
            <div className='body__info-img-container'>
              <img src={avatar} className='body__info-img' alt={'picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture picture '}/>
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
              <div className='body__info-login'>Логин: {user.username}</div>
              <button className={'body__info-login__button'} onClick={handleEditLogin}>✏️</button>
            </div>
            {showChangeLogin && (<form className='body__info-login__change' onSubmit={changeLogin}>
              <input
                className='body__info-login__change__input'
                type="text"
                placeholder={user.username}
                required
              />
              <button className='body__info-login__change__button' type={"submit"}>Изменить логин ✅</button>
            </form>)}
            <button onClick={handleEditPassword} className='body__info-button-password'>Изменить пароль</button>
            {showChangePassword && (<form className='body__info-password__change' onSubmit={changePassword}>
              <input className='body__info-password__change__input'
                     type="password"
                     value={newPassword}
                     placeholder={'Новый пароль'}
                     onChange={(e) => setNewPassword(e.target.value)}
                     required
              />
              <input className='body__info-password__change__input'
                     type="password"
                     placeholder={'Повторите пароль'}
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     required
              />
              <button className='body__info-password__change__button' type={"submit"}>Сохранить новый пароль ✅</button>
            </form>)}
            <button onClick={handleLogout} className='body__info-button-logout'>Выйти</button>
            <button onClick={handleDeleteUser} className='body__info-button-logout'>Удалить аккаунт</button>

            <div className='body__info-regDate'>Дата регистрации: {formattedDate}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
