import React from 'react';
import CustomInput from "@/app/blocks/Input/CustomInput";
import {useAppDispatch} from "@/app/utils/hooks/redux";
import debounce from "lodash.debounce";
import {changeProductName} from "@/app/reduxTK/redusers/ProductReducer/ProductSlice";
import {useNameValidate} from "@/app/utils/hooks/useNameValidate";


interface ProductInput1Props {
    skipController: () => void;
    validationHandler: (arg0: boolean) => void;

}

export const ProductInput :  React.FC<ProductInput1Props> = ({ skipController, validationHandler} : ProductInput1Props ) => {


    const[inputValue, setInputValue] = React.useState<string>('');
    const [isValid, setIsValid] = React.useState<boolean>(false);
    const validate = useNameValidate()
    const dispatch = useAppDispatch();


    const updateSearchValue  =debounce((e: string) => {
        dispatch(changeProductName(e));

    }, 500)

    const changeProductHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        updateSearchValue(e.target.value);
        const isProductValid = validate(e.target.value)
        setIsValid(isProductValid)
    }
    React.useEffect(()=>{
        validationHandler(isValid)

    },[isValid])


    return (
        <div className='  items-center justify-between'>


            <div className="  flex items-center">
                <h1 className=' mr-3.5 text-center font-bold my-2.5'>
                    Введите продукт
                </h1>

                <CustomInput

                    value={inputValue}
                    placeholder='Введите еду'
                    changeHandlerFunction={changeProductHandler}

                />
                <div onClick={skipController} className=" ml-1.5 mr-3.5  w-1/3 h-1/3">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50"
                         viewBox="0 0 24 24"
                         style={{fill: "#FFFFFF", cursor: "pointer"}}>
                        <path
                            d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
                    </svg>
                </div>

            </div>

        </div>
    );
};

export default ProductInput;
