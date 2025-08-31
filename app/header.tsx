import { NavLink } from "react-router"
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
    return (
        <header>
            <ul className="header-menu">
                <li><NavLink to="/"><FontAwesomeIcon icon={faHome} /></NavLink></li>
                <li><NavLink to="/scanner"><FontAwesomeIcon icon={faQrcode} /></NavLink></li>
                <li><NavLink to="/about">Инфо</NavLink></li>
                <li><NavLink to="/login">Вход</NavLink></li>
            </ul>
        </header>
    )
}

export default Header