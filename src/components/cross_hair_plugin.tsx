// Cross-hair plugin for line plots

import { Chart, ChartEvent, Plugin } from "chart.js"
import React from "react"
import { cross_hair_t } from "../types/all_types"


interface event_args_i {
    event: ChartEvent, 
    replay: boolean, 
    changed?: boolean, 
    cancelable: false, 
    inChartArea: boolean
}

// Define an interface the extends the Plugin interface:
// https://github.com/chartjs/Chart.js/blob/767d64e7a90dbfe94f9c5d159a890054818c1680/src/types/index.d.ts#L816
interface crosshair_plugin_i extends Plugin {
    id: string;
    events: (keyof HTMLElementEventMap)[] | undefined
    sync_ref: React.MutableRefObject<cross_hair_t>
    xtalk_cb: (new_crosshair_val: cross_hair_t) => void;
    
    afterEvent: (chart: Chart, args: event_args_i, options: any) => void;
}

export { type crosshair_plugin_i }

class cross_hair_plugin implements crosshair_plugin_i {
    id: string;
    events: (keyof HTMLElementEventMap)[];
    sync_ref: React.MutableRefObject<cross_hair_t>;
    xtalk_cb: (new_crosshair_val: cross_hair_t) => void;
    
    constructor(_sr: React.MutableRefObject<cross_hair_t>, 
            _cb: (new_crosshair_val: cross_hair_t) => void) {
        this.id = "crosshair_plugin"
        this.events = ["mousemove" as keyof HTMLElementEventMap]
        this.xtalk_cb = _cb
        this.sync_ref = _sr
        console.log("Crosshair plugin consructor here ")
    }

    afterEvent = (chart: Chart, args: event_args_i) => {
        console.log("This is after_event: ", chart)
        const {canvas} = chart;

        // this function picks up the nearest value in our plot
        function nearest_value(mousemove: MouseEvent, chart: Chart, cb: (new_crosshair_val: cross_hair_t) => void){
            // Try and find some data points
            const points = chart.getElementsAtEventForMode(mousemove, 'nearest', 
                {intersect: false}, true)
            // points.length will be > 0 (that is, set) when a dataset point is near the cursor position.
            if (points.length){
                // Store x and y pixel of the datapoint we are hovering over through the callback
                const new_crosshair_coords: cross_hair_t = {x: points[0].element.x, y: points[0].element.y} 
                cb( new_crosshair_coords )
            }
        }
        // If the event is inside the chart area, add an eventListener which 
        // extracts the closest data point to the cursor position.
        if(args.inChartArea) {
            canvas.addEventListener('mousemove', (e) => nearest_value(e, chart, this.xtalk_cb))
        }
    }
    
}

export { cross_hair_plugin }
