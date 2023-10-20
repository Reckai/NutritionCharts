'use client'
import React from "react";
import {useAppDispatch, useAppSelector} from "@/app/utils/hooks/redux";
import {deleteProduct} from "@/app/reduxTK/redusers/ProductReducer/ProductSlice";
import StandartButton from "@/app/ui/Button/StandartButton";
import Chart from "@/app/components/Chart/Chart";
import {calculateAndNormalizeNutrientsData} from "@/app/reduxTK/redusers/ChartReducer/ChartSlice";
import Header from "@/app/blocks/Header/Header";

export default function Home() {

    const dispatch = useAppDispatch();
    const {productList, TotalProperties } = useAppSelector(state => state.products);
    const {Nutrients} = useAppSelector(state => state.chart);
    const userWeight = useAppSelector(state => state.user.userWeight);
    return (<main   className='flex'>
            <div  className='flex flex-col'>
                <div className='flex'>
                    <div>

                    </div>
                    <Header/>
                </div>

                <section
                    className=' ml-9   bg-white rounded-[20px] w-[206px]  px-[50px]  my-2.5  '>
                    {productList.map((product) => {
                        return (<div key={product.id + Math.random()} className='flex place-content-around items-center gap-1  my-2.5'>
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
                {
                    productList.length > 0 && <StandartButton onClick={() => dispatch(calculateAndNormalizeNutrientsData({ productList: productList , userWeight: Number(userWeight)}))} params=" px-5 py-4 w-48 px-12 h-14 ">Подтвердить</StandartButton>
                }
               <div>
                   {
                      Nutrients.length > 0 && (

                          <div>
                              {
                                  <h1>
                                      {TotalProperties.TotalCallories} ккал &nbsp;

                                      {TotalProperties.TotalWeight} вес
                                  </h1>
                              }
                              <Chart/>
                          </div>) }

               </div>
                <iframe
                    className="rounded-lg"
                    src="https://open.spotify.com/embed/track/6jia2kwUEpsupSDRKy8DnM?utm_source=generator&theme=0"
                    width="100%"
                    height="352"

                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                ></iframe>

            </div>

        </main>

    )
}
