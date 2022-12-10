import {randomConfirmationCode} from "../utils/RandomUtils";

function generateConfirmationCode() {
    const confirmationCode = randomConfirmationCode();
    console.log("Confirmation code:", confirmationCode);
    return confirmationCode;
}

export default generateConfirmationCode;
