import colorLogo from "../images/paw_tinder_logo.png";
import blackLogo from "../images/paw_tinder_logo_black.png";
import "../styles/Nav.css";

const Nav = ({ minimal, showModal, setShowModal, setIsSignUp }) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false); // TODO: Reminder - may not need setIsSignUp
  };

  const authToken = true;

  return (
    <nav>
      <div className="logo-container">
        <img
          className="logo"
          src={minimal ? colorLogo : blackLogo}
          alt="Logo"
        />
      </div>

      {!authToken && !minimal && (
        <button
          className="nav-button"
          onClick={handleClick}
          disabled={showModal}
        >
          Log In
        </button>
      )}
    </nav>
  );
};

export default Nav;