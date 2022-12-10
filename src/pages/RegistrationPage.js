import {useState} from "react";
import RegistrationForm from "../components/form/registration/RegistrationForm";
import PhoneNumberForm from "../components/form/registration/PhoneNumberForm";
import PhoneNumberConfirmationForm from "../components/form/registration/PhoneNumberConfirmationForm";
import PageHeader from "../components/header/PageHeader";
import Header from "../components/header/Header";
import {useNavigate} from "react-router";

function RegistrationPage() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    return (
        <>
            <Header/>
            <div className="page registration-page">
                <PageHeader step={step} title="Registration">
                    Fill in the registration data. It will take a couple of minutes.
                    All you need is a phone number and e-mail
                </PageHeader>
                {
                    resolveForm(step, () => setStep(step + 1),
                        () => setStep(step - 1), () => navigate("/profile"))
                }
            </div>
        </>
    );
}

function resolveForm(step, onSubmit, onPhoneNumberEdit, onRegistrationFormSubmit) {
    switch (step) {
        case 1: return <PhoneNumberForm onSubmit={onSubmit}/>;
        case 2: return <PhoneNumberConfirmationForm onSubmit={onSubmit} onPhoneNumberEdit={onPhoneNumberEdit}/>;
        default: return <RegistrationForm onSubmit={onRegistrationFormSubmit}/>;
    }
}

export default RegistrationPage;
