import {combineReducers, configureStore, PreloadedState,} from "@reduxjs/toolkit";
import productReducer from "@/app/reduxTK/redusers/ProductReducer/ProductSlice";
import UserReducer from "@/app/reduxTK/redusers/UserReducer/UserSlice";
import {ProductsSearchApi} from "@/app/reduxTK/redusers/ProductSearch/ProductSearch";
import ChartSlice from "@/app/reduxTK/redusers/ChartReducer/ChartSlice";

const rootReducer = combineReducers({
  products: productReducer, user: UserReducer,
    [ProductsSearchApi.reducerPath]: ProductsSearchApi.reducer,
    chart: ChartSlice,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>)=>{
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ProductsSearchApi.middleware),
        devTools:/* eneble devtools */ true

    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
