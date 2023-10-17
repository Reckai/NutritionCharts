import React, {useCallback, useState} from "react";
import CustomInput from "@/app/blocks/Input/CustomInput";
import {useAppDispatch} from "@/app/utils/hooks/redux";

import {setUserWeight} from "@/app/reduxTK/redusers/UserReducer/UserSlice";
import debounce from "lodash.debounce";
import {useWeightValidate} from "@/app/utils/hooks/useWeightValidate";

type formProps = {
    validationHandler: (arg0:boolean)=>void
}
const UserWeightInput = ({validationHandler}:formProps)  => {
    const dispatch = useAppDispatch();
    const [weight, setWeight] = useState<string>('');
   const [isValid, setIsValid] = useState<boolean>(false);
   const validateWeight = useWeightValidate();
     const changeProductWeight = debounce((e: string)=>{
        dispatch(setUserWeight(e))
    },500)

    const chaneWeightHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(e.target.value)
        changeProductWeight(e.target.value)
        const isWeightValid = validateWeight(e.target.value)
        setIsValid(isWeightValid)
    }, [])

   React.useEffect(()=>{
       validationHandler(isValid)
   },[isValid])

    return(
        <div className={"flex items-center"}>
            <div >
                <h1 className=' mr-3.5 text-center font-bold my-2.5'>
                    Введите ваш вес
                </h1>
            </div>
            <CustomInput
                type={'number'}
                value={weight}
                placeholder='Введите вес'
                changeHandlerFunction={chaneWeightHandler}
            />

        </div>
    )
};

export default UserWeightInput;
