import React, {useCallback, useState} from "react";
import CustomInput from "@/app/blocks/Input/CustomInput";
import {useAppDispatch} from "@/app/utils/hooks/redux";
import {setProductWeight} from "@/app/reduxTK/redusers/ProductReducer/ProductSlice";


const WeightInput: React.FC = () => {
    const dispatch = useAppDispatch();
    const [weight, setWeight] = useState<string>('');
    const changeProductWeight = (e: string)=>{
        dispatch(setProductWeight(e))
    }

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

export default WeightInput;
