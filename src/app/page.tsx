'use client'
import React from "react";
import ProductInput from "@/app/components/ProductInput/ProductInput";



import {useAppDispatch, useAppSelector} from "@/app/utils/hooks/redux";
import GenderAndAgeSelect from "@/app/components/GenderAndAgeSelect/GenderAndAgeSelect";
import {deleteProduct} from "@/app/reduxTK/redusers/ProductReducer/ProductSlice";
import {allowedDisplayValues} from "next/dist/compiled/@next/font/dist/constants";

export default function Home() {

    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);
    const {productList, TotalProperties, productName} = useAppSelector(state => state.products);

    return (<main   className='flex'>
            <div  className='flex flex-col'>
                <div className='flex'>
                    <div>
                        <GenderAndAgeSelect/>
                        {
                            user && <h1 className='text-2xl font-bold my-2.5 '> {user.gender}, {user.age}</h1>

                        }
                        {
                            <h1>
                                {TotalProperties.TotalCallories} ккал &nbsp;

                                {TotalProperties.TotalWeight} вес
                            </h1>
                        }
                    </div>
                    <ProductInput/>
                </div>

                <section
                    className=' ml-9   bg-white rounded-[20px] w-[206px]  px-[50px]  my-2.5  '>
                    {productList.map((product) => {
                        return (<div key={product.id} className='flex place-content-around items-center gap-1  my-2.5'>
                                <h1 className='text-black text-base'>
                                    {product.product.description.split(',')[0] }
                                </h1>
                                <div className='flex items-center'> {/* Обертка для веса и "г" */}
                                    <h1 className='text-base text-black mr-1'>
                                        {" " + product.weight}</h1>
                                    <span className='text-base text-black'>г</span>
                                </div>
                                <button
                                    className={`w-32 h-11 rounded-full px-5 bg-call-to-action text-white ml-1.5 flex items-center justify-center`}
                                    onClick={() => dispatch(deleteProduct(product.id))}
                                >
                                    -
                                </button>
                        </div>

                        )
                    })}
                </section>
                <iframe
                    className="rounded-lg"
                    src="https://open.spotify.com/embed/track/6jia2kwUEpsupSDRKy8DnM?utm_source=generator&theme=0"
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                ></iframe>

            </div>

        </main>

    )
}
