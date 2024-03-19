import './Main.css';
import React, { useState, useEffect } from 'react';
import Layout from './Layout';

const Main = () => {
  const [translatedWord, setTranslatedWord] = useState('');
  const [time, setTime] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [hangmanCondition, setHangmanCondition] = useState(0);
  const [inputLetter, setInputLetter] = useState('');
  const [defeat, setDefeat] = useState(false);
  const [stoppedTime, setStoppedTime] = useState(0);
  const [revealedWord, setRevealedWord] = useState('');


  useEffect(() => {
    updateCurrentDate();
  }, []);

  useEffect(() => {
    if (gameStarted) {
      const timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStarted]);

  const updateCurrentDate = () => {
    const currentDateObj = new Date();
    const day = currentDateObj.getDate().toString().padStart(2, '0');
    const month = (currentDateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDateObj.getFullYear();
    setCurrentDate(`${day}.${month}.${year}`);
  };

  const fetchWord = async () => {
    try {
      const response = await fetch('https://random-word-api.herokuapp.com/word');
      if (!response.ok) {
        throw new Error('Не удалось получить слово');
      }
      const data = await response.json();
      const newWord = data[0];
      setWord(newWord.toLowerCase());
    } catch (error) {
      console.error('Ошибка при получении слова:', error);
      setWord('по умолчанию');
    }
  };

  
  const handleStartGame = async () => {
    setGameStarted(true);
    await fetchWord();
  };

  const handleLetterInput = async (event) => {
  if (defeat) return; // Не выполнять действия после поражения
  const letter = event.target.value.toLowerCase();
  setInputLetter(letter);
  if (!guessedLetters.includes(letter)) {
    if (!word.includes(letter)) {
      setHangmanCondition(prevCondition => prevCondition + 1);
      if (hangmanCondition === 6) {
        setDefeat(true);
        setStoppedTime(time);
        setRevealedWord(word); // Отображение полностью слова после поражения
        await translateWord(word); // Отображение перевода
      }
    }
    setGuessedLetters(prevGuessedLetters => [...prevGuessedLetters, letter]);
    if (!word.split('').some((char) => !guessedLetters.includes(char))) {
      await translateWord(word); // Вызов функции для получения перевода
    }
  }
};
  
  

  const renderWord = () => {
    if (!gameStarted) return null;
    return word.split('').map((letter, index) => (
      <span key={index} className="letter">
        {guessedLetters.includes(letter) ? letter : ' __ '}
      </span>
    ));
  };

  const translateWord = async (word) => {
    try {
      const sourceLang = 'en';
      const targetLang = 'ru';

      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURI(word)}`;

      const response = await fetch(url);
      const data = await response.json();

      const translated = data[0][0][0];
      setTranslatedWord(translated);
    } catch (error) {
      console.error('Ошибка при получении перевода:', error);
      setTranslatedWord('перевод не доступен');
    }
  };

  const renderHangman = () => {
    switch (hangmanCondition) {
      case 1:
        return (
          <>
            <circle cx="280" cy="140" r="40" />
          </>
        );
      case 2:
        return (
          <>
            <circle cx="280" cy="140" r="40" />
            <line x1="280" y1="180" x2="280" y2="290" />
          </>
        );
      case 3:
        return (
          <>
            <circle cx="280" cy="140" r="40" />
            <line x1="280" y1="180" x2="280" y2="290" />
            <line x1="280" y1="230" x2="200" y2="180" />
          </>
        );
      case 4:
        return (
          <>
            <circle cx="280" cy="140" r="40" />
            <line x1="280" y1="180" x2="280" y2="290" />
            <line x1="280" y1="230" x2="200" y2="180" />
            <line x1="280" y1="230" x2="360" y2="180" />
          </>
        );
      case 5:
        return (
          <>
            <circle cx="280" cy="140" r="40" />
            <line x1="280" y1="180" x2="280" y2="290" />
            <line x1="280" y1="230" x2="200" y2="180" />
            <line x1="280" y1="230" x2="360" y2="180" />
            <line x1="280" y1="290" x2="220" y2="420" />
          </>
        );
      case 6:
        return (
          <>
            <circle cx="280" cy="140" r="40" />
            <line x1="280" y1="180" x2="280" y2="290" />
            <line x1="280" y1="230" x2="200" y2="180" />
            <line x1="280" y1="230" x2="360" y2="180" />
            <line x1="280" y1="290" x2="220" y2="420" />
            <line x1="280" y1="290" x2="340" y2="420" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="Main">
        {!gameStarted && <button className='start__button' onClick={handleStartGame}>Начать</button>}
        {gameStarted && (
          <div className='main__info-container'>
            <div className='main__info'>
            <div className='main__info-date'>Время игры: {defeat ? stoppedTime : time}</div>
              <div className='main__info-date'>Дата игры: {currentDate}</div>
              <div className='main__info-img'>
                <svg height="500" width="400" stroke="rgba(167, 114, 67, 1)" fill="none" strokeWidth="2">
                  {renderHangman()}
                </svg>
              </div>
              <div className='main__info-title'>Слово:</div>
              <div className='main__word-container' onClick={() => document.getElementById("letter-input").focus()}>
                <div className='word'>
                    {renderWord()}
                </div>
                <input
                    className='word__input'
                    id="letter-input"
                    type="text"
                    value={inputLetter}
                    onChange={handleLetterInput}
                    maxLength={1}
                    autoFocus
                    disabled={defeat} 
                />
              </div>
              <div>Перевод: {translatedWord}</div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Main;
