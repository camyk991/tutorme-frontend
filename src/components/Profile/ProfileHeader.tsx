import "./Profile.css";
import { useState } from "react";

import logo from "../Room/logo1.png";
import { Link } from "react-router-dom";
import { UserInfoType } from "../../API";

type Props = {
  userData: UserInfoType | undefined;
}

const ProfileHeader: React.FC<Props> = ({userData}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="profile-header">
      <div className="header-content">
        <div className="header-logo">
          <div className="logo">
            <img src={logo} alt="Site Logo" />
          </div>
        </div>
        <div className="header-links">
          <div className="header-menu" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`header-links-a ${menuOpen ? "open" : "closed"}`}>
            <div className="header-link">
              <Link to="/waiting">Oczekujące</Link>
            </div>
            <div className="header-link">
              <Link to="/lessons">Lekcje</Link>
            </div>
            <div className="header-link">
              <Link to="/post-offer">Otrzymaj pomoc</Link>
            </div>
            <div className="header-link">
              <Link to="#">Chat grupowy</Link>
            </div>
          </div>
        </div>
        <div className="header-user-pic">
          <Link to="/">
            <div className="user-pic">
              <img
                style={{ margin: 0 }}
                src={`/assets/${userData?.profileImage}`}
                alt={userData?.profileImage}
              />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
