import TinderCard from "react-tinder-card";
import ChatContainer from "../components/ChatContainer";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [lastDirection, setLastDirection] = useState(null);
  const [user, setUser] = useState(null);
  const [genderedUsers, setGenderedUsers] = useState(null);
  const [cookies, ,] = useCookies(["user"]);
  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users/user", {
        params: { userId },
      });
      console.log("response: ", response);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGenderedUsers = async () => {
    try {
      console.log("user interest: ", user?.gender_interest);
      const response = await axios.get(
        "http://localhost:5000/users/gendered_users",
        {
          params: { gender: user?.gender_interest },
        }
      );
      setGenderedUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateMatches = async (matchedUserId) => {
    console.log("matched with: ", matchedUserId);
    try {
      await axios.put("http://localhost:5000/users/add_match", {
        userId,
        matchedUserId,
      });
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const swiped = (direction, swipedUserId) => {
    console.log("swiped on: ", swipedUserId);
    if (direction === "right") {
      updateMatches(swipedUserId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const matchedUserIds = user?.matches
    .map(({ user_id }) => user_id)
    .concat(userId);

  const filteredGenderedUsers = genderedUsers?.filter(
    (genderedUser) => !matchedUserIds?.includes(genderedUser.user_id)
  );

  useEffect(() => {
    getUser();
    getGenderedUsers();
  }, [userId, user]);

  return (
    <>
      {user && (
        <div className="dashboard">
          <ChatContainer user={user} />
          <div className="swipe-container">
            <div className="card-container">
              {filteredGenderedUsers?.map((genderedUser) => (
                <TinderCard
                  className="swipe"
                  key={genderedUser.user_id}
                  onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                  onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
                >
                  <div
                    style={{ backgroundImage: "url(" + genderedUser.url + ")" }}
                    className="card"
                  >
                    <h3>{genderedUser.first_name}</h3>
                  </div>
                </TinderCard>
              ))}
            </div>
            <div className="swipe-info">
              {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
