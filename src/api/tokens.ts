import { TokenType } from 'state/transactions/actions'
import axios from './axios'

export type Token = {
    TokenID: string
    id: string
    metadata: {
        type: TokenType
        thumbnail?: string
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
}
export const getTokens = ({
    sort,
    walletHash,
}: getTokensProps): Promise<Token[]> => {
    return axios.get('/products', {
        params: {
            _sort: sort,
            'metadata.walletHash': walletHash,
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
        status: 'waitForSale',
        tx_hash,
        price,
        copiesOnSale,
    })
}
