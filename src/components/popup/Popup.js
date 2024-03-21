import React, {useState, useEffect} from 'react';
import './Popup.css';

const Popup = ({ isOpen, message, word, onClose, onRestart }) => {

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
  if (!isOpen) return null;
  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-message">{message}</div>
        <div className="popup-word">Cлово: {word} ({translation})</div>
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