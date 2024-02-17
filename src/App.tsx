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



import { ptr_mode_t , ptr_mode_types} from './types/all_types'
// import { default_colors } from './lib/helpers'

import './App.css'
import { SaveState } from './components/save_state'

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


  const num_rows = 1 
  return (
    <ChakraProvider>
      <SignalsProvider>
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
            <RowSelector />
          </Box>
        <Divider orientation='vertical' />
            <SaveState />
        </Flex>
        
        <DnDSignalContext>
          <Grid
            templateColumns={'250px 1000px'}
            alignItems='stretch'
            fontWeight='bold'
          >
            <GridItem >
              <Selector />
              <Divider borderColor={'blackAlpha'}  size='xl'  />
              <AllSignalList /> 
            </GridItem>

            <GridItem >
              <DynamicGrid ptr_mode={ptr_mode} num_rows={num_rows} row_height={400} />
            </GridItem>
          </Grid>
        </DnDSignalContext>

  </SignalsProvider>

  </ChakraProvider>
  )
}

export default App
