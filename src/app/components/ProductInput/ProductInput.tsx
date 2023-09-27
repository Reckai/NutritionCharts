import React from 'react';
import CustomInput from "@/app/blocks/Input/CustomInput";
import {useAppDispatch, useAppSelector} from "@/app/utils/hooks/redux";
import { changeProductName} from "@/app/reduxTK/redusers/ProductReducer/ProductSlice";
import StandardButton from "@/app/ui/Button/StandartButton";
import {useSearchProductsByNameQuery} from "@/app/reduxTK/redusers/ProductSearch/ProductSearch";
import {Food} from "@/app/utils/models";

const ProductInput = () => {
    const [active, setActive] = React.useState<number | null>();
    const {productName} = useAppSelector(state => state.products);
    const dispatch = useAppDispatch();
    const [weight, setWeight] = React.useState<string>('');

    const [skip, setSkip] = React.useState<boolean>(true);
    const {data, error, isLoading} = useSearchProductsByNameQuery(productName as string,{skip} );
    const changeProductHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeProductName(e.target.value));
    }
    const chaneWeightHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(e.target.value)
    }


    const onClickOnButton = () => {
        console.log(productName, weight)
        if (productName !== '' && weight !== '') {

            dispatch(changeProductName(''));
            setWeight('');
        } else if (Number(weight) < 0) {
            alert('Вес не может быть отрицательным')
        } else {
            alert('Пожалуйста, введите продукт или вес')
        }
    }
const    onSelectProduct =(id: number)=>{
         setActive(id);
    }
    const [asd, setAsd] = React.useState<string>('grid-cols-4')
    React.useEffect(() => {
        console.log(data)
        setSkip(true);

        if(data && data.foods.length > 4){
            setAsd ('grid-cols-4');

        }else if(data && data.foods.length != 0){
            setAsd (`grid-cols-${data.foods.length}`)
        }
        }, [data])

    return <div className='ml-4 flex '>
        <div className=" flex flex-col  ">
            <div className='  items-center justify-between'>


                <div className="  flex items-center">
                    <h1 className=' mr-3.5 text-center font-bold my-2.5'>
                        Введите продукт
                    </h1>

                    <CustomInput

                        value={productName}
                        placeholder='Введите еду'
                        changeHandlerFunction={changeProductHandler}

                    />
                    <div onClick={()=> setSkip(!skip)}  className=" ml-1.5 mr-3.5  w-1/3 h-1/3">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50"
                             viewBox="0 0 24 24"
                             style={{fill: "#FFFFFF", cursor: "pointer"}}>
                            <path
                                d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
                        </svg>
                    </div>

                </div>

            </div>

            <div className={`grid  ${asd}   w-1/2    rounded-[20px] shadow-gray-950 bg-neutral-700    `}>
                {
                    data && data.foods.map((product: Food ) => {
                        return(<button
                                key={product.fdcId}
                                onClick={() => onSelectProduct(product.fdcId)}
                                className={` ${product.fdcId === active ? ' bg-call-to-action text-white shadow-md shadow-amber-300' : 'bg-white'}    m-2   rounded-[8px] p-1`}>
                                <div className="">
                                    {product.description}
                                </div>
                            </button>
                        )

                })}
            </div>
            <div>
                <CustomInput
                    type={'number'}
                    value={weight}
                    placeholder='Введите вес'
                    changeHandlerFunction={chaneWeightHandler}
                />
                <StandardButton onClick={onClickOnButton} params=" px-5 ml-3 py-4 w-48 px-12 h-14 ">Подтвердить</StandardButton>

            </div>



        </div>

    </div>;

}


export default ProductInput;