//
import { useReducer, useState } from 'react'
import { ChakraProvider, Grid, GridItem } from '@chakra-ui/react'
import { Box, Flex, Divider, RadioGroup, Radio, Stack, Spacer} from '@chakra-ui/react'
import './App.css'

import { DndContext, rectIntersection } from '@dnd-kit/core'


import { MyList } from './components/list'
import { Selector } from './components/selector'
// import { ScopesGrid } from './components/chart_area'
import { DynamicGrid } from './components/dynamic_grid'
import { RowSelector } from './components/row_selector'

import { type_t, signal_t, ptr_mode_types, ptr_mode_t, to_id, reducer_action_t, signal_display_t } from './types/all_types'


function App() {

  const init_state:signal_t[] = [
    {
      index: 0,
      shot: 100,
      type: "Type1",
      id: to_id(100, "Type_1"),
      timebase: [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0],
      samples: [0.0, 0.48, 0.84, 1.0, 0.91, 0.60, 0.14],
      style: undefined
    },
  ]

  // const [signalList, setSignalList] = useState<signal_t[]>(init_state)
  const [ptr_mode, set_ptr_mode] = useState<ptr_mode_t>("mode_hover")

  // Global signal list
  const [all_signal_list, set_all_signal_list] = useState<signal_t[]>(init_state)

  // Number of rows
  const [num_rows, set_num_rows] = useState<number>(1)

  // plot_signal_lists contains the list of signals to render in each plot.
  // Use a reducer consolidate updates to this list, when f.ex. adding rows
  // or adding signals to for a plot.

  function signal_list_reducer(state: signal_t[][], action: reducer_action_t) {

    // console.log("Reducer--- action = ", action)
    // console.log(`           id = ${action.id}`)


    if (action.type === 'add_signal') {
      // console.log(`Reducer: adding signal at ix=${action.ix}`)
      // console.log(`number of signal_lists: ${state.length}`)
      if ((action.ix <= state.length) && action.signal) {
        console.log("------------ reducer: adding signal at ", action.ix)
        console.log("             original state: ", state)
        console.log("             old signal list = ", state[action.ix])

        // Remember to not mutate state!!!
        var new_state = [] as signal_t[][]

        console.log("            new_state = ", new_state)

        console.log("    ------ pushing stuff ------")
        
        // Push copies of all signal lists into state
        for(var ix = 0; ix < action.ix; ix++) {
          console.log("  xoxoxox first loop: pushing")
          new_state.push([...state[ix]])
        }
        console.log("        after first loop: ", new_state)

        // Push a copy of state[ix], with the new signal added to it.
        var new_signal_list = [...state[ix]]
        new_signal_list.push(action.signal)
        new_state.push(new_signal_list)

        console.log("        after middle: ", new_state)

        // Push copies of all remaining signal lists into new state
        for(var ix = action.ix; ix < state.length - 1; ix++) {
          console.log("   xoxoxox second loop: pushing")
          new_state.push([...state[ix]])
        }

        console.log("         new state: ", new_state)
        console.log("         new signal list = ", new_state[action.ix])
        return new_state
      } else {
        throw Error("Reducer: trying to access signal_lists out of bounds or signal undefined")
      }
    } else if (action.type === 'rm_signal') {
      // console.log(`Reducer: removing signal at ix=${action.ix}`)
      // console.log(`state.length = ${state.length}`)
      // console.log(`id = ${action.id}`)

      if ((action.ix <= state.length) && (action.id)){
        state[action.ix] = state[action.ix].filter((item) => item.id !== action.id)
        return state
      } else {
        throw Error("Reducer: Trying to access signal_lists out of bounds or missing id.")
      }
    } else if (action.type === "update_style") {
      console.log(`Reducer: updating style at ix=${action.ix}`)
      if ((action.ix <= state.length) && (action.style)) {
        // state[action.ix].id
      }
      return state
    }
    throw Error("Unknown action")
  }

  const [plot_signal_lists, dispatch_signal_lists] = useReducer(signal_list_reducer, [[], []] as (signal_t[][]));

  // These are the signals to be rendered by the plots in ScopesGrids.
  // const [signal_list_1, set_signal_list_1] = useState<signal_t[]>([])
  // const [signal_list_2, set_signal_list_2] = useState<signal_t[]>([])


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
    // if (signal_list_1.length == 0) {
    //   new_ix = 0
    // } else {
    //   new_ix = Math.max(...signal_list_1.map(item => item.index)) + 1
    // }

    const new_item = {shot: new_shot, type: new_type, index: new_ix, 
      id: to_id(new_shot, new_type),
      timebase: timebase, samples: samples, style: undefined}
    // Update state
    set_all_signal_list([...all_signal_list, new_item])
  }

  // Callback to remove signals from the list
  // Arguments:
  // id_delete (string) - The `id` of the item to be filtered out of the list
  const remove_signal_cb = (id_delete: string) => {
    // set_signal_list_1(signal_list_1.filter((item) => item.id !== id_delete))
    // set_signal_list_2(signal_list_2.filter((item) => item.id !== id_delete))

    console.log(`Remove signal_cb here. id_delete=${id_delete}`)
    console.log("plot_signal_lists = ", plot_signal_lists)
    console.log("plot_signal_lists.length = ", plot_signal_lists.length)
    console.log(`id_delete = ${id_delete}`)

    // Delete this signal from all plot_signal_lists
    for (var ix_rm = 0; ix_rm < plot_signal_lists.length; ix_rm++) {
      dispatch_signal_lists({
        type: 'rm_signal',
        ix: ix_rm,
        id: id_delete
      })
    }

    set_all_signal_list(all_signal_list.filter((item) => item.id !== id_delete))
  }

  function handleDragEnd(event: any) {
    console.log("handleDragEnd here. event = ", event)

    if (event.over && event.over.id) {
      console.log("=====================draggable: event.over.id = ", event.over.id)

      setIsDropped(true);
      var update_ix: number = 0
      if (event.over.id === 'area1') {
        update_ix = 0
      } else if (event.over.id === 'area2') {
        update_ix = 1
      }

      console.log(`Updating at ix=${update_ix}`)
      dispatch_signal_lists({
        type: 'add_signal',
        ix: update_ix,
        signal: event.active.data.current.signal
      })
    }
  }

  return (
  <>
    <DndContext 
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
          <RowSelector num_rows={num_rows} set_num_rows={set_num_rows} />
        </Box>
        </Flex>
      <Divider borderColor={'blackAlpha'} size='lg' />

      <Grid
        templateColumns={'250px 1000px'}

        alignItems='stretch'
        fontWeight='bold'
      >

      <GridItem border='2px dashed green'>
        <Selector add_button_cb={handleNewSignal} />
        <Divider borderColor={'blackAlpha'}  size='xl'  />
        <MyList signal_list={all_signal_list} 
                cb={remove_signal_cb} />
      </GridItem>

      <GridItem>
        {/* <ScopesGrid signal_lists={[signal_list_1, signal_list_2]} 
                    signal_list_setters={[set_signal_list_1, set_signal_list_2]} 
                    ptr_mode={ptr_mode} 
                    num_rows={num_rows}/> */}
        <DynamicGrid signal_lists={plot_signal_lists} dispatch_signal_lists={dispatch_signal_lists} ptr_mode={ptr_mode} num_rows={num_rows} row_height={400}/>
      </GridItem>
    </Grid>
    </ChakraProvider>

  </DndContext>
  </>
  )
}

export default App
