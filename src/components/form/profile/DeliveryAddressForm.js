import './DeliveryAddressForm.css';
import FormHeader from "../../header/FormHeader";
import LabeledInput from "../../input/LabeledInput";
import LabeledSelect from "../../select/LabeledSelect";
import Button from "../../button/Button";
import {useContext, useEffect, useMemo, useState} from "react";
import {getCountriesAndCities} from "../../../resources/CountriesAndCitesResource";
import Option from "../../select/Option";
import {Context} from "../../../App";
import {useForm} from "react-hook-form";
import {ADDRESS, ZIP_CODE} from "../../../utils/Validation";

const DEFAULT_COUNTRIES_AND_CITIES = [
    {
        country: "Ukraine",
        cities: [
            "Kiev"
        ]
    }
];

const DEFAULT_CITY = "";
const DEFAULT_COUNTRY = "Ukraine";

function DeliveryAddressForm({onSubmit}) {
    const context = useContext(Context);
    const {register, handleSubmit, control, formState: {errors}, watch, resetField} = useForm({
        mode: 'onBlur',
        defaultValues: {
            city: new Option(DEFAULT_CITY),
            country: new Option(DEFAULT_COUNTRY)
        }
    });

    const [countriesAndCities, setCountriesAndCities] = useState(DEFAULT_COUNTRIES_AND_CITIES);
    const country = watch("country").value;

    useEffect(() => {
        getCountriesAndCities()
            .then(setCountriesAndCities)
            .catch(() => DEFAULT_COUNTRIES_AND_CITIES);
    }, [setCountriesAndCities]);

    const countries = useMemo(() => convertToCountryOptions(countriesAndCities), [countriesAndCities]);
    const cities = extractCityOptionsForCountry(countriesAndCities, country);

    return (
        <form className="delivery-address-form" onSubmit={handleSubmit(data => {
            fillContext(context, data);
            onSubmit();
        })}>
            <fieldset className="form-frame delivery-address-form-fieldset">
                <FormHeader title="Delivery address">
                    Used for shipping orders
                </FormHeader>
                <LabeledInput id="address" type="text" label="Address"
                              register={register("address", ADDRESS)} error={errors['address']}/>
                <LabeledSelect id="city" name="city" label="City" options={cities} control={control}/>
                <div className="delivery-address-form-fieldset-country-zip-code-wrapper">
                    <LabeledSelect id="country" name="country" label="Country" options={countries}
                                   onChange={() => resetField("city")} control={control}/>
                    <LabeledInput id="zip-code" type="text" label="Zip code" className="delivery-address-form-fieldset__zip-code"
                                  register={register("zip-code", ZIP_CODE)} error={errors['zip-code']}/>
                </div>
                <LabeledInput id="optional" type="text" label="Optional" register={register("optional")}/>
            </fieldset>
            <Button primary className="delivery-address-form__btn">
                ✓ Save
            </Button>
        </form>
    )
}

function fillContext(context, data) {
    context.deliveryAddress.address = data['address'];
    context.deliveryAddress.city = data['city'].value;
    context.deliveryAddress.country = data['country'].value;
    context.deliveryAddress.zipCode = data['zip-code'];
    context.deliveryAddress.optional = data['optional'];
}

function convertToCountryOptions(countriesAndCities) {
    return countriesAndCities.map(countryAndCities => new Option(countryAndCities.country));
}

function extractCityOptionsForCountry(countriesAndCities, country) {
    return countriesAndCities
        .filter(countryAndCities => countryAndCities.country === country)[0].cities
        .map(Option);
}

export default DeliveryAddressForm;
