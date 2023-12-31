import {Category} from "@/app/utils/consts/Categories";

export interface FoodNutrient {
    number?: number;
    name?: string;
    amount?: number;
    unitName: string;
    derivationCode: string;
    derivationDescription: string;
    dataPoints?: number;
    derivationId: number;
    foodNutrientId: number;
    foodNutrientSourceCode: string;
    foodNutrientSourceDescription: string;
    foodNutrientSourceId: number;
    indentLevel: number;
    max?: number;
    median?: number;
    min?: number;
    nutrientId: number;
    nutrientName: string;
    nutrientNumber: string;
    rank: number;
    value: number;
}

export interface Food {
    fdcId: number;
    commonNames?: string;
    publishedDate?: string;
    foodCategory?: string;
    mostRecentAcquisitionDate?: string;
    microbes?:[];
    finalFoodInputFoods?: [];
    foodMeasures?: [];
    foodAttributes?: [];
    foodAttributeTypes?: [];
    foodVersionIds?: [];
    dataType: string;
    description: string;
    foodCode?: string;
    foodNutrients: FoodNutrient[];
    publicationDate?: string;
    scientificName?: string;
    brandOwner?: string;
    gtinUpc?: string;
    ingredients?: string;
    ndbNumber: number;
    additionalDescriptions: string;
    allHighlightFields: string;
    score: number;
}

export interface FoodSearchResponse {
    aggregations: {
        dataType: {
            [key in Category]?: number
        }};
    foodSearchCriteria: {
        query: string;
        dataType: string[];
        pageSize: number;
        pageNumber: number;
        sortBy: string;
        sortOrder: string;
        brandOwner: string;
        tradeChannel: string[];
        startDate: string;
        endDate: string;
    };
    totalHits: number;
    currentPage: number;
    totalPages: number;
    foods: Food[];
}
