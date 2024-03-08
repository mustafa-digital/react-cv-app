/*  
    This function takes a map object and checks validity of all its entries, returns false if any are invalid
*/
export function checkIsValid(map) {
    for (const [id, obj] of map.entries()) {
        if (!obj.isValid){
            return false;
        }
    }
    return true;
}