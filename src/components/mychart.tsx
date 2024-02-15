// Diong plotting stuff

import { useRef } from 'react';
import { ptr_mode_t, signal_t, to_str, signal_display_t } from '../types/all_types'
import { Chart as ChartJS, registerables, ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';

import { default_colors } from '../lib/helpers';


interface my_plot_i {
    signal_data_list: signal_t[],
    signal_display_list: signal_display_t[],
    plugin_list: any[],
    ptr_mode: ptr_mode_t
}

const MyPlot = ({signal_data_list, signal_display_list, plugin_list, ptr_mode}: my_plot_i ) => {
    // Reference to the plot in this component
    const chartRef = useRef(null)

    ChartJS.register(...registerables);

    console.log('MyPlot: ptr_mode = ', ptr_mode)
    ChartJS.register(plugin_list[0])

    // // If we want to register a plugin, do it here.
    if (ptr_mode == 'mode_crosshair') {
        // Do nothing, the crosshair plugin the plugin has already been registered
    } 
    if (ptr_mode == 'mode_hover') {
        // Unreggister the crosshair plugin if it is registered
        const active_plugin = ChartJS.registry.plugins.get("crosshair-plugin")
        if(active_plugin) {
            ChartJS.unregister(active_plugin)
        }
    }

    // Generate datasets from the list of all signal data and the list of signals to display
    // For each display to be rendered, compose data and style
    const signal_datasets = signal_display_list.map((item) => { 
        //
        const signal_data = signal_data_list.filter((signal) => signal.id === item.id)[0]
        return{
            label: to_str(signal_data), 
            data: signal_data.samples,
            borderColor: item.style.color,
            borderWidth: item.style.thickness,
            borderDash: item.style.borderDash
    }})

    // We need to tell TS that we have options for a line plot
    // https://react-chartjs-2.js.org/faq/typescript/
    const options: ChartOptions<"line"> = {
        responsive: true,
        interaction: {
            mode: 'nearest'
        },
        scales: {
            x: {
                // display: true,
                title: {
                    display: true,
                    text: 'x-axis label'
                }
            },
            y: {
                // display: true,
                title: {
                    display: true,
                    text: 'y-axis label'
                }
            }
        }
    }
      
    const labels = [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0];

    // An on-click callback 
    // Arguments:
    // e: any - since I can't figure out the type
    // Inspired by this: https://stackoverflow.com/questions/50515985/get-ylabel-value-onclick-chart-js
    // Relevant docs: https://www.chartjs.org/docs/latest/migration/v3-migration.html#removal-of-public-apis
    // Relevant tutorials: https://www.youtube.com/watch?v=Cf5Vyt8nSDo
    const lineplot_callback = (e: any) => {
        console.log("======== lineplot callback ==========")
        // Access current chart: https://github.com/reactchartjs/react-chartjs-2/issues/654#issuecomment-849418843
        if (chartRef.current) {
            console.log("e = ", e)
            const chart = ChartJS.getChart(chartRef.current)
            // console.log("chart = ", chart)
            // This returns the nearest indices???
            // console.log("ge (index) = ", chart?.getElementsAtEventForMode(e, 'index', {intersect: true}))
            // This returns the nearest values???.
            // We can extract the dataset index that we clicked on from
            // ge[0].datasetIndex
            // console.log("ge (value) = ", chart?.getElementsAtEventForMode(e, 'nearest', {intersect: true}))
            // This returns the closest dataset
            // console.log("ge (dataset) = ", chart?.getElementsAtEventForMode(e, 'dataset', {intersect: false}))

            const ge_value = chart?.getElementsAtEventForMode(e, 'nearest', {intersect: true}, true)

            // If we clicked on a point, extract the index of the dataset and the index within that dataset
            if ((ge_value) && (ge_value[0] !== undefined)) {
                const ix_dataset = ge_value[0].datasetIndex 
                const ix_signal = ge_value[0].index
                console.log("ix_dataset = ", ix_dataset, ", ix_Signal = ", ix_signal)
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
    };


    
    return(
        <>
        <Line ref={chartRef} data={data} options={options} onClick={lineplot_callback}/>
        </>
    )
}

export { MyPlot }