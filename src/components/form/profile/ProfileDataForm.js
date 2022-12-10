import './ProfileDataForm.css';
import LabeledInput from "../../input/LabeledInput";
import LabeledSelect from "../../select/LabeledSelect";
import LabeledCalendar from "../../LabeledCalendar";
import Notice from "../Notice";
import Button from "../../button/Button";
import FormHeader from "../../header/FormHeader";
import ArrowIcon from "../../icon/ArrowIcon";
import {useContext, useEffect, useState} from "react";
import {getCountriesAndCities} from "../../../resources/CountriesAndCitesResource";
import Option from "../../select/Option";
import {Context} from "../../../App";
import {useForm} from "react-hook-form";
import {FIRST_NAME, REQUIRED, SECOND_NAME} from "../../../utils/Validation";

const DEFAULT_PLACES = [
    {value: "Kiev, Ukraine", label: "Kiev, Ukraine"},
    {value: "London, UK", label: "London, UK"},
    {value: "New York, USA", label: "New York, USA"}
];

function ProfileDataForm({onSubmit}) {
    const context = useContext(Context);
    const {register, handleSubmit, control, formState: {errors}} = useForm({
        mode: "onBlur"
    });

    const [places, setPlaces] = useState(DEFAULT_PLACES);
    useEffect(() => {
       getCountriesAndCities()
           .then(countriesAndCities => countriesAndCities.flatMap(countryAndCities => convertToPlaces(countryAndCities)))
           .catch(() => DEFAULT_PLACES)
           .then(places => setPlaces(places));
    }, [setPlaces]);
    return (
        <form className="profile-data-form" onSubmit={handleSubmit(data => {
            fillContext(context, data);
            onSubmit();
        })}>
            <div className="profile-data-form-agreement">
                <input {...register("agree-checkbox", REQUIRED)} id="agree-checkbox" type="checkbox"
                       className="profile-data-form__agree-checkbox"/>
                <label htmlFor="agree-checkbox" className={`profile-data-form__agree-label ${errors['agree-checkbox'] && "invalid"}`}>
                    I agree with <a href="/src/pages" className="terms-of-use">Terms of use</a>
                </label>
            </div>
            <fieldset className="form-frame profile-data-form-personal-data">
                <FormHeader title="Personal data">
                    Specify exactly as in your passport
                </FormHeader>
                <LabeledInput id="first-name" label="First name" placeholder="Alexander"
                              register={register("first-name", FIRST_NAME)} error={errors['first-name']}/>
                <LabeledInput id="second-name" label="Second name" placeholder="Smith"
                              register={register("second-name", SECOND_NAME)} error={errors['second-name']}/>
                <div className="profile-data-form-birth-info">
                    <LabeledCalendar name="dob" label="Date of Birth" control={control}/>
                    <LabeledSelect name="place-of-birth" id="place-of-birth" label="Place of Birth" options={places}
                                   control={control}/>
                </div>
            </fieldset>
            <Notice message="✓ Your Phone">
                {`${context.contacts.phone.code}${context.contacts.phone.number}`}
            </Notice>
            <Button className="profile-data-form__btn">
                Go next<ArrowIcon/>
            </Button>
        </form>
    );
}

function fillContext(context, data) {
    context.personalData.firstName = data['first-name'];
    context.personalData.secondName = data['second-name'];
    context.personalData.dob = data['dob'];
    context.personalData.placeOfBirth = data['place-of-birth'].value;
}

function convertToPlaces(countryAndCities) {
    return countryAndCities.cities
        .map(city => new Option(`${city}, ${countryAndCities.country}`));
}

export default ProfileDataForm;
