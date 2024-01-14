// Diong plotting stuff

// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
//     Title, Tooltip, Legend } from 'chart.js';
// import { ChartData, ChartOptions } from 'chart.js'

import { items_t, to_str } from '../types/all_types'
import { Chart, CategoryScale,  registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(...registerables);

const MyPlot = ({signals}: {signals: items_t[]}) => {


    // Generate plot datasets from the signal list:
    const signal_datasets = signals.map((sig) => { return{label: to_str(sig), data: sig.signal} })

    const options = {
        responsive: true,
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
        <Line  data={data} options={options} />
    )
}

export default MyPlot