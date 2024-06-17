import colorLogo from "../images/paw_tinder_logo.png";
import whiteLogo from "../images/paw_tinder_logo.png"; // TODO: Make another logo, but w/ white color
import "../styles/Nav.css";

const Nav = ({ minimal, authToken }) => {
  return (
    <nav>
      <div className="logo-container">
        <img
          className="logo"
          src={minimal ? colorLogo : whiteLogo}
          alt="Logo"
        />
      </div>

      {!authToken && !minimal && <button className="nav-button">Log in</button>}
    </nav>
  );
};

export default Nav;
