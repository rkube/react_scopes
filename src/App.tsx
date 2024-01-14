import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import items_t from './types/all_types'
// import test_me from './components/list'
import MyList from './components/list'




function App() {
  const [count, setCount] = useState(0)

  const list_data:items_t[] = [
    {
      index: 1,
      title: "item 1"
    },
    {
      index: 2,
      title: "item 2"
    },
    {
      index: 3,
      title: "item 3"
    }
  ]


  // test_me(list_data)

  // console.log("Test mapping in App:")
  // console.log(list_data)
  // list_data.map((item:list_props_t): list_props_t => {{item.index+1, item.title}})
  // console.log(foo)

  return (
    <>
      <h1>Hello, World!</h1>
      <MyList items_list={list_data} />
    </>
  )
}

export default App
