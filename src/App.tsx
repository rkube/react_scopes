//
import { useRef, useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
// import { Chart } from 'chart.js'
// import { getRelativePosition } from 'chart.js/helpers'
// import { getElementAtEvent } from 'react-chartjs-2'
import './App.css'

import { type_e, items_t, to_str } from './types/all_types'
import MyList from './components/list'
import Selector from './components/selector'
import MyPlot from './components/mychart'



function App() {

  const init_state:items_t[] = [
    {
      index: 0,
      shot: 100,
      type: type_e.Type1,
      timebase: [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0],
      signal: [0.0, 0.48, 0.84, 1.0, 0.91, 0.60, 0.14]
    },

  ]

  const [signalList, setSignalList] = useState<items_t[]>(init_state)

  // This is a callback to selector. The function passes 
  // the currently selected type and shot number up.
  // From here, we construct a items_t and update the list.
  // See updating arrays in setState: https://react.dev/learn/updating-arrays-in-state
  const handleNewSignal = (new_type: type_e, new_shot: number) => {
    const timebase:number[] = [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0]
    const signal:number[] = timebase.map((i) => i + Math.random() * 0.5)

    // Assign an index larger than the largest index in the array
    const new_ix = Math.max(...signalList.map(item => item.index)) + 1

    const new_item = {shot: new_shot, type: new_type, index: new_ix, 
      timebase: timebase, signal: signal}
    // Update state
    setSignalList([...signalList, new_item])
  }

  // Callback to remove signals from the list
  // Arguments:
  // ix (number) - The index of the signal that needs to be removed
  const remove_signal_cb = (ix: number) => {
    console.log("remove_signal_cb here, ix=", ix)
    const new_signal_list = signalList.filter((item) => item.index != ix)
    setSignalList(new_signal_list)
  }


  return (
  <div>
    <ChakraProvider>
      <h1>Hello, World!</h1>
          <Selector onClick={handleNewSignal} />
          <MyList signal_list={signalList} 
            render={(item: items_t): string => { return to_str(item) } } 
            cb={remove_signal_cb} />
          <MyPlot signals={signalList} />
      </ChakraProvider>
      </div>
  )
}

export default App
