import './PhoneNumberConfirmationForm.css';
import refreshIcon from '../../../assets/refresh-icon.svg';
import Button from "../../button/Button";
import Notice from "../Notice";
import {useContext} from "react";
import {Context} from "../../../App";
import {useForm} from "react-hook-form";
import {CONFIRMATION_CODE} from "../../../utils/Validation";
import generateConfirmationCode from "../../../services/ConfirmationCodeGeneratorService";

function PhoneNumberConfirmationForm({onSubmit, onPhoneNumberEdit}) {
    const context = useContext(Context);

    const {register, handleSubmit, resetField, setError, formState: {errors}} = useForm();
    if (errors['confirmation-code']?.type === "validate") {
        resetField("confirmation-code");
        setError("confirmation-code", {type: "required"});
    }

    return (
        <form className="phone-confirmation-form" onSubmit={handleSubmit(onSubmit)}>
            <Notice message="Number not confirmed yet" editable={true} onEdit={onPhoneNumberEdit}>
                {`${context.contacts.phone.code}${context.contacts.phone.number}`}
            </Notice>
            <div className="phone-confirmation-form-code-container">
                <label htmlFor="confirmation-code" className="label label_color_dark phone-confirmation-form__code-label">
                    Confirmation code
                </label>
                <div className="confirmation-code-container-wrapper">
                    <div className="confirmation-code-container">
                        <input {...register("confirmation-code", {...CONFIRMATION_CODE, validate: code => validateConfirmationCode(code, context.confirmationCode)})}
                               id="confirmation-code" placeholder="————"
                               className={`input phone-confirmation-form__code-input ${errors['confirmation-code'] && "invalid"}`}/>
                        <p className="phone-confirmation-form__code-notice">
                            Confirm phone number with code from sms message
                        </p>
                    </div>
                    <button type="button" className="confirmation-code-container-btn" onClick={() => resetConfirmationCode(resetField, context)}>
                        <img src={refreshIcon} alt="Refresh" className="confirmation-code-container-btn__img"/>
                        <p className="confirmation-code-container-btn__text">Send again</p>
                    </button>
                </div>
            </div>
            <Button className="phone-confirmation-form__btn">Confirm</Button>
        </form>
    );
}

function validateConfirmationCode(code, confirmationCode) {
    return code === confirmationCode;
}

function resetConfirmationCode(resetField, context) {
    resetField("confirmation-code");
    context.confirmationCode = generateConfirmationCode();
}

export default PhoneNumberConfirmationForm;
