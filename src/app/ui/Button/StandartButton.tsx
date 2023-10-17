import React from 'react';
import Rocket from '@/app/assets/RocketLaunch.svg';
import Image from 'next/image'
type params = {
    type?: 'Primary' | 'Secondary' | 'Tertiary' ;
}
type StandardButtonProps = {
    children: React.ReactNode;
    img?: boolean;
    params: params | string;
    onClick: () => void;
    disabled?: boolean;
}


const StandartButton = ({params, img, children, onClick, disabled}: StandardButtonProps) => {
    let buttonClasses: params | string = '';
    let textClasses = '';
    const clickHandler = ( ) => {
        onClick();
    }
    if (params === 'Primary') {
        buttonClasses = ' w-[206px] h-[72px] px-[50px]   items-center';
        textClasses = 'text-xl leading-loose'
    } else if (params === 'Secondary') {
        buttonClasses = 'w-48 h-14 px-12';
        textClasses = 'text-base leading-snug'
    } else if (params === 'Tertiary') {
        buttonClasses = 'w-48 h-11';
        textClasses = 'text-base leading-snug'
    }else{
        buttonClasses = params;
    }
    return(


        <button onClick={clickHandler}  className={ ` ${disabled ? 'disabled:' : null }  right-8 bg-call-to-action rounded-[20px] gap-3 justify-center items-center inline-flex hover:scale-[0.95] transition-all duration-200 ${buttonClasses}`}>
            {
                img && <Image src={Rocket} alt='button'
                                    className="w-5 h-5 relative"
                />
            }
            <div className={` text-center text-white  font-semibold capitalize ${textClasses}`} >{children}</div>
        </button>
    );
}

export default StandartButton;
