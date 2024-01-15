
import { Button, SimpleGrid, List, ListItem, Stack, Text } from '@chakra-ui/react'
import{ DeleteIcon } from '@chakra-ui/icons'
import { items_t } from '../types/all_types'


// The interface describes what to expect as a parameter
interface signal_list_i {
    signal_list: items_t[] 
    render: (i: items_t) => string
    cb: (ix: number) => void
}

// Renders items_list
const MyList = ({ signal_list, render, cb}: signal_list_i) => {   

    return (
        <SimpleGrid gap={12} px={12} columns={2}>


        <List size="l" variant="custom" spacing={2}>
            {signal_list.map((item, ix) => (
                <ListItem key={ix}>
                    <Stack direction='row'>
                    <Text color="black" fontSize='lg'> {render(item)} </Text>
                    <Button onClick={() => cb(ix)} size='sm'> <DeleteIcon/> </Button>
                    </Stack>
                </ListItem>
            ))}
        </List>
        </SimpleGrid>
    )
}

export default MyList