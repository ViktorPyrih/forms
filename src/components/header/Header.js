import './Header.css';
import logo from '../../assets/logo.svg';
import closeIcon from '../../assets/close-icon.svg';
import IconButton from "../button/IconButton";

function Header() {
    return (
        <header className="wrapper header">
            <div className="logo-container">
                <img src={logo} className="logo-container__logo" alt="Logo"/>
                <h2 className="logo-container__title">COMPANY NAME</h2>
            </div>
            <IconButton>
                <img src={closeIcon} alt="Close" className="header__close-icon"/>
            </IconButton>
        </header>
    );
}

export default Header;
