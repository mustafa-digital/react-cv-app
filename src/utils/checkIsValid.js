/*---------------------------------------------------
    REACT CV APP

    checkIsValid.js
    PURPOSE: Used to check validity of all work or education objects

    RETURNS: True if all properties are valid, false if not all valid
*--------------------------------------------------*/

export function checkIsValid(map) {
    for (const [id, obj] of map.entries()) {
        if (!obj.isValid){
            return false;
        }
    }
    return true;
}