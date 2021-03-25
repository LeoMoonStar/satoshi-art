import { useCallback, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { NetworkConnector } from '@web3-react/network-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Web3Provider } from '@ethersproject/providers'

import Networks from 'networks'

const createInjected = () =>
    new InjectedConnector({
        supportedChainIds: [1, 3, 4, 5, 42],
    })

interface CurrentNetwork {
    id: number
    name: string
    accepted: boolean
    explorer: string
    testnet: boolean
    rpc: string
}

interface EnhancedCurrentNetwork extends CurrentNetwork {
    createInjected: () => InjectedConnector
    createNetwork: () => NetworkConnector
}

export const useCurrentNetwork = (): EnhancedCurrentNetwork => {
    const { chainId } = useWeb3React<Web3Provider>()
    console.log({ chainId })
    const currentNetwork: CurrentNetwork = useMemo(() => {
        if (chainId) {
            const selectedChain = Networks[chainId]
            return {
                id: chainId,
                name: selectedChain.name,
                accepted: selectedChain.accepted,
                testnet: selectedChain.testnet,
                explorer: selectedChain.EXPLORER,
                rpc: selectedChain.RPC_URI,
            }
        }

        return {
            id: 1,
            name: 'Ethereum Mainnet',
            accepted: true,
            testnet: false,
            explorer: 'https://etherscan.io',
            rpc: process.env.REACT_APP_HTTP_PROVIDER as string,
        }
    }, [chainId])

    const createNetwork = useCallback(() => {
        return new NetworkConnector({
            urls: { [currentNetwork.id]: currentNetwork.rpc },
            defaultChainId: 1,
        })
    }, [currentNetwork])

    return useMemo(() => {
        return {
            ...currentNetwork,
            createNetwork,
            createInjected,
        }
    }, [currentNetwork, createNetwork])
}
