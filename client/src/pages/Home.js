import Nav from "../components/Nav";
import AuthModal from "../components/AuthModal";
import { useState } from "react";
import { useCookies } from "react-cookie";
import "../styles/Homepage.css";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [cookies, , removeCookie] = useCookies(["user"]);
  const authToken = cookies.AuthToken;

  const handleClick = () => {
    if (authToken) {
      removeCookie("UserId", cookies.UserId);
      removeCookie("AuthToken", cookies.AuthToken);
      window.location.reload();
      return;
    }
    setShowModal(true);
    setIsSignUp(true);
  };

  return (
    <div className="overlay">
      <Nav
        authToken={authToken}
        minimal={false}
        showModal={showModal}
        setShowModal={setShowModal}
        setIsSignUp={setIsSignUp}
      />
      <div className="home">
        <h1 className="primary-title">Sniff Right®</h1>
        <button className="primary-button" onClick={handleClick}>
          {authToken ? "Signup" : "Create Account"}
        </button>
        {showModal && (
          <AuthModal
            setShowModal={setShowModal}
            isSignUp={isSignUp}
            setIsSignUp={setIsSignUp}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
