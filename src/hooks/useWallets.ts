import { useMemo } from 'react'
import { InjectedConnector } from '@web3-react/injected-connector'
//other types of connectors will be here
type SpecificWalletConnector = InjectedConnector

export interface WalletInfo<
    T extends SpecificWalletConnector = SpecificWalletConnector
> {
    name: string
    createConnector(): T
    href?: string
}

const createInjected = () => {
    return new InjectedConnector({
        supportedChainIds: [1, 3],
    })
}

//other wallets will be here after MVP
function useSupportedWallets() {
    const SUPPORTED_WALLETS: WalletInfo[] = [
        {
            name: 'Metamask',
            createConnector: createInjected,
            href: 'https://metamask.io',
        },
    ]
    return SUPPORTED_WALLETS
}

export function useWallets(): WalletInfo[] {
    const SUPPORTED_WALLETS = useSupportedWallets()
    return useMemo(() => {
        return SUPPORTED_WALLETS
    }, [SUPPORTED_WALLETS])
}
