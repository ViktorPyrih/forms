function isEmpty(string) {
    return string === "";
}

function isNotEmpty(string) {
    return !isEmpty(string);
}

function contains(string, searchString) {
    return string.toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
}

export {isEmpty, isNotEmpty, contains};
