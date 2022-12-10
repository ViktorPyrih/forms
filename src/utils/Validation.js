import {EIGHTEEN_YEARS_AGO_DATE} from "./Constants";

export const REQUIRED = {
    required: true
}
export const PHONE_NUMBER = {
    required: true,
    minLength: 9,
    maxLength: 9,
    pattern: /\d+/
}
export const CONFIRMATION_CODE = {
    required: true,
    minLength: 4,
    maxlength: 4,
    pattern: /\d+/
}
export const EMAIL = {
    required: true,
    pattern: /\S+@\S+\.\S+/
}
export const FIRST_NAME = {
    required: true,
    minLength: 5
}
export const SECOND_NAME = {
    required: true,
    minLength: 5
}
export const ADDRESS = {
    required: true,
    minLength: 10
}
export const ZIP_CODE = {
    required: true,
    valueAsNumber: true,
    min: 10000,
    max: 99999
}
export const DATE_OF_BIRTH = {
    required: true,
    valueAsDate: true,
    max: EIGHTEEN_YEARS_AGO_DATE
}
export const SOCIAL_CONTACT = {
    required: true,
    pattern: /@\w+/
}
