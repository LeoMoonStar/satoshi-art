import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'

import { useEagerConnect, useInactiveListener } from 'hooks'
import { useCurrentNetwork } from 'hooks/useCurrentNetwork'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'

export function useConnectWallet(): Web3ReactContextInterface {
    const triedEager = useEagerConnect()
    const { createNetwork } = useCurrentNetwork()
    const web3 = useWeb3React()
    const { active, activate, error } = web3

    // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
    useEffect(() => {
        if (triedEager && !active && !error) {
            // create at the moment of usage
            activate(createNetwork())
        }
    }, [triedEager, error, active, activate, createNetwork])

    useInactiveListener(!triedEager)
    return web3
}
