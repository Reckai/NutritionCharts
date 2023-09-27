'use client'
import React from "react";
import ProductInput from "@/app/components/ProductInput/ProductInput";
import { useSearchProductsByNameQuery} from "@/app/reduxTK/redusers/ProductSearch/ProductSearch";


import {useAppSelector} from "@/app/utils/hooks/redux";
import GenderAndAgeSelect from "@/app/components/GenderAndAgeSelect/GenderAndAgeSelect";

export default function Home() {


    const user = useAppSelector(state => state.user);

    return (<main   className='flex'>
            <div  className='flex flex-col'>
                <div className='flex'>
                    <div>
                        <GenderAndAgeSelect/>
                        {
                            user && <h1 className='text-2xl font-bold my-2.5 '> {user.gender}, {user.age}</h1>
                        }
                    </div>


                    <ProductInput/>
                </div>

            </div>

        </main>

    )
}
