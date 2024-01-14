
import { items_t } from '../types/all_types'
// import { ReactNode } from 'react'

// The interface describes what to expect as a parameter
interface items_list_i {
    items_list: items_t[] 
    render: (i: items_t) => string
}

// Renders items_list
const MyList = ({ items_list, render }: items_list_i) => {   

    return (
        <ul>
        { items_list.map((item, i) => ( <li key={i}> {render(item)} </li>)) }
        </ul>
    )
}

export default MyList