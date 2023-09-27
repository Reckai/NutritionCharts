import {combineReducers, configureStore, } from "@reduxjs/toolkit";
import productReducer from "@/app/reduxTK/redusers/ProductReducer/ProductSlice";
import UserReducer from "@/app/reduxTK/redusers/UserReducer/UserSlice";
import {ProductsSearchApi} from "@/app/reduxTK/redusers/ProductSearch/ProductSearch";

const rootReducer = combineReducers({
  products: productReducer, user: UserReducer,
    [ProductsSearchApi.reducerPath]: ProductsSearchApi.reducer,
});

export const setupStore = ()=>{
    return configureStore({
        reducer: rootReducer,
          middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ProductsSearchApi.middleware),

    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];