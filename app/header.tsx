import { NavLink } from "react-router"

const Header = () => {
    return (
        <header>
            <ul className="header-menu">
                <li><NavLink to="/">FSA</NavLink></li>
                <li><NavLink to="/scanner">Сканер</NavLink></li>
                <li><NavLink to="/about">О сайте</NavLink></li>
            </ul>
        </header>
    )
}

export default Header