import React, {useCallback, useState} from "react";
import ProductInput from "@/app/components/ProductInput/ProductInput";
import ProductList from "@/app/components/ProductList";
import WeightInput from "@/app/components/WeightInput";
import ConfirmationButton from "@/app/components/ConfirmationButton";
import UserWeightInput from "@/app/components/UserWeightInput/UserWeightInput";

export const Header: React.FC = () => {

    const [skip, setSkip] = useState<boolean>(true);
    const skipController = () => {
        setSkip((prev) => !prev);
        setTimeout(() => {
            setSkip((prev) => !prev);

        }, 1000);
    }


    return (
        <div className='ml-4 flex '>
            <div className=" flex flex-col  ">
                 <UserWeightInput/>
                <ProductInput skipController ={skipController} />
                <ProductList skip={skip}/>
                <div className="flex items-center">
                    <WeightInput />
                    <ConfirmationButton skip={skip}/>
                </div>
            </div>

        </div>
);
};


export default Header;
