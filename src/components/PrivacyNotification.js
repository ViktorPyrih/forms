import './PrivacyNotification.css';
import lockIcon from '../assets/lock-icon.svg';
import closeIcon from '../assets/close-icon-small.svg';
import IconButton from "./button/IconButton";
import {useRef} from "react";

function PrivacyNotification() {
    const selfRef = useRef();
    return (
        <div ref={selfRef} className="privacy-notification">
            <img src={lockIcon} alt="Lock" className="privacy-notification__lock"/>
            <p className="privacy-notification__text">
                We take privacy issues seriously.
                You can be sure that your personal data is securely protected.
            </p>
            <IconButton onClick={() => close(selfRef.current)}>
                <img src={closeIcon} alt="Close" className="privacy-notification__img"/>
            </IconButton>
        </div>
    );
}

function close(element) {
    element.style.display = "none"
}

export default PrivacyNotification;
