// Displays signals in card format
import { Fragment } from 'react'

import { Box } from '@chakra-ui/react'
import { SignalCard } from './signal_card'

import { signal_t } from '../types/all_types'

// The interface describes what to expect as a parameter
interface signal_list_i {
    signal_list: signal_t[] 
    cb: (id: string) => void
}

// Renders items_list
const AllSignalList = ({ signal_list, cb }: signal_list_i) => {   
    const parent_name = "AllSignalList"
    return (
        <Box>
        {signal_list.map((item, ix) => (
            <Fragment key={ix}>
            <SignalCard signal={item} ix={ix} parent={parent_name} cb={cb} />
            </Fragment>
        ))}
        </Box>
    )
}

export { AllSignalList }