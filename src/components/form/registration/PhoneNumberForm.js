import './PhoneNumberForm.css';
import Select from "react-select";
import Button from "../../button/Button";
import PrivacyNotification from "../../PrivacyNotification";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../../App";
import {getCountriesAndDialCodes} from "../../../resources/CountriesAndCitesResource";
import Option from "../../select/Option";
import {useForm, Controller} from "react-hook-form";
import {PHONE_NUMBER, REQUIRED} from "../../../utils/Validation";
import generateConfirmationCode from "../../../services/ConfirmationCodeGeneratorService";

const DEFAULT_PHONE_CODES = [
    {value: "+380", label: "+380"}
]

function PhoneNumberForm({onSubmit}) {
    const context = useContext(Context);
    const phoneCode = context.contacts.phone.code && {value: context.contacts.phone.code, label: context.contacts.phone.code}
    const {register, handleSubmit, control, formState: {errors}} = useForm({
        mode: "onBlur",
        defaultValues: {
            "phone-number": context.contacts.phone.number,
            "phone-code": phoneCode
        }
    });

    const [phoneCodes, setPhoneCodes] = useState(DEFAULT_PHONE_CODES);
    useEffect(() => {
        getCountriesAndDialCodes()
            .then(convertToPhoneCodeOptions)
            .catch(() => DEFAULT_PHONE_CODES)
            .then(setPhoneCodes);
    }, [setPhoneCodes]);

    return (
        <form className="phone-number-form" onSubmit={handleSubmit(data => {
            fillContext(context, data);
            context.confirmationCode = generateConfirmationCode();
            onSubmit();
        })}>
            <PrivacyNotification/>
            <div className="form-frame phone-number-form-frame">
                <label htmlFor="phone-number" className="phone-number-form__label">Enter your phone number</label>
                <fieldset className="phone-number-form-fieldset">
                    <Controller name="phone-code" control={control} rules={REQUIRED}
                                render={({field}) => (
                                    <Select {...field} options={phoneCodes}
                                            className={`select phone-number-form__code-select ${errors['phone-code'] && 'invalid'}`}/>
                                )}
                    />
                    <input {...register("phone-number", PHONE_NUMBER)}
                           id="phone-number" type="text" placeholder="555 555-1234"
                           className={`input phone-number-form__number-input ${errors['phone-number'] && 'invalid'}`}/>
                </fieldset>
            </div>
            <Button className="phone-number-form__btn">Send Code</Button>
        </form>
    );
}

function fillContext(context, data) {
    context.contacts.phone.code = data['phone-code'].value;
    context.contacts.phone.number = data['phone-number'];
}

function convertToPhoneCodeOptions(dialCodesAndCounties) {
    return dialCodesAndCounties.map(dialCodeAndCountry => new Option(dialCodeAndCountry.dial_code));
}

export default PhoneNumberForm;
