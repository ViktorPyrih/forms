import './RegistrationForm.css';
import Notice from "../Notice";
import LabeledInput from "../../input/LabeledInput";
import Button from "../../button/Button";
import {useContext} from "react";
import {Context} from "../../../App";
import {useForm} from "react-hook-form";
import {EMAIL, REQUIRED} from "../../../utils/Validation";

function RegistrationForm({onSubmit}) {
    const context = useContext(Context);
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur"
    });
    return (
        <form className="login-form" onSubmit={handleSubmit(data => {
            fillContext(context, data);
            onSubmit();
        })}>
            <Notice message="✓ Number confirmed">
                {`${context.contacts.phone.code}${context.contacts.phone.number}`}
            </Notice>
            <fieldset className="form-frame login-form-fieldset">
                <LabeledInput id="email" label="Enter your email" placeholder="example@example.com"
                              register={register("email", EMAIL)} error={errors['email']}/>
                <LabeledInput id="password" type="password" label="Set a password"
                              register={register("password", REQUIRED)} error={errors['password']}/>
            </fieldset>
            <Button primary className="login-form__btn">Register Now</Button>
        </form>
    );
}

function fillContext(context, data) {
    context.contacts.email = data.email;
}

export default RegistrationForm;
