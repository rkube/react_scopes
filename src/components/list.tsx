
import { Button } from '@chakra-ui/react'
import { items_t } from '../types/all_types'
// import { ReactNode } from 'react'

// The interface describes what to expect as a parameter
interface signal_list_i {
    signal_list: items_t[] 
    render: (i: items_t) => string
    cb: (ix: number) => void
}

// Renders items_list
const MyList = ({ signal_list, render, cb}: signal_list_i) => {   

    // const new_cb = (ix: any) => {console.log('new_c, ix = ', ix)}

    return (
        <ul>
        { signal_list.map((item, ix) => ( 
        <li key={ix}> 
            {render(item)}
             <Button colorScheme='teal' size='xs' variant='ghost' onClick={() => cb(ix)}>-</Button> 
             {/* <Button onClick={() => {console.log("clicked")}}>button</Button> */}
        </li>)) }
        </ul>
    )
}

export default MyList