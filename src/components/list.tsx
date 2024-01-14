
import items_t from '../types/all_types'

// const test_me = (ll: list_props_t[]): number => {

//     console.log(ll)
//     ll.map((item: list_props_t): number => {const foo = item.index+1; console.log(foo); return foo})
  
//     return(0);
//   }

// export default test_me

interface items_list_i {
    items_list: items_t[] 
}

const MyList = ({ items_list }: items_list_i) => {   

    console.log("In element:")
    console.log(items_list) 

    items_list.map((item:items_t) => {item.index+1} )    // ll.map((item: list_props_t) => (console.log(item.title)))

    return (
        <ul>

        {items_list.map((item, i) => (
                <li key={i}> {item.title} </li>
        ))
        }

        </ul>
    )
}

export default MyList