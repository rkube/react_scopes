// Select things to put in our list

import { useState, MouseEvent, KeyboardEvent } from 'react'
import { Button, NumberInput, NumberInputField, Select } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import { type_t, signal_types } from '../types/all_types'


interface selector_i {
  add_button_cb: (new_type: type_t, new_shot: number) => void
}

const Selector = ({add_button_cb} : selector_i) => {

  console.log("Selector: add_button_cb = ", add_button_cb)

  const [shot, setShot] = useState<number | undefined >(undefined);
  const [selectedType, setSelectedType] = useState<type_t>("Type1")


  // Update selectedType from select menu:
  const update_type = (e: React.FormEvent<HTMLSelectElement>) => {
    console.log("update_type, type = ", e.currentTarget.value);
    setSelectedType(e.currentTarget.value as type_t)
  }

  // Callback for the add data button
  const add_signal = (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => {
    // Check if shot is undefined.
    if (shot !== undefined) {
      add_button_cb(selectedType, shot)
    }
  }


  return (
    <Box border="dashed red 1px" padding="1em">
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