import { useState } from "react";
import axios from "axios";
import "../index.css";

const ChatInput = ({
  user,
  clickedUser,
  getUsersMessages,
  getClickedUsersMessages,
}) => {
  const [textArea, setTextArea] = useState("");
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;

  const addMessage = async () => {
    if (textArea === "") {
      return;
    }

    const message = {
      timestamp: new Date().toISOString,
      from_userId: userId,
      to_userId: clickedUserId,
      message: textArea,
    };
    try {
      await axios.post("http://localhost:5000/messages/message", { message });
      getUsersMessages();
      getClickedUsersMessages();
      setTextArea("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="chat-input">
      <textarea
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      />
      <button className="secondary-button" onClick={addMessage}>
        Submit
      </button>
    </div>
  );
};

export default ChatInput;
