import { useState } from "react";

export const useNameValidate = () => {
    const validate = (value: string) => {
        if((value.match(/^[a-zA-Z]+$/) && value.length < 15)){
            return true;
        }else{
            return false;
        }
    }

    return validate;
}
