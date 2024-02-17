
import { useContext } from 'react'

import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import { SignalsDispatchContext } from '../store/signals_context'
// import { reducer_action_t } from '../types/all_types'

// interface row_selector_i {
    // dispatch_signal_lists: React.Dispatch<reducer_action_t>
// }

function RowSelector() {

    const signals_dispatch = useContext(SignalsDispatchContext)

    function handle_change(e: any) {
        console.log("handle_change(), num_rows=", parseInt(e))
        signals_dispatch({
            type: "set_rows",
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