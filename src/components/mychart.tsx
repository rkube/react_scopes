// Diong plotting stuff

// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
//     Title, Tooltip, Legend } from 'chart.js';
// import { ChartData, ChartOptions } from 'chart.js'

import { useRef } from 'react';
import { items_t, to_str, type_e } from '../types/all_types'
import { Chart, CategoryScale,  registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(...registerables);

const pick_color = (sig_type:type_e): string => {
    switch(sig_type) {
        case type_e.Type1:
            return 'rgb(127, 201, 127)'
            break
        case type_e.Type2:
            return 'rgb(190, 174, 211)'
            break
        case type_e.Type3:
            return 'rgb(253, 192, 134)'
            break
        default:
            return 'rgb(255, 255, 153)'
    }
}


const MyPlot = ({signals}: { signals: items_t[] }) => {
    // Reference to the plot in this component
    const chartRef = useRef()

    // maps signal types to colors
    // Generate plot datasets from the signal list:
    const signal_datasets = signals.map((sig) => { return{
        label: to_str(sig), 
        data: sig.signal,
        borderColor: pick_color(sig.type)
    }})



    const options = {
        responsive: true,
        inteaction: {
            mode: 'nearest'
        },
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };
      
    const labels = [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0];

    // An on-click callback 
    // Inspired by this: https://stackoverflow.com/questions/50515985/get-ylabel-value-onclick-chart-js
    // Relevant docs: https://www.chartjs.org/docs/latest/migration/v3-migration.html#removal-of-public-apis
    // Relevant tutorials: https://www.youtube.com/watch?v=Cf5Vyt8nSDo
    const lineplot_callback = (e) => {
        console.log("======== lineplot callback ==========")
        // Access current chart: https://github.com/reactchartjs/react-chartjs-2/issues/654#issuecomment-849418843
        if (chartRef.current) {
            console.log("e = ", e)
            const chart = Chart.getChart(chartRef.current)
            // console.log("chart = ", chart)
            // This returns the nearest indices???
            // console.log("ge (index) = ", chart?.getElementsAtEventForMode(e, 'index', {intersect: true}))
            // This returns the nearest values???.
            // We can extract the dataset index that we clicked on from
            // ge[0].datasetIndex
            // console.log("ge (value) = ", chart?.getElementsAtEventForMode(e, 'nearest', {intersect: true}))
            // This returns the closest dataset
            // console.log("ge (dataset) = ", chart?.getElementsAtEventForMode(e, 'dataset', {intersect: false}))

            const ge_value = chart?.getElementsAtEventForMode(e, 'nearest', {intersect: true})

            // If we clicked on a point, extract the index of the dataset and the index within that dataset
            if (ge_value[0] !== undefined) {
                const ix_dataset = ge_value[0].datasetIndex 
                const ix_signal = ge_value[0].index
            }
            else {
                // Not clicked on a dataset. Do nothing.
                console.log("You did not click on a dataset :(")
            }



            // const canvasPosition = getRelativePosition(e, chart)
            // console.log("canvasPosition = ", canvasPosition)
            // const dataX = chart?.scales.x.getValueForPixel(canvasPosition.x)
            // const dataY = chart?.scales.x.getValueForPixel(canvasPosition.y)
            // console.log("dataX = ", dataX, ", dataY = ", dataY)
            // // Get x and y values from the labels and the loaded data
            // const valX = chart?.data.labels[dataX]
            // // const valY = chart?.data.datasets[]
            // // const valY = chart?.data.datasets
            // console.log("valX = ", valX)
            // console.log("chart.data = ", chart.data)
        }
        // console.log("dataX = ", dataX, ", dataY = ", dataY)
        // console.log(getElementAtEvent(chartRef.current, e))
        // const canvasPosition = chartRef.helpers.getRelativePosition(e, chart);
        // console.log(chartRef.scales.)
        console.log("======== lineplot callback ==========")

    }
      
    const data = {
        labels,
        datasets: signal_datasets
        // datasets: signals.map((sig) => {label: to_str(sig), data: sig.signal})
        // datasets: [
        //   {
        //     label: 'Dataset 1',
        //     data: [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0],
        //     // borderColor: 'rgb(255, 99, 132)',
        //     // backgroundColor: 'rgba(255, 99, 132, 0.5)',
        //   }
        // ],
      };
    

    return(
        <Line ref={chartRef} data={data} options={options} onClick={lineplot_callback}/>
    )
}

export default MyPlot