import { useEffect, useState, useCallback } from "react";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import axios from "axios";

const ChatDisplay = ({ user, clickedUser }) => {
  const [userMessages, setUserMessages] = useState(null);
  const [clickedUserMessages, setClickedUserMessages] = useState(null);

  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;

  const messages = [];
  userMessages?.forEach((message) => {
    const formattedMsg = {};
    formattedMsg["name"] = user?.first_name;
    formattedMsg["img"] = user?.url;
    formattedMsg["message"] = message.message;
    formattedMsg["timestamp"] = message.timestamp;
    formattedMsg["id"] = message._id;
    messages.push(formattedMsg);
  });
  clickedUserMessages?.forEach((message) => {
    const formattedMsg = {};
    formattedMsg["name"] = clickedUser?.first_name;
    formattedMsg["img"] = clickedUser?.url;
    formattedMsg["message"] = message.message;
    formattedMsg["timestamp"] = message.timestamp;
    formattedMsg["id"] = message._id;
    messages.push(formattedMsg);
  });

  const chronologicalMessages = messages?.sort((a, b) => {
    if (a.timestamp && b.timestamp) {
      return a.timestamp.localeCompare(b.timestamp);
    }
    return 0;
  });

  const getUsersMessages = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/messages/", {
        params: { userId: userId, correspondingUserId: clickedUserId },
      });
      setUserMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [userId, clickedUserId]);

  const getClickedUsersMessages = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/messages/", {
        params: { userId: clickedUserId, correspondingUserId: userId },
      });
      setClickedUserMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [clickedUserId, userId]);

  useEffect(() => {
    getUsersMessages();
    getClickedUsersMessages();
  }, [getUsersMessages, getClickedUsersMessages]);

  return (
    <>
      <Chat chronologicalMessages={chronologicalMessages} />
      <ChatInput
        user={user}
        clickedUser={clickedUser}
        getUsersMessages={getUsersMessages}
        getClickedUsersMessages={getClickedUsersMessages}
      />
    </>
  );
};

export default ChatDisplay;
