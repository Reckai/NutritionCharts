import { useState } from "react";

export const useNameValidate = () => {
    const validate = (value: string) => {
        if( value != '' && value.match(/^[a-zA-Z]+$/) && value.length < 25 ){

            return true;
        }else{
            return false;
        }
    }

    return validate;
}
