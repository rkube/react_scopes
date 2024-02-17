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



import { ptr_mode_t } from './types/all_types'
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


  const [ptr_mode, set_ptr_mode] = useState<ptr_mode_t>("mode_hover")


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
            </GridItem>
          </Grid>
        </DnDSignalContext>

  </SignalsProvider>

  </ChakraProvider>
  )
}

export default App
