import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const ChatHeader = () => {
  return (
    <div className="chat-container-header">
      <div className="profile">
        <div className="img-container">
          <img src="" />
        </div>
        <h3>Username</h3>
      </div>
      <i className="log-out-icon">
        <FontAwesomeIcon icon={faRightFromBracket} />
      </i>
    </div>
  );
};

export default ChatHeader;
