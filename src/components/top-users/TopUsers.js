import React, {useEffect} from "react";
import "./TopUsers.css";
import axios from "axios";

export default function TopUsers() {
  const [showTop, setShowTop] = React.useState(false);
  const handleShowTop = () => setShowTop(!showTop);
  const [users, setUsers] = React.useState([]);
  useEffect(() => {
    getTopUsers().then((res) => {
      setUsers(res);
    })
  }, []);
  const getTopUsers = async () => {
    /**
     * Get top users
     * @returns {Object} Response data
     * @throws {Error} If retrieval fails
     */
    try {
      const response = await axios.get(`/users/top`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to get top users");
    }
  }

  return (
    <>{users && typeof users === "object" && users.length > 0 && (
      <div className={"top-users"}>
        <button onClick={handleShowTop} className={"open-top"}>↧ ТОП ИГРОКОВ ↧</button>
        {showTop && (
          <><h2>Top Users</h2>
            <ul className="top-users__list">
              {users.slice(0, 10).map((user, index) => (
                <li className="top-users__item" key={user.username}>
                <span><span className="top-users__rank">{index + 1}</span>
                  <span className="top-users__username">{user.username}</span></span>
                  <span className="top-users__points">{user.rating}</span>
                </li>
              ))}
            </ul>
          </>
            )}
      </div>)}
    </>
  );}