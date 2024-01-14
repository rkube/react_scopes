// Select things to put in our list

import { useCallback, useEffect, useState, MouseEvent, KeyboardEvent } from 'react'
import { Button, NumberInput, NumberInputField, Select, Stack } from '@chakra-ui/react'

import { type_e } from '../types/all_types'


const Selector = (props) => {

  const [shot, setShot] = useState<number | undefined >(undefined);
  const [selectedType, setSelectedType] = useState<type_e>(type_e.Type2)
  const [ts, setTs] = useState<string | undefined>(undefined)

  // After changing values with setState they don't update immediately, but
  // are enqueued for change. useEffect is recommended to show values once
  // they are updated:
  // https://stackoverflow.com/questions/56247433/how-to-use-setstate-callback-on-react-hooks
  // https://react.dev/reference/react/Component#setstate
  //

  // useEffect(() =>{
  //   console.log("=============== UseEffect! ==================")
  //   console.log("shot = ", shot)
  //   console.log("selectedType = ", selectedType)
  //   console.log("ts = ", ts)
  //   console.log("=============== UseEffect! ==================")
  // })

  // Update selectedType from select menu:
  const update_type = (e: React.FormEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    switch(e.currentTarget.value) {
      case "Type 1":
        // console.log("Ok: selected_ix: ", e.currentTarget.value)
        setSelectedType(type_e.Type1)
        setTs("Type1")
        // console.log("this_type = ", selectedType, ", ts=", ts)
        break
      case "Type 2":
        // console.log("Ok: selected_ix: ", e.currentTarget.value)
        setSelectedType(type_e.Type2)
        setTs("Type2")
        // console.log("this_type = ", selectedType, ", ts =", ts)

        break
      case "Type 3":
        // console.log("Ok: selected_ix: ", e.currentTarget.value)
        setSelectedType(type_e.Type3)
        setTs("Type3")
        // console.log("this_type = ", selectedType, ", ts=", ts)
        break
      default:
        console.log("This should not happen: selected_ix: ", e.currentTarget.value)
        // console.log(e.currentTarget.value)
        break;
    }
  }

  const add_signal = (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => {
    console.log(e)
    console.log("this_type = ", selectedType)
    console.log("shot = ", shot)
    props.onClick(selectedType, shot)

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
        <Button onClick={(e) => {add_signal(e)}}>Add data</Button>
      </Stack>
    </div>
  )
}

export default Selector