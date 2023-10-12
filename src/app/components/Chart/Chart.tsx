'use client'
import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import {useAppSelector} from "@/app/utils/hooks/redux";

import {nutrientsType, OptionConfig} from "@/app/reduxTK/redusers/ChartReducer/ChartSlice";




if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}


const Chart = (props: HighchartsReact.Props)=> {

   const data = useAppSelector(state => state.chart.Nutrients);
   const [chartConfig, setChartConfig] = React.useState<OptionConfig>({
       chart: {
           type: 'column'
       },
       title: {
           text: 'Nutrient Elements'
       },
       xAxis: {
           categories: [],
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

   })

React.useEffect(() => {


    setChartConfig({
        chart: {
            type: 'column'
        },
        series: [{
            name: 'Nutrient',
            data: data.map(( nutrient :nutrientsType) => {
                return nutrient.chartValue
            })
        }],
        title: {
            text: 'Nutrient Elements'
        },

        xAxis: {
            categories: data.map((nutrient: nutrientsType) => {
                return `${nutrient.name}  ${nutrient.value}`
            }),
            //@ts-ignore
            title:'s'

        },
        yAxis: {
            title: {
                text: 'Value'
            },
            max: 2,

        },


    })
}, [data] )

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartConfig}
                accessibility={true}

                {...props}
            />
        </div>
    );
};

export default Chart;
