import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const ChatHeader = ({ user }) => {
  const [cookies, , removeCookie] = useCookies(["user"]);

  let navigate = useNavigate();

  const logout = () => {
    removeCookie("UserId", cookies.UserId);
    removeCookie("AuthToken", cookies.AuthToken);
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="chat-header-container">
      <div className="profile">
        <div className="img-container">
          <img src={user.url} alt={"Profile of: " + user.first_name} />
        </div>
        <h3>{user.first_name}</h3>
      </div>
      <i className="log-out-icon" onClick={logout}>
        <FontAwesomeIcon
          icon={faRightFromBracket}
          style={{ transform: "scaleX(-1)", cursor: "pointer" }}
        />
      </i>
    </div>
  );
};

export default ChatHeader;
