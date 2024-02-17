// Displays signals in card format

import { useContext, Fragment } from 'react'
import { SignalCard } from './signal_card'
// import { SignalSettingCard } from './signal_setting_card'
import { SignalsContext } from '../store/signals_context'


// import { signal_t } from '../types/all_types'

// The interface describes what to expect as a parameter
// interface signal_list_i {
//     signal_list: signal_t[] 
//     cb: (id: string) => void
// }

// Renders items_list
// const AllSignalList = ({ signal_list, cb }: signal_list_i) => {   
const AllSignalList = () => {   

    const signals_context = useContext(SignalsContext)

    const parent_name = "AllSignalList"
    return (
        <>
        {signals_context.data_list.map((_, ix) => (
            <Fragment key={ix}>
            {/* <SignalCard signal={item} ix={ix} parent={parent_name} cb={cb} /> */}
            <SignalCard ix={ix} parent={parent_name} />
            </Fragment>
        ))}
        </>
    )
}

export { AllSignalList }