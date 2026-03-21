import logo from "../assets/img/netflix-logo.png";
import avatar from "../assets/img/avatar.png";

function Header() {
  return (
    <header className="main-header">
      <div className="content-wrapper">
        <div className="header-left">
          <div className="netflix-brand">
            <a href="#">
              <img src={logo} alt="Netflix" className="logo-image" />
            </a>
          </div>
          <span className="date-text">Friday, July 8th</span>
        </div>

        <div className="header-right">
          <i className="fa-solid fa-magnifying-glass fa-2x search-icon"></i>
          <div className="profile-container">
            <img src={avatar} alt="profile" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;