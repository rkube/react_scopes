
import { Button, SimpleGrid } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

// import { Draggable } from './draggable'

import{ DeleteIcon } from '@chakra-ui/icons'
import { signal_t } from '../types/all_types'




// The interface describes what to expect as a parameter
interface signal_list_i {
    signal_list: signal_t[] 
    render: (i: signal_t) => string
    cb: (ix: number) => void
}

// Renders items_list
const MyList = ({ signal_list, render, cb }: signal_list_i) => {   
    return (
        <SimpleGrid gap={12} px={12} columns={1}>
        {signal_list.map((item, ix) => (
            <Card key={ix}>
                {/* <Draggable> */}

                <CardHeader> {render(item)} </CardHeader>
                <CardBody></CardBody>
                <CardFooter>
                    <Button onClick={() => cb(item.index)} size='sm'> <DeleteIcon/> </Button>
                </CardFooter>
                {/* </Draggable> */}

            </Card>
        ))}
        </SimpleGrid>
    )
}

export { MyList }