//
import { useState } from 'react'
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
      title: "item 1",
      type: type_e.Type1,
    },
    {
      index: 2,
      shot: 101,
      title: "item 2",
      type: type_e.Type2,
    },
    {
      index: 3,
      shot:102,
      title: "item 3",
      type: type_e.Type1
    }
  ]

const [list_data, set_list_data] = useState<items_t[]>(init_state)

  return (
    <>
      <h1>Hello, World!</h1>
      <ChakraProvider>
      <Selector />
      <MyList items_list={list_data} render={(item: items_t): string => { return to_str(item)} }/>
      </ChakraProvider>
    </>
  )
}

export default App
