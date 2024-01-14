// Select things to put in our list

import { useCallback, useState } from 'react'
import { Button, NumberInput, NumberInputField, Select, Stack } from '@chakra-ui/react'

import { type_e } from '../types/all_types'


const Selector = () => {

  const [shot, setShot] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<type_e>(type_e.Type2)

  // Update selectedType from select menu:
  const update_type = (e: React.FormEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    switch(e.currentTarget.value) {
      case "Type 1":
        console.log("Ok: selected_ix: ", e.currentTarget.value)
        setSelectedType(type_e.Type1)
        console.log("this_type = ", selectedType)
        break
      case "Type 2":
        console.log("Ok: selected_ix: ", e.currentTarget.value)
        setSelectedType(type_e.Type2)
        console.log("this_type = ", selectedType)

        break
      case "Type 3":
        console.log("Ok: selected_ix: ", e.currentTarget.value)
        setSelectedType(type_e.Type3)
        console.log("this_type = ", selectedType)
        break
      default:
        console.log("This should not happen: selected_ix: ", e.currentTarget.value)
        console.log(e.currentTarget.value)
        break;
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
        <Button onClick={(e) => {console.log(e)}}>Add data</Button>
      </Stack>
    </div>
  )
}

export default Selector