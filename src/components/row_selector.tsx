
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'

import { reducer_action_t } from '../types/all_types'

interface row_selector_i {
    dispatch_signal_lists: React.Dispatch<reducer_action_t>
}

function RowSelector({dispatch_signal_lists}: row_selector_i) {

    function handle_change(e) {
        // (e) => set_num_rows(parseInt(e))
        console.log("handle_change(), num_rows=", parseInt(e))
        dispatch_signal_lists({
            type: "set_rows",
            ix: 0,
            num_rows: parseInt(e)
        })
    }

    return (
        <NumberInput defaultValue={1} min={1} max={5} pattern={"[0-9]*"} onChange={handle_change}>
        <NumberInputField />
        <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
        </NumberInputStepper>
        </NumberInput>
    )
}

export { RowSelector }