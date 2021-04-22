import { TokenType } from 'state/transactions/actions'
import axios from './axios'

export enum TokenStatus {
    waitForSale = 'waitForSale',
    waitForBid = 'waitForBid',
}
export type Token = {
    TokenID: string
    id: string
    price?: string
    status: TokenStatus
    metadata: {
        type: TokenType
        thumbnail?: string
        walletHash: string
        payload: {
            name: string
            copiesCount?: number // todo: Probably should has totalCount and currentCount
            description: string
            cover?: string
            file: string
        }
    }
}

type PutOnSaleParams = {
    id: string
    tx_hash: string
    price: string
    copiesOnSale?: number
}

type getTokensProps = {
    sort?: string
    walletHash?: string
    status?: string
}
export const getTokens = ({
    sort,
    walletHash,
    status,
}: getTokensProps): Promise<Token[]> => {
    return axios.get('/products', {
        params: {
            _sort: sort,
            'metadata.walletHash': walletHash,
            status,
        },
    })
}

export const getToken = (id: string): Promise<Token> => {
    return axios.get(`/products/${id}`)
}

export const putTokenOnSaleAPI = ({
    id,
    tx_hash,
    price,
    copiesOnSale,
}: PutOnSaleParams): Promise<void> => {
    return axios.put(`/products/${id}`, {
        status: TokenStatus.waitForSale,
        tx_hash,
        price,
        copiesOnSale,
    })
}
