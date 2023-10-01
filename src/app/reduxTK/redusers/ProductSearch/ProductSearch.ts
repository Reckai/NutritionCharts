import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import { FoodSearchResponse } from "@/app/utils/models";
import {API_KEY} from "@/app/utils/API";


export const ProductsSearchApi = createApi({
    reducerPath: 'ProductsSearchApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.nal.usda.gov/fdc/v1/foods/'}),
    endpoints: (builder)=>({
        searchProductsByName: builder.query<FoodSearchResponse, string>({
            query: (name) => `search?query=${name}&dataType=Foundation&pageSize=25&sortBy=dataType.keyword&sortOrder=asc&api_key=${API_KEY}`,
        }),
    }),
});
export const { useSearchProductsByNameQuery } = ProductsSearchApi;
