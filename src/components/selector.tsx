// Select things to put in our list

import { useState, useContext, MouseEvent, KeyboardEvent } from 'react'
import { Button, NumberInput, NumberInputField, Select } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import { type_t, signal_types, to_id } from '../types/all_types'
import { SignalsDispatchContext } from '../store/signals_context'



/*
 * Component that provides a form to add new data sources
 *
 */
const Selector = () => {

  const [shotnr, setShot] = useState<number | undefined >(undefined);
  const [selectedType, setSelectedType] = useState<type_t>("Type1")

  const signals_dispatch = useContext(SignalsDispatchContext)

  // Update selectedType from select menu:
  const update_type = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectedType(e.currentTarget.value as type_t)
  }

  // Callback for the add data button
  const add_signal = (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => {
    // Check if shot is undefined.
    if (shotnr !== undefined) {
      console.log("Add signal here")

      const timebase = [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0]
      const samples = timebase.map((i) => i + Math.random() * 0.5)

      signals_dispatch({
        type: 'add_data_src', 
        signal: {
          id: to_id(shotnr, selectedType),
          shot: shotnr,
          type: selectedType,
          timebase: timebase,
          samples: samples
      }})
      }
    }
  

  return (
    <Box border="dashed red 1px" padding="1em">
        {/* Selector */}
        <NumberInput colorScheme='teal' borderColor='black'>
          <NumberInputField onChange={(e) => {setShot(Number(e.target.value))}}/>
        </NumberInput>
        
        <Select borderColor='black' onChange={update_type} colorScheme='teal'>
        {signal_types.map((item, ix) => (
          <option value={item} key={ix}> {item} </option>
        ))}
      </Select>
        <Button width="100%" onClick={(e) => {add_signal(e)}} colorScheme='teal'><AddIcon /></Button>
    </Box>
  )
}

export { Selector }