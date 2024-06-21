import Nav from "../components/Nav";
import AuthModal from "../components/AuthModal";
import { useState } from "react";
import "../styles/Homepage.css";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const authToken = false;

  const handleClick = () => {
    console.log("home, create account clicked!");
    setShowModal(true);
  };

  return (
    <div className="overlay">
      <Nav
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
