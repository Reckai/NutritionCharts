import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Food} from "@/app/utils/models";

type productSliceType = {
    id: number;
    product: Food;
    weight: number;
}

interface Iproducts {
    productName: string | undefined;
    productList: productSliceType[];
    TotalProperties: {
        TotalCallories: number;
        TotalWeight: number;
        [key: string]: number;
    }

}

const initialState: Iproducts = {
    productList: [],
    productName: '',
    TotalProperties: {
        TotalCallories: 0,
        TotalWeight: 0,
    }
}

export const productSlice = createSlice({
    name: 'products', initialState, reducers: {
        addProduct(state, action: PayloadAction<productSliceType>) {
            state.productList.push({
                id: action.payload.id,
                product: action.payload.product,
                weight: action.payload.weight
            });

            let neededProduct = action.payload.product.foodNutrients.find((nutrient)=> nutrient.nutrientName.includes('Energy') && nutrient.unitName.includes('KCAL'))
            console.log(neededProduct)
                state.TotalProperties.TotalCallories += neededProduct? neededProduct.value * action.payload.weight / 100 : 0;
                state.TotalProperties.TotalWeight += action.payload.weight;

            console.log(state.TotalProperties.TotalCallories, state.TotalProperties.TotalWeight)
        },
        deleteProduct(state, action: PayloadAction<number>) {
                state.TotalProperties.TotalWeight -= state.productList.find((product) => product.id === action.payload)?.weight || 0;
                state.TotalProperties.TotalCallories -= state.productList.find((product) => product.id === action.payload)?.product.foodNutrients.find((nutrient)=> nutrient.nutrientName.includes('Energy') && nutrient.unitName.includes('KCAL'))?.value || 0;
                state.productList = state.productList.filter((product) => product.id !== action.payload);

        },
        changeProductName(state, action: PayloadAction<string>) {
            state.productName = action.payload;
        },

    }
});
export const {changeProductName, deleteProduct, addProduct} = productSlice.actions;
export default productSlice.reducer;