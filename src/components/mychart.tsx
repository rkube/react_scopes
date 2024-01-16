// Diong plotting stuff

// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
//     Title, Tooltip, Legend } from 'chart.js';
// import { ChartData, ChartOptions } from 'chart.js'

import { useRef } from 'react';
import { cross_hair_t, signal_t, to_str, type_e } from '../types/all_types'
import { Chart, ChartType, CategoryScale, Plugin, registerables, ChartOptions } from 'chart.js';
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
   


// This is an interface for the hover plugin
declare module 'chart.js' {
    interface PluginOptionsByType<TType extends ChartType> {
      extract_hover_coords?: {
        lineColor: string
        arg1: string
      },
      global_crosshair?: {
        lineColor: string
      }
    }
}

const MyPlot = ({signals, sync_data, xtalk_cb}: { signals: signal_t[], sync_data: cross_hair_t, xtalk_cb:any }) => {
    // Reference to the plot in this component
    const chartRef = useRef()

    // Generate datasets from the signal list that are passed to the LinePlot
    const signal_datasets = signals.map((sig) => { return{
        label: to_str(sig), 
        data: sig.samples,
        borderColor: pick_color(sig.type)
    }})


    // A plugin the pushes the index of the nearest point that the mouse is
    // hovering to to the parent through a callback.
    // Relevant tutorials: https://www.youtube.com/watch?v=X0nXI9sPMgA
    const extract_hover_coords: Plugin = {
        id: "extract_hover_coords",
        events: ['mousemove'],
        afterEvent: (chart: Chart, args: any) => {
            // console.log("======== extract_hover_coords - afterEvent =======")
            // console.log("args = ", args)
            // Argument destructuring for chart:
            const { canvas } = chart

            // this function picks up the nearest value in our plot
            function nearest_value(chart: Chart, mousemove: MouseEvent){
                // Try and find some data points
                const points = chart.getElementsAtEventForMode(mousemove, 'nearest', 
                    {intersect: false}, true)
                // points.length will be > 0 (that is, set) when a dataset point is near the cursor position.
                if (points.length){
                    // Store x and y pixel in the callback
                    // console.log("  Callback with  points[0] = ", points[0].index, points[0].element.x, points[0].element.y)
                    xtalk_cb({x: points[0].element.x, y: points[0].element.y} as cross_hair_t)
                }
            }
            // If the event is inside the chart areat, add an eventListener which 
            // extracts the closest data point to the cursor position.
            if(args.inChartArea) {
                canvas.addEventListener('mousemove', (e) => nearest_value(chart, e))
            }
        }
    }

    const get_crosshair_vals = (): cross_hair_t => sync_data

    // A plugin that draws a vertical line at the positin where we are hovering over in
    // one dataset through all plots.
    const global_crosshair: Plugin = {
        id: "global_crosshair",

        afterDraw: (chart: Chart, args: any) => {
            console.log("global_crosshair, afterDraw")
            const { ctx, scales, chartArea: {left, bottom, top}, data } = chart
            // If there are datasets, find the minimum and maximum y at the current index
            if(data.datasets) {
                console.log("We got ", data.datasets.length, " datasets here")
                const crosshair_ix = get_crosshair_vals()
                console.log("Drawing for ix_y = ", crosshair_ix)
                // Convert index for crosshair to pixels
                if (crosshair_ix.x != undefined) {
                    ctx.beginPath()
                    ctx.lineWidth = 2
                    ctx.strokeStyle = 'gray'
                    ctx.setLineDash([6, 6])
                    ctx.moveTo(crosshair_ix.x, bottom)
                    ctx.lineTo(crosshair_ix.x, top)
                    ctx.stroke()
                }
            }
        }
    }

    // We need to tell TS that we have options for a line plot
    // https://react-chartjs-2.js.org/faq/typescript/
    const options: ChartOptions<"line"> = {
        responsive: true,
        interaction: {
            mode: 'nearest'
        },
        plugins: {
            title: {
                display: true,
                text: ' this is the title '
            },
            extract_hover_coords: {
                lineColor: 'blue'
            }
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
      };
    
    return(
        <>
        <div>
            Drawing cross-hair at {sync_data.x} - {sync_data.y}
        </div>
        {/* // If we want to pass plugins we can also do this like: */}
        {/* // <Line ref={chartRef} data={data} options={options} plugins={[extract_hover_coords]} onClick={lineplot_callback}/> */}
        <Line ref={chartRef} data={data} options={options} plugins={[extract_hover_coords, global_crosshair]} onClick={lineplot_callback}/>
        </>
    )
}

export default MyPlot