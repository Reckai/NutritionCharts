import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Food} from "@/app/utils/models";



export type productSliceType = {
    id: number; product: Food; weight: number;
}




interface Iproducts {
    productName: string ;
    productWeight: string;
    ActiveProduct: number | null;
    productList: productSliceType[];
    TotalProperties: {
        TotalCallories: number; TotalWeight: number; [key: string]: number;
    }


}

const initialState: Iproducts = {
    ActiveProduct: null,
    productList: [], productName: '',
    productWeight: '0',
    TotalProperties: {
        TotalCallories: 0, TotalWeight: 0,
    }
    ,
}

export const productSlice = createSlice({
    name: 'products', initialState, reducers: {
        addProduct(state, action: PayloadAction<productSliceType>) {
            state.productList.push({
                id: action.payload.id, product: action.payload.product, weight: action.payload.weight
            });

            let neededProduct = action.payload.product.foodNutrients.find((nutrient) => nutrient.nutrientName.includes('Energy') && nutrient.unitName.includes('KCAL'))

            state.TotalProperties.TotalCallories += Math.floor(neededProduct ? neededProduct.value * action.payload.weight / 100 : 0);
            state.TotalProperties.TotalWeight += action.payload.weight;
            console.log(state.productList.slice())

        }, deleteProduct(state, action: PayloadAction<number>) {
            let needDeleteProduct = state.productList.find((product) => product.id === action.payload)
            const calculetedCallories = needDeleteProduct?.product.foodNutrients.find((nutrient) => nutrient.nutrientName.includes('Energy') && nutrient.unitName.includes('KCAL'))
            state.TotalProperties.TotalCallories -= calculetedCallories ? (calculetedCallories.value * (needDeleteProduct?.weight || 0) / 100) : 0;
            state.TotalProperties.TotalCallories = Math.floor(state.TotalProperties.TotalCallories);
            state.TotalProperties.TotalWeight -= needDeleteProduct?.weight || 0;
            state.productList = state.productList.filter((product) => product.id !== action.payload);

        },

        changeProductName(state, action: PayloadAction<string>) {
            state.productName = action.payload;
            console.log(state.productName)
        },
        setProductWeight(state, action: PayloadAction<string>) {
            state.productWeight = action.payload;
        },
        setActiveProduct(state, action: PayloadAction<number>) {
            state.ActiveProduct = action.payload;
        }

}
});
export const { changeProductName,setActiveProduct, setProductWeight, deleteProduct, addProduct} = productSlice.actions;
export default productSlice.reducer;
