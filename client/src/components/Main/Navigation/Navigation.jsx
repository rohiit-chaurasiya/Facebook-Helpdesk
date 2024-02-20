import inbox_icon from "./Logo/inbox_white.svg";
import people_icon from "./Logo/people_white.svg";
import facebook from "./Logo/facebook.svg";
import logout_icon from "./Logo/logout_white.svg";

import "./Navigation.css";
import facebookLogout from '../../facebookSDK/facebookLogout';

export default function Navigation() {
    return (
        <div className='navbar'>
            <img className="nav_logo" src={facebook} />
            <ul className='nav-list'>
                <li className="nav-item"><img src={inbox_icon} alt="inbox" className='inbox' /></li>
                <li className="nav-item"><img src={people_icon} alt="people" className='people' /></li>
                <li className="nav-item" onClick={facebookLogout}><img src={logout_icon} alt='logout' className='logout' /></li>
            </ul>
        </div>
    );
}