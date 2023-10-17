import React, {useCallback} from 'react';
import StandartButton from "@/app/ui/Button/StandartButton";
import {useAppDispatch, useAppSelector} from "@/app/utils/hooks/redux";
import {addProduct, changeProductName, setProductWeight} from "@/app/reduxTK/redusers/ProductReducer/ProductSlice";
import {Food, FoodSearchResponse} from "@/app/utils/models";
import {useSearchProductsByNameQuery} from "@/app/reduxTK/redusers/ProductSearch/ProductSearch";

interface ConfirmationButtonProps {
    skip: boolean
    isValid: boolean
}

const ConfirmationButton = ({skip, isValid}:ConfirmationButtonProps) => {
    const {productName, ActiveProduct , productWeight} = useAppSelector(state => state.products);
    const {data} = useSearchProductsByNameQuery(productName as string, {skip: skip});
    const dispatch = useAppDispatch();

    const addProductToStore = () => {

        dispatch(addProduct({id: ActiveProduct ? ActiveProduct : 0 , product: data?.foods.find((product: Food) => product.fdcId === ActiveProduct) as Food, weight: Number(productWeight)}));

    }

    const onClickOnButton = useCallback(() => {
        if (isValid) {
            addProductToStore();
        } else {
            alert('Заполните все поля')
        }
    }, [productWeight, data, ActiveProduct]);




    return (<div>
            <StandartButton disabled={!isValid} onClick={onClickOnButton}
                            params=" px-5 ml-3 py-4 w-48 px-12 h-14 ">Подтвердить</StandartButton>

        </div>);
};

export default ConfirmationButton;
