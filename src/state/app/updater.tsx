import { useEffect, useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'

import { useEagerConnect, useInactiveListener } from 'hooks'
import { useCurrentNetwork } from 'hooks/useCurrentNetwork'
import { updateBlockNumber } from './actions'

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

export function useUpdateBlockNumber(): void {
    const dispatch = useDispatch<AppDispatch>()
    const { library } = useWeb3React<Web3Provider>()

    const blockNumberUpdateEventHandler = useCallback(
        (blockNumber: number) => {
            dispatch(updateBlockNumber(blockNumber))
        },
        [dispatch]
    )

    useEffect(() => {
        if (library) {
            library.on('block', blockNumberUpdateEventHandler)
            return () => {
                library.removeListener('block', blockNumberUpdateEventHandler)
            }
        }
    }, [library, blockNumberUpdateEventHandler])
}
