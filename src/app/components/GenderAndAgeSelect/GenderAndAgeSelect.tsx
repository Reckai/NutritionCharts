import React from 'react';
import CustomInput from "@/app/blocks/Input/CustomInput";
import {useAppDispatch, } from "@/app/utils/hooks/redux";
import {addUser} from "@/app/reduxTK/redusers/UserReducer";

import StandardButton from "@/app/ui/Button/StandartButton";


type gender = 'Мужчина' | 'Женщина';;

const ProductInput = () => {


    const dispatch = useAppDispatch();
    const [gender, setGender] = React.useState<gender>('Мужчина')
    const [age, setAge] = React.useState<string>('');

    const onClickOnButton = () => {

        if(gender && age !== ''){
           dispatch(addUser({ gender, age: Number(age)}));
            setGender(  'Мужчина');
            setAge( '');
        }else if( Number(age) < 0){
            alert('Вес не может быть отрицательным')
        }

    }
    const changeGenderHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value as gender)
    }
    const changeAgeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAge(e.target.value);
    }


    return <div>
        <div className='  ml-3.5  flex flex-col items-center justify-center '>
            <h1 className=' text-center font-bold my-2.5'>
                Введите пол и возраст
            </h1>

            <div className="w-52 my-2.5 h-14 pl-5 py-4 bg-white flex rounded-[20px] justify-start items-center gap-3 inline-flex">
                <select value={gender} onChange={changeGenderHandler} className=" flex-shrink-0 appearance-none bg-transparent    px-4 py-2 pr-8 rounded  leading-tight focus:outline-none ">
                    <option   className='text-black' >Мужчина</option>
                    <option  className='text-black' >Женщина</option>
                </select>

            </div>
            <CustomInput
    type={'number'}
    value={age}
    placeholder='Введите возраст'
    changeHandlerFunction={changeAgeHandler}
    />
            <StandardButton onClick={onClickOnButton} params=" px-5 py-4 w-48 px-12 h-14 ">Подтвердить</StandardButton>
        </div>
    </div>;

}


export default ProductInput;