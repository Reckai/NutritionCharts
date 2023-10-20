import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import { FoodSearchResponse } from "@/app/utils/models";
import {API_KEY} from "@/app/utils/API";


export const ProductsSearchApi = createApi({
    reducerPath: 'ProductsSearchApi',
        baseQuery: fetchBaseQuery({baseUrl: 'https://api.nal.usda.gov/fdc/v1/foods/'}),
    endpoints: (builder)=>({
        searchProductsByName: builder.query<FoodSearchResponse, { name: string, dataType: string }>({
            query: ({name, dataType}) => `search?query=${name}&dataType=${dataType}&pageSize=16&sortBy=dataType.keyword&sortOrder=asc&api_key=${API_KEY}`,
        }),
    }),
});
export const { useSearchProductsByNameQuery } = ProductsSearchApi;
