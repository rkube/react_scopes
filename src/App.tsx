//
import { useEffect, useState } from 'react'
import './App.css'

import { type_e, items_t, to_str } from './types/all_types'
import MyList from './components/list'
import Selector from './components/selector'
import { ChakraProvider } from '@chakra-ui/react'


function App() {

  const init_state:items_t[] = [
    {
      index: 1,
      shot: 100,
      type: type_e.Type1,
    },
    {
      index: 2,
      shot: 101,
      type: type_e.Type2,
    },
    {
      index: 3,
      shot:102,
      type: type_e.Type1
    }
  ]

  const [ListData, setListData] = useState<items_t[]>(init_state)

  // This is a callback to selector. The function passes 
  // the currently selected type and shot number up.
  // From here, we construct a items_t and update the list.
  // See updating arrays in setState: https://react.dev/learn/updating-arrays-in-state
  const handleNewSignal = (new_type: type_e, new_shot: number) => {
    // console.log("handleNewSignal callback: shot = ", new_shot, ", new_type = ", new_type)
    // console.log("handleNewSignal: ListData = ", ListData)
    const new_item = {shot: new_shot, type: new_type, index: ListData.length + 1}
    // Update state
    setListData([...ListData, new_item])
  }

  return (
    <>
      <h1>Hello, World!</h1>
      <ChakraProvider>
      <Selector onClick={handleNewSignal} />
      <MyList items_list={ListData} render={(item: items_t): string => { return to_str(item)} }/>
      </ChakraProvider>
    </>
  )
}

export default App
