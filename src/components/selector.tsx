// Select things to put in our list

import { useCallback, useEffect, useState, MouseEvent, KeyboardEvent } from 'react'
import { Button, NumberInput, NumberInputField, Select, Stack } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import { type_t } from '../types/all_types'


const Selector = (props) => {

  const [shot, setShot] = useState<number | undefined >(undefined);
  const [selectedType, setSelectedType] = useState<type_t>("Type2")


  // Update selectedType from select menu:
  const update_type = (e: React.FormEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    switch(e.currentTarget.value) {
      case "Type 1":
        setSelectedType("Type1")
        break
      case "Type 2":
        setSelectedType("Type2")
        break
      case "Type 3":
        setSelectedType("Type3")
        break
      default:
        console.log("This should not happen: selected_ix: ", e.currentTarget.value)
        break;
    }
  }

  // Callback for the add data button
  const add_signal = (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => {
    // Check if shot is undefined.
    if (shot !== undefined) {
      props.onClick(selectedType, shot)
    }
  }


  return(
    <div>
      <Stack spacing={10} direction='row'>
      <Select onChange={update_type}>
        <option value="Type 1">Type 1</option>
        <option value="Type 2">Type 2</option>
        <option value="Type 3">Type 3</option>
      </Select>
        <NumberInput>
          <NumberInputField  onChange={(e) => {setShot(Number(e.target.value))}}/>
        </NumberInput>
        <Button onClick={(e) => {add_signal(e)}}><AddIcon /></Button>
      </Stack>
    </div>
  )
}

export { Selector }