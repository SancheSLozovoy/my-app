import React, {useState, useEffect} from 'react';
import './Popup.css';
import axios from "axios";

const Popup = ({ isOpen, message, word, user_id, rating, username, defeat, points, time, onClose, onRestart }) => {

  const [translation, setTranslation] = useState('');
  useEffect(() => {
    const translateWord = async (word) => {
      try {
        const sourceLang = 'en';
        const targetLang = 'ru';

        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURI(word)}`;

        const response = await fetch(url);
        const data = await response.json();

        await setTranslation(data[0][0][0]);

      } catch (error) {
        console.error('Ошибка при получении перевода:', error);
      }
    };
    if (isOpen) {
      translateWord(word);
    }
  }, [translation, isOpen]);
  useEffect(  () => {
      if (user_id && username && rating && points) {
        createGame(user_id, word, new Date(), time, !defeat).then(res => {
          console.log(res);
          const newRating = rating + points;
          updateUsersRating(user_id, newRating).then( (res) => {
            window.localStorage.setItem('user', JSON.stringify(res));
          });
        });
      }

  }, []);
  const createGame = async (user_id, word, playDate, timePlayed, win) => {
    /**
     * Create a game
     * @param {number} user_id - User ID
     * @returns {Object} Response data
     * @throws {Error} If creation fails
     */
    try {
      const GAME_BODY = {
        word: word,
        playDate: playDate,
        timePlayed: timePlayed,
        win: win? 'true' : 'false',
        user_id: user_id,
      };
      const response = await axios.post(`/games/create`, GAME_BODY);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create game");
    }
  };

  const updateUsersRating = async (user_id, rating) => {
    /**
     * Update user's rating
     * @param {number} user_id - User ID
     * @returns {Object} Response data
     * @throws {Error} If update fails
     */
    try {
      const response = await axios.put(`/users/${user_id}/rating`, {
        rating: rating,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to update user's rating");
    }
  };

  if (!isOpen) return null;
  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-message">{message}</div>
        <div className="popup-word">Cлово: {word} ({translation})</div>
        {user_id && username && rating && points && (
          <div className="popup-user">
            <p>Пользователь: {username}</p>
            <p>Очки: {points}</p>
          </div>
        )}
        <button className="popup-button" onClick={onRestart}>
          Начать новую игру
        </button>
        <button className="popup-button popup-button_red"   onClick={onClose}>
          Выйти
        </button>
      </div>
    </div>
  );
};

export default Popup;