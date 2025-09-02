import { NavLink } from "react-router"
import { faHome, faCircleInfo, faQrcode, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
    return (
        <header>
            <ul className="header-menu">
                <li><NavLink to="/"><FontAwesomeIcon icon={faHome} title="Домашняя страница" /></NavLink></li>
                <li><NavLink to="/scanner"><FontAwesomeIcon icon={faQrcode} title="Сканнер"/></NavLink></li>
                <li><NavLink to="/about"><FontAwesomeIcon icon={faCircleInfo} title="О сайте" /></NavLink></li>
                <li><NavLink to="/login"><FontAwesomeIcon icon={faRightToBracket} title="Вход/Выход"/></NavLink></li>
            </ul>
        </header>
    )
}

export default Header