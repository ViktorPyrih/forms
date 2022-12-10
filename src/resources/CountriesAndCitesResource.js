const BASE_URL = "https://countriesnow.space/api/v0.1";

async function getCountriesAndDialCodes() {
    const response = await fetch(`${BASE_URL}/countries/codes`);
    if (response.ok) {
        const data = await response.json();
        return data.data;
    }
    console.error("Unable to get countries and dial codes from https://countriesnow.space/api/v0.1/countries/codes", response);
    throw new Error(response.statusText);
}

async function getCountriesAndCities() {
    const response = await fetch(`${BASE_URL}/countries`);
    if (response.ok) {
        const data = await response.json();
        return data.data;
    }
    console.error("Unable to get cities and countries from https://countriesnow.space/api/v0.1/countries", response);
    throw new Error(response.statusText);
}

export {getCountriesAndDialCodes, getCountriesAndCities};
