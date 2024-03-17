import './Main.css'
import React from 'react';
import Layout from './Layout';

const Profile = () => {
  return (
    <Layout>
      <div className="Profile">
      <body className='body'>
        <div className='body__info-container'>
            <div className='body__info'>
                <div className='body__info-rating'>
                    Рейтинг: 
                </div>
                <div className='body__info-img'>
                    <img alt=""/>
                </div>
                <a href='#' className='body__info-a'>Изменить аватарку</a>
                <div className='body__info-login-container'>
                    <div className='body__info-login'>Логин</div>
                </div>
                <a className='body__info-a'> Изменить пароль</a>
                <div className='body__info-regDate'>Дата регистрации:</div>
            </div>
        </div>
      </body>
      </div>
    </Layout>
  );
};

export default Profile;


