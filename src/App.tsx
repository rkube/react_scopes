//
import { useEffect, useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import './App.css'

import { type_e, items_t, to_str } from './types/all_types'
import MyList from './components/list'
import Selector from './components/selector'
import MyPlot from './components/mychart'



function App() {

  const init_state:items_t[] = [
    {
      index: 1,
      shot: 100,
      type: type_e.Type1,
      timebase: [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0],
      signal: [0.0, 0.48, 0.84, 1.0, 0.91, 0.60, 0.14]
    },

  ]

  const [ListData, setListData] = useState<items_t[]>(init_state)

  // This is a callback to selector. The function passes 
  // the currently selected type and shot number up.
  // From here, we construct a items_t and update the list.
  // See updating arrays in setState: https://react.dev/learn/updating-arrays-in-state
  const handleNewSignal = (new_type: type_e, new_shot: number) => {
    // console.log("handleNewSignal callback: shot = ", new_shot, ", new_type = ", new_type)
    // console.log("handleNewSignal: ListData = ", ListData)
    const timebase:number[] = [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0]
    const signal:number[] = timebase.map((i) => i + Math.random() * 0.1)

    const new_item = {shot: new_shot, type: new_type, index: ListData.length + 1, 
      timebase: timebase, signal: signal}
    // Update state
    setListData([...ListData, new_item])
  }

  return (
  <div>
    <ChakraProvider>
      <h1>Hello, World!</h1>
        {/* <div className="row"> */}
          <Selector onClick={handleNewSignal} />
          <MyList items_list={ListData} render={(item: items_t): string => { return to_str(item)} }/>
        {/* </div> */}
        {/* <div className="row"> */}
        {/* </div> */}
        {/* <div className="row"> */}
          <MyPlot signals={ListData}/>
        {/* </div> */}
      </ChakraProvider>
      </div>
  )
}

export default App
