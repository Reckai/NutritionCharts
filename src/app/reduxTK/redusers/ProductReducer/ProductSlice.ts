import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Food} from "@/app/utils/models";



type productSliceType = {
    id: number; product: Food; weight: number;
}
const nutrientNames = [
    "Iron, Fe",
    "Magnesium, Mg",
    "Phosphorus, P",
    "Potassium, K",
    "Cholesterol",
    "Vitamin B-6",
    "Vitamin B-12",
    "Vitamin A",
    "Vitamin C",
    "Vitamin D",
    "Vitamin E",
    "Vitamin K",
    "Sodium, Na",
    "Zinc, Zn",
    "Copper, Cu",
    "Nitrogen",
    "Total lipid (fat)",
    "Manganese, Mn",
    "Calcium, Ca",
    "Protein",
    "Carbohydrate, by difference"
];



type nutrientsType = {
    name: string;
    value: number;
    unitName: string;
    id: number;
}

interface Iproducts {
    productName: string | undefined;
    productList: productSliceType[];
    TotalProperties: {
        TotalCallories: number; TotalWeight: number; [key: string]: number;
    }
    Nutrients: nutrientsType[]

}

const initialState: Iproducts = {
    productList: [], productName: '',
    TotalProperties: {
        TotalCallories: 0, TotalWeight: 0,
    }
    , Nutrients: []
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
        },

        calculateNutrients(state, action: PayloadAction<void>) {
              state.Nutrients = [];
            for (let i = 0; i < state.productList.length; i++) {
                const filteredNutrients = state.productList[i].product.foodNutrients.filter((nutrient) => {

                    return  nutrientNames.includes(nutrient.nutrientName)
                })

                if (filteredNutrients.length > 0) {
                    for(let j = 0; j < filteredNutrients.length; j++){
                        if(state.Nutrients.find((nutrient)=> nutrient.name === filteredNutrients[j].nutrientName)){
                            state.Nutrients[j].value += Number((filteredNutrients[j].value * state.productList[i].weight / 100).toFixed(3));
                        }else{
                            state.Nutrients.push({
                                name: filteredNutrients[j].nutrientName,

                                value: Number((filteredNutrients[j].value * state.productList[i].weight / 100).toFixed(3)),
                                unitName: filteredNutrients[j].unitName,
                                id: filteredNutrients[j].nutrientId

                            } as nutrientsType)
                        }
                    }


            }
        }
            console.log(state.Nutrients.slice());
            const NormalizedNutrients = state.Nutrients.map((nutrient) => {})
    }
}
});
export const {calculateNutrients, changeProductName, deleteProduct, addProduct} = productSlice.actions;
export default productSlice.reducer;
