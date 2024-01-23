//
import { useState } from 'react'
import { ChakraProvider, Grid, GridItem } from '@chakra-ui/react'
import { RadioGroup, Radio, Stack } from '@chakra-ui/react'
import './App.css'

import { type_e, signal_t, to_str, cross_hair_t, ptr_mode_types, ptr_mode_t } from './types/all_types'
import MyList from './components/list'
import Selector from './components/selector'
import MyPlot from './components/mychart'


function App() {

  const init_state:signal_t[] = [
    {
      index: 0,
      shot: 100,
      type: type_e.Type1,
      timebase: [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0],
      samples: [0.0, 0.48, 0.84, 1.0, 0.91, 0.60, 0.14]
    },
  ]


  const [signalList, setSignalList] = useState<signal_t[]>(init_state)

  const [ptrMode, setPtrMode] = useState<ptr_mode_t>("mode_hover")

  // This is a callback to selector. The function passes 
  // the currently selected type and shot number up.
  // From here, we construct a signal_t and update the list.
  // See updating arrays in setState: https://react.dev/learn/updating-arrays-in-state
  const handleNewSignal = (new_type: type_e, new_shot: number) => {
    const timebase:number[] = [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0]
    const samples:number[] = timebase.map((i) => i + Math.random() * 0.5)

    // Assign an index larger than the largest index in the array
    const new_ix = Math.max(...signalList.map(item => item.index)) + 1

    const new_item = {shot: new_shot, type: new_type, index: new_ix, 
      timebase: timebase, samples: samples}
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


  // Callback that receives input from chart plugins
  const [crosshairVal, setCrosshairVal] = useState<cross_hair_t>({x: 216, y: 2})

  const chart_cb = (new_crosshair_val: cross_hair_t) => {
    setCrosshairVal(new_crosshair_val)
  }


  return (
  <>
    <ChakraProvider>

  
    <Grid
      templateRows={'200px 1fr'}
      templateColumns={'1fr 1fr 1fr'}
      h='600px'
      gap='4'
      // color='blackAlpha.700'
      fontWeight='bold'
    >

        {/* https://stackoverflow.com/questions/55601342/using-enumerations-in-react-select */}

    <GridItem colSpan={3}>
      <RadioGroup onChange={(e) => {console.log("radio: e=", e);}}>
      {ptr_mode_types.map((key, value) => (
      <Radio value={key}> {key} </Radio>
      ))}
      </RadioGroup> 
    </GridItem>  

  <GridItem pl='2' bg='gray.300'>
    <Selector onClick={handleNewSignal} />
    <MyList signal_list={signalList} 
            render={(item: signal_t): string => { return to_str(item) } } 
            cb={remove_signal_cb} />
  </GridItem>
  <GridItem pl='2' bg='blue.100'>
    <MyPlot signals={signalList} sync_data={crosshairVal} xtalk_cb={chart_cb} />
  </GridItem>

  <GridItem pl='2' bg='green.100' >
    <MyPlot signals={signalList} sync_data={crosshairVal} xtalk_cb={chart_cb} />
  </GridItem>

</Grid>


      </ChakraProvider>
      </>
  )
}

export default App
