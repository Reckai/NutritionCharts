
export const comparisons = (value: number, compere : {min: number; max: number})=> {
    if(value <= compere.min) {

        return Number((value / compere.min).toFixed(3));
    }else if(value >= compere.min && value < compere.max)  {
        return Number(((value / compere.max) + 1).toFixed(3));
    }
    else{
        return 2;
    }

}

