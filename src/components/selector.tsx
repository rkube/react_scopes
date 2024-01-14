// Select things to put in our list

import { NumberInput, NumberInputField, Select } from '@chakra-ui/react'


const Selector = () => {

  return(
    <div>
      <div> {/* Type */}
      <Select placeholder="Select a type" onChange={(e) => console.log(e.target.value)}>
        <option value="Type 1">Type 1</option>
        <option value="Type 2">Type 2</option>
        <option value="Type 3">Type 3</option>
      </Select>
      </div> {/* Type */}
      <div> {/* Number */}
        <NumberInput>
          <NumberInputField  onChange={(e) => {console.log(e.target.value)}}/>
        </NumberInput>
      </div> {/* Number */}
    </div>
  )
}

export default Selector