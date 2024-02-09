
import { Fragment } from 'react'

import { Box } from '@chakra-ui/react'

import { signal_t } from '../types/all_types'

import { SignalCard } from './signal_card'


// The interface describes what to expect as a parameter
interface signal_list_i {
    signal_list: signal_t[] 
    cb: (id: string) => void
}

// Renders items_list
const MyList = ({ signal_list, cb }: signal_list_i) => {   
    const parent_name = "MyList"
    signal_list.map((item, ix) => console.log("item = ", item, ", ix = ", ix))
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

export { MyList }