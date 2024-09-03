import { Button } from '../Button/Button';
import moreAppsIcon from '../../assets/more-apps.svg';
import userProfileIcon from '../../assets/user-profile.svg';
import searchIcon from '../../assets/search.svg';
import help from '../../assets/navbar/help.svg'
import notification from '../../assets/navbar/notification.svg'
import settings from '../../assets/navbar/settings.svg'
import './navbar.scss';
export const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='more-apps'>
        <button >
          <img src={moreAppsIcon} width='30px' alt='moreApps' />
        </button>
      </div>
      <div className='center-content'>
        <div className='todo-home'>
          <a href=''>To Do</a>
        </div>
        <div className='search-bar-wrapper'>
          <div className='search-bar'>
          <img src={searchIcon} alt='search' width='25px'/>
          <input type='text' className='search-bar-field'/>
          </div>
        </div>
        <div className='other-options'>
          <div className="settings">
            <Button source={settings} alt='alter'/>
          </div>
          <div className="help">
          <Button source={help} alt='alter'/>
          </div>
          <div className="whats-new">
          <Button source={notification} alt='alter'/>
          </div>
        </div>
      </div>
      <div className='user-profile-icon'>
      <img src={userProfileIcon} width='30px' alt='userProfile' />
      </div>
    </div>
  );
};
// export default Navbar
