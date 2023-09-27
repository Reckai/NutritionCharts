
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
type productSliceType = {
        id: number;
}
interface Iproducts {
    pruductID: number;
    productName: string | undefined;

}
const initialState: Iproducts = {
    pruductID: 0,
    productName: '',
}

export const productSlice = createSlice({
    name: 'products', initialState, reducers: {
        changeProductID(state, action: PayloadAction<number>) {
            state.pruductID = action.payload;
            console.log(state.pruductID)
        },
        changeProductName(state, action: PayloadAction<string>) {
            state.productName = action.payload;
        },

    }
});
export const { changeProductID, changeProductName} = productSlice.actions;
export default productSlice.reducer;