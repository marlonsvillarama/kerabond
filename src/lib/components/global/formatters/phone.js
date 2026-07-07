export const NZPhoneFormatter = (value) => {
    let output = value.replace(/\s/g, "");
    value = output;

    if (value.indexOf('0') === 0) {
        if (value.length > 10) {
            output = `${value.slice(0, 3)} ${value.slice(3, 7)} ${value.slice(7)}`
        }
        else {
            output = `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6)}`;
        }
    }

    return output;
};
