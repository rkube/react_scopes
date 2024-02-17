//
import { useReducer, useState } from 'react'
import { ChakraProvider, Grid, GridItem } from '@chakra-ui/react'
import { Box, Flex, Divider, RadioGroup, Radio, Stack, Spacer} from '@chakra-ui/react'



import { DnDSignalContext } from './store/dnd_context'
import { SignalsProvider } from './store/signals_context'

import { AllSignalList } from './components/all_signal_list'
import { Selector } from './components/selector'
import { DynamicGrid } from './components/dynamic_grid'
import { RowSelector } from './components/row_selector'



import { type_t, signal_t, ptr_mode_types, ptr_mode_t, to_id, reducer_action_t, signal_display_t, state_t } from './types/all_types'
import { default_colors } from './lib/helpers'

import './App.css'

function App() {

  // const init_state:signal_t[] = [
  //   {
  //     // index: 0,
  //     shot: 100,
  //     type: "Type1",
  //     id: to_id(100, "Type_1"),
  //     timebase: [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0],
  //     samples: [0.0, 0.48, 0.84, 1.0, 0.91, 0.60, 0.14],
  //   },
  // ]

  // const [signalList, setSignalList] = useState<signal_t[]>(init_state)
  const [ptr_mode, set_ptr_mode] = useState<ptr_mode_t>("mode_hover")


  // display_signal_lists is a list of lists.
  // There is one list for each rendered plot.
  // Each sub-list contains a target reference to an id in all_signal list
  // and a style that is applied to this signal in the given plot.


  // Drag and Drop
  // const [isDropped, setIsDropped] = useState(false);

 
  // function handleDragEnd(event: any) {
  //   console.log("handleDragEnd here. event = ", event)

  //   if (event.over && event.over.id) {
  //     console.log("=====================draggable: event.over.id = ", event.over.id)

  //     setIsDropped(true);
  //     // drag-and-drop areas are labelled as area_{%02d}. 
  //     const update_ix = parseInt(event.over.id.slice(-2))

  //     console.log(`handleDragEnd: Updating at ix=${update_ix}`)
  //     dispatch_signal_lists({
  //       types: 'add_data_src',
  //       ix: update_ix,
  //       signal: event.active.data.current.signal
  //     })
  //   }
  // }

  const num_rows = 1 //signal_display_lists.length / 2

  return (
    <ChakraProvider>
      <SignalsProvider>
        {/* <DndContext collisionDetection={rectIntersection} onDragEnd={handleDragEnd} > */}
        <DnDSignalContext>
          <Grid
            templateColumns={'250px 1000px'}

            alignItems='stretch'
            fontWeight='bold'
          >

          <GridItem border='2px dashed green'>
            grid 1
            <Selector />
            <Divider borderColor={'blackAlpha'}  size='xl'  />
            <AllSignalList /> 
          </GridItem>

          <GridItem border='2px dashed green'>
            grid 2 
            <DynamicGrid ptr_mode={ptr_mode} num_rows={num_rows} row_height={400} />
            {/* signal_data_list={signal_data_list} 
                        signal_display_lists={signal_display_lists} 
                        dispatch_signal_display_lists={dispatch_signal_display_lists} 
                        ptr_mode={ptr_mode} 
                        num_rows={num_rows} 
                        row_height={400}/> */}
          </GridItem>
        </Grid>
        </DnDSignalContext>
    {/* </DndContext> */}

  </SignalsProvider>

  </ChakraProvider>
  )
}

export default App

    {/* <DndContext 
        collisionDetection={rectIntersection}
        onDragEnd={handleDragEnd}>
      <ChakraProvider>
        <Flex >
        <Box alignItems="center" justifyContent="center" height="50px" border="dashed red 1px">
        <RadioGroup onChange={(e) => set_ptr_mode(e as ptr_mode_t)} value={ptr_mode}>
          <Stack direction='row'>
          {ptr_mode_types.map((key, ix) => ( 
              <Radio value={key} key={ix.toString()}> {key} </Radio>
          ))}
          </Stack>
        </RadioGroup>
        </Box>
        <Spacer />
        <Divider orientation='vertical' />
        <Box> 
          <RowSelector dispatch_signal_lists={dispatch_signal_lists} />
        </Box>
        </Flex>
      <Divider borderColor={'blackAlpha'} size='lg' />

      <Grid
        templateColumns={'250px 1000px'}

        alignItems='stretch'
        fontWeight='bold'
      >

      <GridItem border='2px dashed green'>
        <Selector handle_new_signal={handle_new_signal} />
        <Divider borderColor={'blackAlpha'}  size='xl'  />
        <AllSignalList signal_list={signal_data_list} 
                cb={remove_signal_cb} />
      </GridItem>

          <GridItem> */}
        {/* <DynamicGrid signal_data_list={signal_data_list} 
                     signal_display_lists={signal_display_lists} 
                     dispatch_signal_display_lists={dispatch_signal_display_lists} 
                     ptr_mode={ptr_mode} 
                     num_rows={num_rows} 
                     row_height={400}/> */}
   {/*}   </GridItem>
    </Grid>
    </ChakraProvider>

  </DndContext> */}


