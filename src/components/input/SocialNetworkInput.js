import './SocialNetworkInput.css';
import facebookLogo from "../../assets/logo/facebook-icon.svg";
import skypeLogo from "../../assets/logo/skype-icon.svg";
import Select from "react-select";
import {useState} from "react";
import {Controller} from "react-hook-form";
import {SelectOnChangeAdapter} from "../../utils/adapter/SelectOnChangeAdapter";

const DEFAULT_SOCIAL_NETWORK = {value: "Facebook", label: "Facebook"};
const SOCIAL_NETWORKS = [
    DEFAULT_SOCIAL_NETWORK,
    {value: "Skype", label: "Skype"}
];

const SOCIAL_NETWORK_ICONS = {
    "Facebook": facebookLogo,
    "Skype": skypeLogo
}

function SocialNetworkInput({name, className, control}) {
    const [socialNetwork, setSocialNetwork] = useState(DEFAULT_SOCIAL_NETWORK);
    return (
        <div className={`social-network ${className}`}>
            <div className="social-network-img-container">
                <img className="social-network__img" src={resolveLogo(socialNetwork.label)} alt="Logo"/>
            </div>
            <Controller name={name} control={control} defaultValue={DEFAULT_SOCIAL_NETWORK}
                        render={({field}) => (
                            <Select {...field} options={SOCIAL_NETWORKS} className="select social-network__select"
                                    onChange={SelectOnChangeAdapter(field, setSocialNetwork)}
                            />
                        )}
            />
        </div>
    );
}

function resolveLogo(socialNetwork) {
    return SOCIAL_NETWORK_ICONS[socialNetwork];
}

export default SocialNetworkInput;
