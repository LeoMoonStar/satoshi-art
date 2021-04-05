import { ethers } from 'ethers'
import Satoshi721 from 'abis/Satoshi721.json'

export const Satoshi721ABI = Satoshi721.abi

interface NetworkData {
    address: string
    transactionHash: string
    links: any
    events: any
}

export const useSmartContractNetworkData = (chainId?: number): NetworkData => {
    const getKeyValue = <T extends Record<string, unknown>, U extends keyof T>(
        obj: T
    ) => (key: U) => obj[key]
    return getKeyValue(Satoshi721.networks)(chainId as any)
}

//@TODO: add return type
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useEthersUtils() {
    return new ethers.utils.Interface(Satoshi721ABI)
}
