
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Food} from "@/app/utils/models";
type productSliceType = {
        id: number;
        products: Food[]
        weight: number;
}
interface addedProducts {
    TotalCallories: number;
    TotalWeight: number;

}
interface Iproducts {
    productName: string | undefined;
    productList: productSliceType[];
}
const initialState: Iproducts = {
    productList: [],
    productName: '',
}

export const productSlice = createSlice({
    name: 'products', initialState, reducers: {

        changeProductName(state, action: PayloadAction<string>) {
            state.productName = action.payload;
        },

    }
});
export const {  changeProductName} = productSlice.actions;
export default productSlice.reducer;