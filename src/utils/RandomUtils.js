function randomConfirmationCode() {
    return `${randomDigit()}${randomDigit()}${randomDigit()}${randomDigit()}`;
}

function randomDigit() {
    return randomInt(0, 9);
}

function randomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

export {randomConfirmationCode, randomDigit, randomInt};
