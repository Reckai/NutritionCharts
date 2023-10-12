import React, {useCallback, useState} from "react";
import {Food} from "@/app/utils/models";
import {useSearchProductsByNameQuery} from "@/app/reduxTK/redusers/ProductSearch/ProductSearch";
import {useAppDispatch, useAppSelector} from "@/app/utils/hooks/redux";
import {setActiveProduct} from "@/app/reduxTK/redusers/ProductReducer/ProductSlice";

interface ProductListProps {
        skip: boolean
}

export const ProductList = ({skip}: ProductListProps) => {
    const dispatch = useAppDispatch();
    const {productName} = useAppSelector(state => state.products);
    const {data, error, isLoading} = useSearchProductsByNameQuery(productName as string, {skip});
    const [asd, setAsd] = React.useState<string>('grid-cols-4')
    const [active, setActive] = useState<number | null>()

    const changeActiveProduct = (id: number) => {
        dispatch(setActiveProduct(id))
    }

    const onSelectProduct = useCallback((id: number) => {
        setActive(id);
        changeActiveProduct(id)
    }, []);


    React.useEffect(() => {


        if (data && data.foods.length > 4) {
            setAsd('grid-cols-4');

        } else if (data && data.foods.length != 0) {
            setAsd(`grid-cols-${data.foods.length}`)
        }
    }, [data])
    console.log(skip)
    return (

        <div className={`grid  ${asd}   w-1/2    rounded-[20px] shadow-gray-950 bg-neutral-700    `}>


            {error ? (<div className='text-red-500 rounded-xl '>
                Произошла ошибка, попробуйте позже
            </div>) : isLoading ? (<div className= " text-white">
                Загрузка...
            </div>)  : data && data.foods.length === 0 ? (<div className={"overflow-x-hidden bg-call-to-action text-white   m-2   rounded-[8px] p-1"}>
                Таких продуктов не найдено
            </div>): data && data.foods ? (data.foods.map((product: Food) => {
                return (<button
                    key={product.fdcId}
                    onClick={() => onSelectProduct(product.fdcId)}
                    className={` ${product.fdcId === active ? ' bg-call-to-action text-white shadow-md shadow-amber-300' : 'bg-white'}  overflow-x-hidden   m-2   rounded-[8px] p-1`}>
                    <div className="">
                        {product.description}
                    </div>
                </button>)

            })) : null


            }

        </div>

    );
};

export default ProductList;
