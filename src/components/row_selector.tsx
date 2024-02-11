
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'


interface row_selector_i {
    num_rows: number;           // Number of rows
    set_num_rows: React.Dispatch<React.SetStateAction<number>>;  // Updates number of rows
}

function RowSelector({num_rows, set_num_rows}: row_selector_i) {


    return (
        <NumberInput defaultValue={1} min={1} max={5} pattern={"[0-9]*"} onChange={(e) => set_num_rows(parseInt(e))}>
        <NumberInputField />
        <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
        </NumberInputStepper>
        </NumberInput>
    )
}

export { RowSelector }