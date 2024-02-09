//
import { useState } from 'react'
import { ChakraProvider, Grid, GridItem } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { Button, RadioGroup, Radio, Stack, VStack} from '@chakra-ui/react'
import './App.css'

import { DndContext, rectIntersection } from '@dnd-kit/core'

import { type_t, signal_t, ptr_mode_types, ptr_mode_t, to_id } from './types/all_types'
import { MyList } from './components/list'
import { Selector } from './components/selector'
import { ScopesGrid } from './components/chart_area'


function App() {

  const init_state:signal_t[] = [
    {
      index: 0,
      shot: 100,
      type: "Type1",
      id: to_id(100, "Type_1"),
      timebase: [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0],
      samples: [0.0, 0.48, 0.84, 1.0, 0.91, 0.60, 0.14]
    },
  ]

  // const [signalList, setSignalList] = useState<signal_t[]>(init_state)
  const [ptr_mode, set_ptr_mode] = useState<ptr_mode_t>("mode_hover")

  // Global signal list
  const [signal_list, set_signal_list] = useState<signal_t[]>(init_state)

  // These are the signals to be rendered by the plots in ScopesGrids.
  const [signal_list_1, set_signal_list_1] = useState<signal_t[]>([])
  const [signal_list_2, set_signal_list_2] = useState<signal_t[]>([])

  // These are the signals that are loaded globally
  // const [signal_list_global, set_signal_list_global] = useState<signal_t[]>(init_state)

  // Drag and Drop
  const [isDropped, setIsDropped] = useState(false);

  // This is a callback to selector. The function passes 
  // the currently selected type and shot number up.
  // From here, we construct a signal_t and update the list.
  // See updating arrays in setState: https://react.dev/learn/updating-arrays-in-state
  const handleNewSignal = (new_type: type_t, new_shot: number) => {
    const timebase:number[] = [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0]
    const samples:number[] = timebase.map((i) => i + Math.random() * 0.5)

    // Assign an index larger than the largest index in the array
    let new_ix = 0;
    if (signal_list_1.length == 0) {
      new_ix = 0
    } else {
      new_ix = Math.max(...signal_list_1.map(item => item.index)) + 1
    }

    const new_item = {shot: new_shot, type: new_type, index: new_ix, 
      id: to_id(new_shot, new_type),
      timebase: timebase, samples: samples}
    // Update state
    set_signal_list([...signal_list, new_item])
  }

  // Callback to remove signals from the list
  // Arguments:
  // id_delete (string) - The `id` of the item to be filtered out of the list
  const remove_signal_cb = (id_delete: string) => {
    console.log("remove_signal_cb")
    set_signal_list_1(signal_list_1.filter((item) => item.id !== id_delete))
    set_signal_list_2(signal_list_2.filter((item) => item.id !== id_delete))
    set_signal_list(signal_list.filter((item) => item.id !== id_delete))
  }

  function handleDragEnd(event: any) {
    console.log("handleDragEnd here. event = ", event)
    if (event.over && event.over.id) {
      console.log("draggable: event.over.id = ", event.over.id)
    }
    // console.log("event.over.id = ", event.over.id)
    if (event.over && event.over.id === 'area1') {
      // The dropped item has an id that corresponds to the index 
      // of the signal within the global list.
      // in event.active.data.current.ix

      setIsDropped(true);
      console.log("Dropped over area1!")
      console.log("signal = ", event.active.data.current.signal)
      set_signal_list_1([...signal_list_1, event.active.data.current.signal])
    } else if (event.over && event.over.id == 'area2') {
      setIsDropped(true);
      console.log("Dropped over area2")
      set_signal_list_2([...signal_list_2, event.active.data.current.signal])
    }
  }

  return (
  <>
    <DndContext 
        collisionDetection={rectIntersection}
        onDragEnd={handleDragEnd}>
      <ChakraProvider>



        {/* https://stackoverflow.com/questions/55601342/using-enumerations-in-react-select */}
        <Box alignItems="center" justifyContent="center" height="50px" border="dashed red 1px">
        <RadioGroup onChange={(e) => set_ptr_mode(e as ptr_mode_t)} value={ptr_mode}>
          <Stack direction='row'>
          {ptr_mode_types.map((key, ix) => ( 
              <Radio value={key} key={ix.toString()}> {key} </Radio>
          ))}
          </Stack>
        </RadioGroup>
        </Box>
      <Divider borderColor={'blackAlpha'} size='lg' />

      <Grid
        templateRows={'50px 1fr'}
        templateColumns={'1fr 4fr'}
        h='500px'
        alignItems='stretch'
        // color='blackAlpha.700'
        fontWeight='bold'
      >

      <GridItem >

        <Selector add_button_cb={handleNewSignal} />

        <Divider borderColor={'blackAlpha'}  size='xl'  />
        <MyList signal_list={signal_list} 
                cb={remove_signal_cb} />
      </GridItem>

      <GridItem>
        <ScopesGrid signal_lists={[signal_list_1, signal_list_2]} ptr_mode={ptr_mode} />
      </GridItem>
    </Grid>
    </ChakraProvider>

  </DndContext>
  </>
  )
}

export default App
