import { useState } from "react";

export const useWeightValidate = () => {
    const validate = (value: string) => {
        if(value.match(/^[0-9]+$/) &&  value.length < 5){
            return true;
        }else{
            return false;
        }
    }

    return validate;
}
