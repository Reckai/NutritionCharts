import React, {useCallback, useState} from "react";
import CustomInput from "@/app/blocks/Input/CustomInput";
import {useAppDispatch} from "@/app/utils/hooks/redux";

import {setUserWeight} from "@/app/reduxTK/redusers/UserReducer/UserSlice";
import debounce from "lodash.debounce";


const UserWeightInput: React.FC = () => {
    const dispatch = useAppDispatch();
    const [weight, setWeight] = useState<string>('');
    const changeProductWeight = debounce((e: string)=>{
        dispatch(setUserWeight(e))
    },500)

    const chaneWeightHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(e.target.value)
        changeProductWeight(e.target.value)
    }, [])



    return(
        <>
            <CustomInput
                type={'number'}
                value={weight}
                placeholder='Введите вес'
                changeHandlerFunction={chaneWeightHandler}
            />

        </>
    )
};

export default UserWeightInput;
