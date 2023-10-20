import React, {useCallback, useState} from "react";
import ProductInput from "@/app/components/ProductInput/ProductInput";
import ProductList from "@/app/components/ProductList";
import WeightInput from "@/app/components/WeightInput";
import ConfirmationButton from "@/app/components/ConfirmationButton";
import UserWeightInput from "@/app/components/UserWeightInput/UserWeightInput";

export const AddProduct: React.FC = () => {

    const [skip, setSkip] = useState<boolean>(true);
    const [isProductName, setIsProductName] = useState(false);
    const [isProductWeightValid, setIsProductWeightValid] = useState(false);
    const handleProductWeightValidation = (isValid: boolean) => {
        setIsProductWeightValid(isValid);
    };

    const handleProductNameValidation = (isValid: boolean) => {
        setIsProductName(isValid);
    };

   const isFormValid =  isProductName && isProductWeightValid;
    const skipController = () => {
        setSkip((prev) => !prev);
    }

    return (
        <div className='ml-4 flex '>
            <div className=" flex flex-col  ">
                <ProductInput validationHandler={handleProductNameValidation} skipController ={skipController} />
                <ProductList skip={skip}/>
                <div className="flex items-center">
                    <WeightInput validationHandler={handleProductWeightValidation} />
                    <ConfirmationButton isValid={isFormValid} skip={skip}/>
                </div>
            </div>

        </div>
);
};


export default AddProduct;
