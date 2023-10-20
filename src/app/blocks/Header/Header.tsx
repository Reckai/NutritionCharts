import React, {useState} from 'react';
import StandartButton from "@/app/ui/Button/StandartButton";
import UserWeightInput from "@/app/components/UserWeightInput/UserWeightInput";
import AddProduct from "@/app/blocks/Header/AddProduct";

const Header: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [ isUserWeightValid, setIsUserWeightValid] = useState(false);
    const handelUserWeightValidation = (isValid: boolean) => {
        setIsUserWeightValid(isValid);
    }

    return (
        <div>
            <div>

                <UserWeightInput  validationHandler={handelUserWeightValidation} />
            </div>
            <StandartButton params={'px-5 py-4 w-48 px-12 h-14'} onClick={()=> setIsModalOpen(true)}>
                Добавить продукт
            </StandartButton>
            {
                isModalOpen && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neutral-700 rounded-[20px]   px-[50px]  my-2.5  ">
                    <AddProduct/>
                    </div>
                </div>
            }
        </div>
    );
}

export default Header;
