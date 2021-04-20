import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'

import { disconnectAccount } from 'state/app/actions'

/**
 * Disconnect user wallet and clear redux state related to this wallet
 */
const useDisconnect = (): (() => void) => {
    const { deactivate } = useWeb3React()
    const dispatch = useDispatch()

    return () => {
        deactivate()
        dispatch(disconnectAccount())
    }
}

export default useDisconnect
