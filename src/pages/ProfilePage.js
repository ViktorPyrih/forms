import PageHeader from "../components/header/PageHeader";
import {useContext, useState} from "react";
import Header from "../components/header/Header";
import ProfileDataForm from "../components/form/profile/ProfileDataForm";
import ProfileContactsForm from "../components/form/profile/ProfileContactsForm";
import DeliveryAddressForm from "../components/form/profile/DeliveryAddressForm";
import {Context} from "../App";

function ProfilePage() {
    const context = useContext(Context);
    const [step, setStep] = useState(1);
    return (
        <>
            <Header/>
            <div className="page profile-page">
                <PageHeader step={step} title="Profile info">
                    Fill in the data for profile. It will take a couple of minutes.
                    You only need a passport
                </PageHeader>
                {
                    resolveForm(step, () => setStep(step + 1), () => console.log(JSON.stringify(context, null, 2)))
                }
            </div>
        </>
    );
}

function resolveForm(step, onSubmit, onDeliveryAddressFormSubmit) {
    switch (step) {
        case 1: return <ProfileDataForm onSubmit={onSubmit}/>;
        case 2: return <ProfileContactsForm onSubmit={onSubmit}/>;
        default: return <DeliveryAddressForm onSubmit={onDeliveryAddressFormSubmit}/>;
    }
}

export default ProfilePage;
