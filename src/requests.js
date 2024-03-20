import axios from "axios";
/**
 * URL of the API
 * @type {string}
 */
const URL = "http://localhost:8080/api";

/**
 * Username for authentication
 * @type {string}
 */
const USERNAME = "SancheSLozovoi";

/**
 * Password for authentication
 * @type {string}
 */
const PASSWORD = "qweqwe123";

/**
 * New user rating
 * @type {number}
 */
const NEW_RATING = 700;

/**
 * Base64 encoded image for the new picture
 * @type {string}
 */
const NEW_PICTURE = "---- BASE64 encoded image ----";

/**
 * New username for the user
 * @type {string}
 */
const NEW_USERNAME = "SancheSLozovoiXXX";

/**
 * Example word for game
 * @type {string}
 */
const WORD = "example";

/**
 * Date and time of the game play
 * @type {string}
 */
const PLAY_DATE = "2024-03-15T18:47:37.399000";

/**
 * Total time played in seconds
 * @type {number}
 */
const TIME_PLAYED = 900;

/**
 * Boolean indicating if the user won the game
 * @type {boolean}
 */
const WIN = true;

/**
 * User ID for the current user
 * @type {number}
 */
const USER_ID = 1;

const register = async () => {
  /**
   * Register a user
   * @returns {Object} Response data
   * @throws {Error} If registration fails
   */
  try {
    const response = await axios.post(`${URL}/users/register`, {
      username: USERNAME,
      password: PASSWORD,
    });
    return response.data;
  } catch (error) {
    throw new Error("Registration failed");
  }
};

const login = async () => {
  /**
   * Login a user
   * @returns {Object} Response data
   * @throws {Error} If login fails
   */
  try {
    const response = await axios.post(`${URL}/users/login`, {
      username: USERNAME,
      password: PASSWORD,
    });
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

const getTopUsers = async () => {
  /**
   * Get top users
   * @returns {Object} Response data
   * @throws {Error} If retrieval fails
   */
  try {
    const response = await axios.get(`${URL}/users/top`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get top users");
  }
};

const updateUsersRating = async (user_id) => {
  /**
   * Update user's rating
   * @param {number} user_id - User ID
   * @returns {Object} Response data
   * @throws {Error} If update fails
   */
  try {
    const response = await axios.put(`${URL}/users/${user_id}/rating`, {
      rating: NEW_RATING,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user's rating");
  }
};

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

const updateUsersUsername = async (user_id) => {
  /**
   * Update user's username
   * @param {number} user_id - User ID
   * @returns {Object} Response data
   * @throws {Error} If update fails
   */
  try {
    const response = await axios.put(`${URL}/users/${user_id}/username`, {
      username: NEW_USERNAME,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user's username");
  }
};


const deleteUser = async (user_id) => {
  /**
   * Delete a user
   * @param {number} user_id - User ID
   * @returns {Object} Response data
   * @throws {Error} If deletion fails
   */
  try {
    const response = await axios.delete(`${URL}/users/${user_id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};

const deleteUsersPicture = async (user_id) => {
  /**
   * Delete user's profile picture
   * @param {number} user_id - User ID
   * @returns {Object} Response data
   * @throws {Error} If deletion fails
   */
  try {
    const response = await axios.delete(`${URL}/users/${user_id}/picture`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete user's profile picture");
  }
};

const getAllUserGames = async (user_id) => {
  /**
   * Get all games of a user
   * @param {number} user_id - User ID
   * @returns {Object} Response data
   * @throws {Error} If retrieval fails
   */
  try {
    const response = await axios.get(`${URL}/games/user/${user_id}`);
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
    const response = await axios.get(`${URL}/games/user/${user_id}/wins`);
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
    const response = await axios.get(`${URL}/games/user/${user_id}/loses`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get user's loses");
  }
};

const createGame = async (user_id) => {
  /**
   * Create a game
   * @param {number} user_id - User ID
   * @returns {Object} Response data
   * @throws {Error} If creation fails
   */
  try {
    const GAME_BODY = {
      word: WORD,
      playDate: PLAY_DATE,
      timePlayed: TIME_PLAYED,
      win: WIN,
      user_id: USER_ID,
    };
    const response = await axios.post(`${URL}/games/create`, GAME_BODY);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create game");
  }
};
