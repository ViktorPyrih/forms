import './ProfileContactsForm.css';
import mailIcon from "../../../assets/mail-icon.svg";
import phoneIcon from "../../../assets/phone-icon.svg";
import FormHeader from "../../header/FormHeader";
import IconInput from "../../input/IconInput";
import Button from "../../button/Button";
import SocialNetworkContact from "../SocialNetworkContact";
import {useContext, useState} from "react";
import ArrowIcon from "../../icon/ArrowIcon";
import PlusIcon from "../../icon/PlusIcon";
import {Context} from "../../../App";
import {useForm} from "react-hook-form";
import {SOCIAL_CONTACT} from "../../../utils/Validation";

const SOCIAL_CONTACT_PREFIX = "social-contact";

function ProfileContactsForm({onSubmit}) {
    const context = useContext(Context);
    const {register, handleSubmit, control} = useForm({
        mode: "onBlur",
        defaultValues: {
            "email": context.contacts.email,
            "phone-number": `${context.contacts.phone.code}${context.contacts.phone.number}`
        }
    });

    const [socialNetworkContacts, setSocialNetworkContacts] = useState([]);

    return (
        <form className="profile-contacts-form" onSubmit={handleSubmit(data => {
            fillContext(context, data);
            onSubmit();
        })}>
            <fieldset className="form-frame profile-contacts-form-fieldset">
                <fieldset className="profile-contacts-form-contacts">
                    <FormHeader title="Contacts">
                        These contacts are used to inform about orders
                    </FormHeader>
                    <IconInput img={mailIcon} register={register("email", {disabled: true})}/>
                    <IconInput img={phoneIcon} register={register("phone-number", {disabled: true})}/>
                </fieldset>
                <fieldset className="profile-contacts-form-social">
                    <FormHeader title="Social network">
                        Indicate the desired communication method
                    </FormHeader>
                    {
                        socialNetworkContacts.map((_, i) => (
                            <SocialNetworkContact key={i} register={register(`${SOCIAL_CONTACT_PREFIX}-${i}`, SOCIAL_CONTACT)}
                                                  control={control}/>
                        ))
                    }
                    <button type="button" className="profile-contacts-form-social__add-btn"
                            onClick={() => {
                                const contacts = socialNetworkContacts.slice();
                                contacts.push({});
                                setSocialNetworkContacts(contacts);
                            }
                    }>
                        <PlusIcon/>Add more
                    </button>
                </fieldset>
            </fieldset>
            <Button>
                Go next<ArrowIcon/>
            </Button>
        </form>
    );
}

function fillContext(context, data) {
    context.socialNetworkProfiles = Object.keys(data)
        .filter(key => key.startsWith(SOCIAL_CONTACT_PREFIX) && !key.endsWith("network"))
        .map(key => (
            {
                networkName: data[`${key}-network`].value,
                username: data[key]
            })
        );
}

export default ProfileContactsForm;
