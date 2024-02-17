// Displays signals in card format

import { useContext, Fragment } from 'react'
import { SignalCard } from './signal_card'
import { SignalsContext } from '../store/signals_context'

const AllSignalList = () => {   

    const signals_context = useContext(SignalsContext)

    const parent_name = "AllSignalList"
    return (
        <>
        {signals_context.data_list.map((_, ix) => (
            <Fragment key={ix}>
            <SignalCard ix={ix} parent={parent_name} />
            </Fragment>
        ))}
        </>
    )
}

export { AllSignalList }