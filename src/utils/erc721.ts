import { ethers } from 'ethers'
import Satoshi721 from 'abis/Satoshi721.json'

export const Satoshi721ABI = Satoshi721.abi

//@TODO: add return type
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useEthersUtils() {
    return new ethers.utils.Interface(Satoshi721ABI)
}
