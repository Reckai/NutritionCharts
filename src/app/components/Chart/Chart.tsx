import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import {useAppSelector} from "@/app/utils/hooks/redux";

const options: Highcharts.Options = {
    title: {
        text: 'My chart'
    },
    series: [{
        type: 'line',
        data: [1, 2, 3]
    }]
};


if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}
const Chart = (props: HighchartsReact.Props)=> {
    const data = useAppSelector(state => state.products.Nutrients)
    const chartComponentRef = React.useRef<HighchartsReact.RefObject>(null);
    const [chartOptions, setChartOptions] = React.useState<any | null>(null);

    React.useEffect(() => {
        console.log(data[0]?.name , data[0]?.value)

     setChartOptions({

         chart: {
             type: 'column'
         },
         title: {
             text: 'Nutrient Elements'
         },
         xAxis: {
             categories: data?.map((item)=> `${item.name}, ${item.unitName}`),
         },
         yAxis: {
             title: {
                 text: 'Value'
             },

         },
         series: [{
             name: 'Nutrient',
             data: data.map((item)=> item.value)
         }],

     })
    }, [data])

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
                accessibility={true}

                {...props}
            />
        </div>
    );
};

export default Chart;