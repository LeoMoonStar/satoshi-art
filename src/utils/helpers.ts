import { Web3Provider, ExternalProvider } from '@ethersproject/providers'

export function getLibrary(provider: ExternalProvider): Web3Provider {
    return new Web3Provider(provider)
}

export function shortAddress(address: string, slashIndex = 10): string {
    const addressLength = address.length
    return (
        address.slice(0, slashIndex) +
        '...' +
        address.slice(addressLength - 4, addressLength)
    )
}

export function percentageToBasicPoints(royaltiesPercentage: number): number {
    return royaltiesPercentage * 100
}
