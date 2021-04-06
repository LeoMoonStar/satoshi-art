import { ethers } from 'ethers'
import { Interface } from 'ethers/lib/utils'
import Satoshi721 from 'abis/Satoshi721.json'
import { getKeyValue } from 'utils/helpers'

export const Satoshi721ABI = Satoshi721.abi

export interface NetworkData {
    address: string
    transactionHash: string
    links: any
    events: any
}

export const useSmartContractNetworkData = (chainId?: number): NetworkData => {
    return getKeyValue(Satoshi721.networks)(chainId as any)
}

export function useEthersUtils(): Interface {
    return new ethers.utils.Interface(Satoshi721ABI)
}
