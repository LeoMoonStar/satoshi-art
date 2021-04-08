import { useEffect, useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'

import { useEagerConnect, useInactiveListener } from 'hooks'
import { useCurrentNetwork } from 'hooks/useCurrentNetwork'
import { updateBlockNumber, changeWhitelistedStatus } from './actions'
import { checkUserWhitelisted } from 'api/user'
import { usePendingTransactions } from 'state/transactions/hooks'

export function useConnectWallet(): null {
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
    return null
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

export function useUpdateBlockNumber(): void {
    const dispatch = useDispatch<AppDispatch>()
    const { library } = useWeb3React<Web3Provider>()
    const pendingTransactions = usePendingTransactions()

    const blockNumberUpdateEventHandler = useCallback(
        (blockNumber: number) => {
            dispatch(updateBlockNumber(blockNumber))
        },
        [dispatch]
    )

    useEffect(() => {
        if (library && pendingTransactions.length > 0) {
            library.on('block', blockNumberUpdateEventHandler)
            return () => {
                library.removeListener('block', blockNumberUpdateEventHandler)
            }
        }
    }, [library, blockNumberUpdateEventHandler, pendingTransactions.length])
}
