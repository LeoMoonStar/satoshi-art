import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'

import { useEagerConnect, useInactiveListener } from 'hooks'
import { useCurrentNetwork } from 'hooks/useCurrentNetwork'
import { checkUserWhitelisted } from 'api/user'
import { changeWhitelistedStatus } from './actions'

export function useConnectWallet(): void {
    const triedEager = useEagerConnect()
    const { createNetwork } = useCurrentNetwork()
    const { active, activate, error } = useWeb3React()

    // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
    useEffect(() => {
        if (triedEager && !active && !error) {
            // create at the moment of usage
            activate(createNetwork())
        }
    }, [triedEager, error, active, activate, createNetwork])

    useInactiveListener(!triedEager)
}

export const useUserWhiteListChecking = (): void => {
    const dispatch = useDispatch()
    const { account } = useWeb3React()

    useEffect(() => {
        if (!account) return

        checkUserWhitelisted(account).then((res) => {
            dispatch(changeWhitelistedStatus(res.isWhitelisted))
        })
    }, [dispatch, account])
}
