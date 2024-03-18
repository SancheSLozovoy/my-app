import React, { useState, useEffect } from 'react';
import Layout from './Layout';

const Main = () => {
  const [time, setTime] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    // Update current date when the component mounts
    updateCurrentDate();
  }, []);

  useEffect(() => {
    // Start the timer if the game has started
    if (gameStarted) {
      const timer = setInterval(() => {
        // Increment time by 1 second
        setTime(prevTime => prevTime + 1);
      }, 1000); // 1000 milliseconds = 1 second

      // Cleanup function to clear the interval when the component unmounts or when the game ends
      return () => clearInterval(timer);
    }
  }, [gameStarted]);

  // Function to update the current date
  const updateCurrentDate = () => {
    const currentDateObj = new Date();
    const day = currentDateObj.getDate().toString().padStart(2, '0');
    const month = (currentDateObj.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = currentDateObj.getFullYear();
    setCurrentDate(`${day}.${month}.${year}`);
  };

  // Function to format seconds to HH:MM:SS
  const formatTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const gameContainer = (
    <div className='main__info-container'>
      <div className='main__info'>
        <div className='main__info-date'>Время игры: {formatTime()}</div>
        <div className='main__info-date'>Дата игры: {currentDate}</div>
        <div className='main__info-img'>
    <svg height="500" width="400" stroke="rgba(167, 114, 67, 1)" fill="none" stroke-width="2" >
        <line x1="120" y1="40" x2="280" y2="40" />
        <line x1="280" y1="40" x2="280" y2="100" />
        <line x1="120" y1="40" x2="120" y2="590" />
        <line x1="80" y1="590" x2="200" y2="590" />

        <circle v-if="condition >= 1" cx="280" cy="140" r="40" />
        <line v-if="condition >= 2" x1="280" y1="180" x2="280" y2="290" />
        <line v-if="condition >= 3" x1="280" y1="230" x2="200" y2="180" />
        <line v-if="condition >= 4" x1="280" y1="230" x2="360" y2="180" />
        <line v-if="condition >= 5" x1="280" y1="290" x2="220" y2="420" />
        <line v-if="condition >= 6" x1="280" y1="290" x2="340" y2="420" />
    </svg>

        </div>
        <div className='main__info-title'>Cлово</div>
        <div className='main__word-container'>
            
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="Main">
        {!gameStarted && <button onClick={handleStartGame} className='star__button'>Начать</button>}
        {gameStarted && gameContainer}
      </div>
    </Layout>
  );
};

export default Main;
