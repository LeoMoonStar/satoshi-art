import numeral from 'numeral'
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

export const getKeyValue = <
    T extends Record<string, unknown>,
    U extends keyof T
>(
    obj: T
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
) => (key: U) => obj[key]

export function convertEthToUsd(
    value: number,
    currency: number,
    fee = 0.025,
    format = '0,0.00'
): string {
    const amountInDollars = value * currency
    return numeral(amountInDollars - amountInDollars * fee).format(format)
}

export const fileToBase64 = (file: File): Promise<any> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })
