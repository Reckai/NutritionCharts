'use client'
import React, {memo} from 'react';


type CustomInputProps = {
    placeholder: string;
    changeHandlerFunction: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    type?: 'text' | 'number';
}
const CustomInput = memo(({placeholder, changeHandlerFunction, value,  type = 'text'} : CustomInputProps ) => {
    const [inputValue, setInputValue] = React.useState<string>('');

    React.useEffect(() => {
        setInputValue(value || '');
    }, [value])
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        changeHandlerFunction(e);
    }

    return (
        <div className="w-52 my-2.5 h-14 pl-5 py-4 bg-white flex rounded-[20px] justify-start items-center gap-3 inline-flex">
            <input
                type={type}
                placeholder={placeholder}
                value={inputValue}
                className="focus:outline-none align-text-left whitespace-nowrap text-black flex-shrink-0 max-w-full placeholder:text-zinc-800 placeholder:text-base placeholder:text-gray-400 placeholder:leading-snug"
                onChange={changeHandler}
            />
        </div>
    );
}, )
CustomInput.displayName = 'CustomInput';

export default CustomInput;
