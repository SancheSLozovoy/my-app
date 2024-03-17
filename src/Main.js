import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { format, addSeconds } from 'date-fns';

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
          543543543
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
