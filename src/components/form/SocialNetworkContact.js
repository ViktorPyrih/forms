import './SocialNetworkContact.css';
import SocialNetworkInput from "../input/SocialNetworkInput";
import {useFormState} from "react-hook-form";

function SocialNetworkContact({register, control}) {
    const {errors} = useFormState({control});
    return (
        <div className="social-network-contact">
            <SocialNetworkInput name={`${register.name}-network`} className="social-network-contact__network" control={control}/>
            <input {...register} type="text" placeholder="@"
                   className={`input social-network-contact__input ${errors[register.name] && "invalid"}`}/>
        </div>
    );
}

export default SocialNetworkContact;
