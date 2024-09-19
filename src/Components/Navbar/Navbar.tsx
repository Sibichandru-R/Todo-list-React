import { Button } from '../Button/Button';
import moreAppsIcon from '../../assets/images/more-apps.svg';
import userProfileIcon from '../../assets/images/user-profile.svg';
import searchIcon from '../../assets/images/search.svg';
import help from '../../assets/images/navbar/help.svg'
import notification from '../../assets/images/navbar/notification.svg'
import settings from '../../assets/images/navbar/settings.svg'
import './navbar.scss';
export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="more-apps">
        <button onClick={() => window.localStorage.clear()}>
          <img src={moreAppsIcon} width="30px" alt="moreApps" />
        </button>
      </div>
      <div className="center-content">
        <div className="todo-home">
          <a href="">To Do</a>
        </div>
        <div className="search-bar-wrapper">
          <div className="search-bar">
            <img src={searchIcon} alt="search" width="25px" />
            <input type="text" className="search-bar-field" />
          </div>
        </div>
        <div className="other-options">
          <div className="settings">
            <Button source={settings} alt="alter" handleClick={() => null} />
          </div>
          <div className="help">
            <Button source={help} alt="alter" handleClick={() => null} />
          </div>
          <div className="whats-new">
            <Button
              source={notification}
              alt="alter"
              handleClick={() => null}
            />
          </div>
        </div>
      </div>
      <div className="user-profile-icon">
        <img src={userProfileIcon} width="30px" alt="userProfile" />
      </div>
    </div>
  );
};
// export default Navbar
