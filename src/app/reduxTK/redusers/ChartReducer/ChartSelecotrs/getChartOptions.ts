import {RootState} from "@/app/reduxTK/store";

export const getChartOptions = (state: RootState) => state.chart.options;
