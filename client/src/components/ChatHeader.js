import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const ChatHeader = () => {
  return (
    <div className="chat-header-container">
      <div className="profile">
        <div className="img-container">
          <img src="" alt="Profile" />
        </div>
        <h3>Username</h3>
      </div>
      <i className="log-out-icon">
        <FontAwesomeIcon
          icon={faRightFromBracket}
          style={{ transform: "scaleX(-1)" }}
        />
      </i>
    </div>
  );
};

export default ChatHeader;
