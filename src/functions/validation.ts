/**
 * @function validateText checks that a string is not all white space and/or punctuation and contains more than a few characters.
 * @param text that the user entered.
 * @returns a boolean value representing whether the string is valid or not.
 */
export function validateText(text:string):boolean{
    const strippedText = text.replace(/\s/g, "").replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "");
    return strippedText.length >= 5;
}
