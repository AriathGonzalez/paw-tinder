const Chat = ({ chronologicalMessages }) => {
  return (
    <div className="chat">
      {chronologicalMessages.map((message) => (
        <div key={message.id}>
          <div className="chat-message-header">
            <div className="img-container">
              <img src={message.img} alt={`${message.first_name} profile`} />
            </div>
            <p>{message.name}</p>
          </div>
          <div className="message-container">
            <p>{message.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chat;
