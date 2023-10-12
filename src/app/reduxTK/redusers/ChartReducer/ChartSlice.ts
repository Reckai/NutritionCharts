import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { productSliceType} from "@/app/reduxTK/redusers/ProductReducer/ProductSlice";
import {comparisons,} from "@/app/utils/func/NormalizeChartData";
export interface OptionConfig {
    chart: {
        type: string;
    };
    title: {
        text: string;
    };
    xAxis: {
        categories: string[] | undefined;
    };
    yAxis: {
        title: {
            text: string;
        };
        max?: number;

    };
    series: {
        name: string;
        data: number[];
    }[];

}
export interface NutrientInfo {
    RecommendedDailyIntake: string;
    OverDosage: string ;
}

export interface Nutrient {
    name: string;
    info: NutrientInfo;
}
export type nutrientsType = {
    name: string;
    value: number;
    chartValue: number;
    unitName: string;
    id: number;
}


interface ChartConfig{
    options: OptionConfig;
    NormForNutrients: Nutrient[];
    Nutrients: nutrientsType[]
}

const initialState: ChartConfig = {
    Nutrients: [],

    options: {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Nutrient Elements'
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            title: {
                text: 'Value'
            },
            max:2,

        },
        series: [{
            name: 'Nutrient',
            data: []
        }],

    },
    NormForNutrients: [{
        name: "Iron, Fe", info: {
            "RecommendedDailyIntake": "15", "OverDosage": "20"
        },
    }, {
        name: "Magnesium, Mg", info: {
            "RecommendedDailyIntake": "350", "OverDosage": "400"
        }},
        {name: "Phosphorus, P", info: {
            "RecommendedDailyIntake": "1000", "OverDosage": "2500"
        }},
        {name: "Vitamin B6", info: {
            "RecommendedDailyIntake": "2", "OverDosage": "100"
        }}, {
        name: "Vitamin B12 ", info: {
            "RecommendedDailyIntake": "6", "OverDosage": "3000"
        }}, {
        name: "Vitamin C", info: {
            "RecommendedDailyIntake": "75", "OverDosage": "300"
        },
    }, {
        name: "Vitamin D ", info: {
            "RecommendedDailyIntake": "5", "OverDosage": "50"
        },
    }, {
        name: "Vitamin E ", info: {
            "RecommendedDailyIntake": "10", "OverDosage": "1000"
        },
    }, {
        name: "Vitamin K", info: {
            "RecommendedDailyIntake": "80 µg", "OverDosage": "200"
        },
    }, {
        name: "Calcium, Ca", info: {
            "RecommendedDailyIntake": "1000", "OverDosage": "1500"
        },
    }, {
        name: "Copper, Cu", info: {
            "RecommendedDailyIntake": "2", "OverDosage": "10"
        },
    }, {
        name: "Selenium", info: {
            "RecommendedDailyIntake": "35", "OverDosage": "200"
        },
    }, {
        name: "Sodium, Na", info: {
            "RecommendedDailyIntake": "2400", "OverDosage": "3500"
        },
    }, {
        name: "Zinc, Zn", info: {
            "RecommendedDailyIntake": "15", "OverDosage": "25"
        },
    }, {
        name: "Potassium, K", info: {
            "RecommendedDailyIntake": "4700", "OverDosage": "18800"
        },
    }, {
        name: "Vitamin B-6", info: {
            "RecommendedDailyIntake": "1.5",
        "OverDosage": "7.2"
        },
    }, {
        name: "Vitamin B-12", info: {
            "RecommendedDailyIntake": "2.4", "OverDosage": "9.6"
        },
    }, {
        name: "Vitamin A", info: {
            "RecommendedDailyIntake": "900", "OverDosage": "9000"
        },
    }, {
        name: "Manganese, Mn", info: {
            "RecommendedDailyIntake": "2.3", "OverDosage": "9.2"
        },
    }, {
        name: "Protein", info: {
            "RecommendedDailyIntake": "56", "OverDosage": "224"
        },
    },]
};



const ChartSlice = createSlice({
    name: 'ChartSlice',
    initialState,
    reducers: {

        calculateAndNormalizeNutrientsData(state, action: PayloadAction<productSliceType[]>) {
            state.Nutrients = [];
            const productList = action.payload;
            for (let i = 0; i < productList.length; i++) {
                const filteredNutrients = productList[i].product.foodNutrients.filter((nutrient) => {
                    const nutrientNames = state.NormForNutrients.map((nutrient) => nutrient.name);
                    return  nutrientNames.includes(nutrient.nutrientName)
                })

                if (filteredNutrients.length > 0) {
                    for(let j = 0; j < filteredNutrients.length; j++){
                        if(state.Nutrients.find((nutrient)=> nutrient.name === filteredNutrients[j].nutrientName)){
                            state.Nutrients[j].value += Number((filteredNutrients[j].value * productList[i].weight / 100).toFixed(3));
                        }else{
                             const neededNutrient = state.NormForNutrients.find((nutrient) => nutrient.name === filteredNutrients[j].nutrientName);
                            const nutrientValue: number = Number((filteredNutrients[j].value * productList[i].weight / 100).toFixed(3));
                            const chartValue: number =  comparisons(nutrientValue, {min: neededNutrient ?   Number(neededNutrient.info.RecommendedDailyIntake) : 0, max: neededNutrient ?  Number(neededNutrient.info.OverDosage) :  0 })
                            state.Nutrients.push({
                                name: filteredNutrients[j].nutrientName,

                                value:nutrientValue ,
                                unitName: filteredNutrients[j].unitName,
                                id: filteredNutrients[j].nutrientId,
                                chartValue: chartValue,
                            } as nutrientsType)
                        }
                     }


                }
            }
          }
    },
})
export const { calculateAndNormalizeNutrientsData, } = ChartSlice.actions;

export default ChartSlice.reducer;
