
import { Fragment } from 'react'

import { SimpleGrid } from '@chakra-ui/react'


import { signal_t, to_str } from '../types/all_types'

import { SignalCard } from './signal_card'


// The interface describes what to expect as a parameter
interface signal_list_i {
    signal_list: signal_t[] 
    cb: (ix: number) => void
}

// Renders items_list
const MyList = ({ signal_list, cb }: signal_list_i) => {   
    const parent_name = "MyList"
    signal_list.map((item, ix) => console.log("item = ", item, ", ix = ", ix))
    return (
        <SimpleGrid gap={12} px={12} columns={1}>
        {signal_list.map((item, ix) => (
            <Fragment key={ix}>
            <SignalCard signal={item} ix={ix} parent={parent_name} cb={cb} />
            </Fragment>
            // <Card key={ix}>

            //     <CardHeader> {to_str(item)} </CardHeader>
            //     <CardBody></CardBody>
            //     <CardFooter>
            //         <Button onClick={() => cb(item.index)} size='sm'> <DeleteIcon/> </Button>
            //     </CardFooter>

            // </Card>
        ))}
        </SimpleGrid>
    )
}

export { MyList }