import React, { useState, useEffect } from "react";
import "./Statistics.css";
import axios from "axios";
import Layout from "../../components/layout/Layout";

export default function Statistics() {
  const [games, setGames] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() =>  {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser && localUser.id) {
      setUser(localUser);
      getAllUserGames(localUser.id).then((res) => {
        setGames(res);
      });
    }
  }, []);
  const getAllUserGames = async (user_id) => {
    /**
     * Get all games of a user
     * @param {number} user_id - User ID
     * @returns {Object} Response data
     * @throws {Error} If retrieval fails
     */
    try {
      const response = await axios.get(`/games/user/${user_id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to get user's games");
    }
  };

  const getAllUserWins = async (user_id) => {
    /**
     * Get all wins of a user
     * @param {number} user_id - User ID
     * @returns {Object} Response data
     * @throws {Error} If retrieval fails
     */
    try {
      const response = await axios.get(`/games/user/${user_id}/wins`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to get user's wins");
    }
  };

  const getAllUserLoses = async (user_id) => {
    /**
     * Get all loses of a user
     * @param {number} user_id - User ID
     * @returns {Object} Response data
     * @throws {Error} If retrieval fails
     */
    try {
      const response = await axios.get(`$/games/user/${user_id}/loses`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to get user's loses");
    }
  };


  return (
    <Layout>
      <h1>Статистика</h1>
      {user && games && games.length > 0 && (<div className="statistics">
        <div className="statistics__container">
          <div className="statistics__container__title">
          </div>
          <div className="statistics__container__table">
            <table className="statistics__table">
              <thead>
              <tr>
                <th>Слово</th>
                <th>Дата</th>
                <th>Время игры (сек)</th>
                <th>Результат</th>
              </tr>
              </thead>
              <tbody>
              {games.map(game => (
                <tr key={game.id}>
                  <td>{game.word}</td>
                  <td>{new Date(game.playDate).toLocaleString()}</td>
                  <td>{game.timePlayed}</td>
                  <td>{game.win ? 'Победа' : 'Поражение'}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>)}
      {!user && (<p>Вы не авторизованы</p>)}
      {(!games || games.length === 0) && (<p>Вы еще не играли</p>)}
    </Layout>
  );
}