import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";
import { useState } from "react";
import "../styles/ChatContainer.css";

const ChatContainer = ({ user }) => {
  const [clickedUser, setClickedUser] = useState(null);

  return (
    <div className="chat-container">
      <ChatHeader user={user} />
      <div className="options-container">
        <button className="options" onClick={() => setClickedUser(null)}>
          Matches
        </button>
        <button className="options" disabled={!clickedUser}>
          Chat
        </button>
      </div>
      {!clickedUser && (
        <MatchesDisplay
          className="matches-display"
          matches={user.matches}
          setClickedUser={setClickedUser}
        />
      )}
      {clickedUser && (
        <ChatDisplay
          className="chat-display"
          user={user}
          clickedUser={clickedUser}
        />
      )}
    </div>
  );
};

export default ChatContainer;
