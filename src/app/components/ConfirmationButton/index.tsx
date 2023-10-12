import React, {useCallback} from 'react';
import StandartButton from "@/app/ui/Button/StandartButton";
import {useAppDispatch, useAppSelector} from "@/app/utils/hooks/redux";
import {addProduct, changeProductName, setProductWeight} from "@/app/reduxTK/redusers/ProductReducer/ProductSlice";
import {Food, FoodSearchResponse} from "@/app/utils/models";
import {useSearchProductsByNameQuery} from "@/app/reduxTK/redusers/ProductSearch/ProductSearch";

interface ConfirmationButtonProps {
    skip: boolean
}

const ConfirmationButton = ({skip}:ConfirmationButtonProps) => {
    const {productName, ActiveProduct , productWeight} = useAppSelector(state => state.products);
    const {data} = useSearchProductsByNameQuery(productName as string, {skip: skip});
    const dispatch = useAppDispatch();

    const addProductToStore = () => {

        dispatch(addProduct({id: ActiveProduct ? ActiveProduct : 0 , product: data?.foods.find((product: Food) => product.fdcId === ActiveProduct) as Food, weight: Number(productWeight)}));

    }
    const handleValidInput = useCallback((active: number, data: FoodSearchResponse, weight: string ) => {
        addProductToStore();

    }, [dispatch, ActiveProduct, data, productWeight])

    const handleNegativeWeight = useCallback(() => {
        alert('Вес не может быть отрицательным');
    }, []);

    const handleNoActiveProduct = useCallback(() => {
        alert('Пожалуйста, выберите продукт');
    }, []);

    const handleEmptyInputs = useCallback(() => {
        console.log(productWeight, data, ActiveProduct)
        alert('Пожалуйста, введите продукт или вес');
    }, []);

    const onClickOnButton = useCallback(() => {
        if (productWeight !== '' && data && ActiveProduct) {
            handleValidInput(ActiveProduct, data, productWeight );
        } else if (Number(productWeight) < 0) {
            handleNegativeWeight();
        } else if (data && !ActiveProduct) {
            handleNoActiveProduct();
        } else {
            console.log(productWeight, data, ActiveProduct)
            handleEmptyInputs();
        }
    }, [productWeight, data, ActiveProduct]);




    return (<div>
            <StandartButton onClick={onClickOnButton}
                            params=" px-5 ml-3 py-4 w-48 px-12 h-14 ">Подтвердить</StandartButton>

        </div>);
};

export default ConfirmationButton;
