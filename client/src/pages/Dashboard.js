import TinderCard from "react-tinder-card";
import ChatContainer from "../components/ChatContainer";
import { useState } from "react";
import "../styles/Dashboard.css";

const db = [
  {
    name: "Richard Hendricks",
    url: "https://imgur.com/49PZq2n.jpg",
  },
  {
    name: "Erlich Bachman",
    url: "https://imgur.com/vrVUa4o.jpg",
  },
  {
    name: "Monica Hall",
    url: "https://imgur.com/uQdduE0.jpg",
  },
  {
    name: "Jared Dunn",
    url: "https://imgur.com/Sew5x7A.jpg",
  },
  {
    name: "Dinesh Chugtai",
    url: "https://imgur.com/h44HwRY.jpg",
  },
];

const Dashboard = () => {
  const characters = db;
  const [lastDirection, setLastDirection] = useState(null);

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div className="dashboard">
      <ChatContainer />
      <div className="swipe-container">
        <div className="card-container">
          {characters.map((character) => (
            <TinderCard
              className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}
            >
              <div
                style={{ backgroundImage: "url(" + character.url + ")" }}
                className="card"
              >
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          ))}
        </div>
        <div className="swipe-info">
          {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
