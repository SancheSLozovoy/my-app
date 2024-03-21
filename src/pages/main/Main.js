import './Main.css';
import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Popup from "../../components/popup/Popup"
import * as all from "../../requests";
import logo from "../../assets/images/Group 1.svg";

const Main = () => {
  const [translatedWord, setTranslatedWord] = useState('');
  const [time, setTime] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [hangmanCondition, setHangmanCondition] = useState(0);
  const [defeat, setDefeat] = useState(true);
  const [stoppedTime, setStoppedTime] = useState(0);
  const [revealedWord, setRevealedWord] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showRules, setShowRules] = useState(false);


  const handleRestartGame =  () => {
    setGameStarted(true);
    clearGameStates();

    fetchWord().then(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    const readLetter = async ({ key }) => {
      console.log(key)
      if (!popupIsOpen){
        if (/[A-Za-z]$/.test(key)) {
          if (!guessedLetters.includes(key) && key.length <= 1) {
            if (!defeat) return;
            const letter = key.toLowerCase();
            if (!guessedLetters.includes(letter)) {
              if (!word.includes(letter)) {
                setHangmanCondition(prevCondition => prevCondition + 1);
                if (hangmanCondition === 6) {
                  setDefeat(true);
                  setStoppedTime(time);
                  setRevealedWord(word);
                }
              }
              setGuessedLetters(prevGuessedLetters => [...prevGuessedLetters, letter]);
            } else {
              console.log('буква уже введена');
            }
          }
        }
      }
    };

    if (hangmanCondition === 6 ) {
      setPopupMessage(defeat ? 'You lost!' : 'You won!');
      setPopupIsOpen(true);
      setLoading(true);
      window.removeEventListener("keydown", readLetter);
    }
    else{
      setPopupIsOpen(false);
    }


    window.addEventListener("keydown", readLetter);
    return () => {
      window.removeEventListener("keydown", readLetter);
    };
  }, [word, guessedLetters, defeat, hangmanCondition, popupIsOpen]);

  useEffect(() => {
    if (gameStarted) {
      const timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStarted]);
  const handlePopupClose = () => {
    setPopupIsOpen(false);
    clearGameStates();
    setLoading(false);
    setGameStarted(false);
  };

  const handleBack = () => {
    setGameStarted(false);
    clearGameStates();
  };

  const clearGameStates = () => {
    setTime(0);
    setStoppedTime(0);
    setWord('');
    setGuessedLetters([""]);
    setHangmanCondition(0);
    setDefeat(true);
    setRevealedWord('');
    setPopupIsOpen(false);
    setPopupMessage('');
  }

  useEffect(() => {
    updateCurrentDate();
  }, []);

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
      setWord(newWord);
    } catch (error) {
      console.error('Ошибка при получении слова:', error);
    }
  };

  
  const handleStartGame = async () => {
    setGameStarted(true);
    setPopupIsOpen(false)
    setLoading(true);
    fetchWord().then(()=> (setLoading(false)));
  };
  

  const renderWord = () => {
    if (!gameStarted) return null;
    return word.split('').map((letter, index) => (
      <span key={index} className="letter">
        {guessedLetters.includes(letter) ? letter : ' __ '}
      </span>
    ));
  };



  const renderHangman = () => {
    switch (hangmanCondition) {
        case 1:
          return (
            <>
              <circle cx="280" cy="140" r="40" strokeWidth="5"/>
            </>
          );
        case 2:
          return (
            <>
              <circle cx="280" cy="140" r="40" strokeWidth="5"/>
              <line x1="280" y1="180" x2="280" y2="290" strokeWidth="5" />
            </>
          );
        case 3:
          return (
            <>
              <circle cx="280" cy="140" r="40" strokeWidth="5"/>
              <line x1="280" y1="180" x2="280" y2="290" strokeWidth="5" />
              <line x1="280" y1="230" x2="200" y2="180" strokeWidth="5" />
            </>
          );
        case 4:
          return (
            <>
              <circle cx="280" cy="140" r="40" strokeWidth="5"/>
              <line x1="280" y1="180" x2="280" y2="290" strokeWidth="5" />
              <line x1="280" y1="230" x2="200" y2="180" strokeWidth="5" />
              <line x1="280" y1="230" x2="360" y2="180" strokeWidth="5" />
            </>
          );
        case 5:
          return (
            <>
              <circle cx="280" cy="140" r="40" strokeWidth="5"/>
              <line x1="280" y1="180" x2="280" y2="290" strokeWidth="5" />
              <line x1="280" y1="230" x2="200" y2="180" strokeWidth="5" />
              <line x1="280" y1="230" x2="360" y2="180" strokeWidth="5" />
              <line x1="280" y1="290" x2="220" y2="420" strokeWidth="5" />
            </>
          );
        case 6:
          return (
            <>
              <circle cx="280" cy="140" r="40" strokeWidth="5"/>
              <line x1="280" y1="180" x2="280" y2="290" strokeWidth="5" />
              <line x1="280" y1="230" x2="200" y2="180" strokeWidth="5" />
              <line x1="280" y1="230" x2="360" y2="180" strokeWidth="5" />
              <line x1="280" y1="290" x2="220" y2="420" strokeWidth="5" />
              <line x1="280" y1="290" x2="340" y2="420" strokeWidth="5" />
            </>
          );
        default:
          return null;
      }
      
  };

  const changeShowState = () => {
    setShowRules(!showRules);
  };
  return (
    <Layout>
      <div className="Main">
        {!gameStarted && (<div className={"menu-group"}>

          <img src={logo} className="App-header__img" alt="logo"/>
          <h1 className="App-header__title">Sigma - Hangman</h1>
          <p>Проверьте свою смекалку и знания английского!</p>
          <button className='start__button' onClick={handleStartGame}>Начать</button>
          <p className={"rules-summoner"} onClick={changeShowState}>Правила игры</p>

          {showRules && (<p className={"rules"}>Нажмите на кнопку "Начать" для начала игры. После этого перед вами появится экран с
            виселицей. Ваша цель - не дать человечку умереть. Сделать Вы это можете сделать, только угадав тайное слово
            на английском языке. Чтобы вводить буквы Вам нужно включить английскую раскладку на клавиатуре и нажимать на
            буквы. При правильном выборе они будут отображаться на интерфейсе, при неправильном - будут появляться части
            нашего висельника. Победа будет присуждена Вам только при полном разгадывании слова, а если же на виселице
            полностью появится человечек, то Вы проиграли. </p>)
          }
        </div>)
        }
        {gameStarted && !loading && (
          <div className='main__info-container'>
            <div className='main__info'>
              <div className='main__info-date'>Время игры: {!defeat ? stoppedTime : time} с</div>
              <div className='main__info-img'>
                <svg height="500" width="400" stroke="#fff" fill="none" strokeWidth="5">
                  <svg>
                    <line x1="120" y1="40" x2="280" y2="40"/>
                    <line x1="280" y1="40" x2="280" y2="100"/>
                    <line x1="120" y1="40" x2="120" y2="590"/>
                    <line x1="80" y1="590" x2="200" y2="590"/>
                  </svg>
                  {renderHangman()}
                </svg>
              </div>
              <div className='main__info-title'>Слово:</div>
              <div className='main__word-container'>
                <div className='word'>
                  {renderWord()}
                </div>
              </div>
            </div>
            <button className='back__button' onClick={handleBack}>↩ Выйти</button>
          </div>

        )}
        {loading && (
          <>
            <div className='main__loading'>
                Загрузка...
              </div>
              {popupIsOpen && (
                <Popup
                    isOpen={popupIsOpen}
                    message={popupMessage}
                    word={word}
                    onClose={handlePopupClose}
                    onRestart={handleRestartGame}
                />
              )}
            </>
      )}
      </div>
    </Layout>
  );
};

export default Main;
