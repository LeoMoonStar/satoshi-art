import { TokenType } from 'state/transactions/actions'
import axios from './axios'

export type Token = {
    id: string
    metadata: {
        type: TokenType
        thumbnail?: string
        payload: {
            name: string
            copiesCount: string // todo: Probably should has totalCount and currentCount
            description: string
            cover?: string
            file: string
        }
    }
}

export const getTokens = (): Promise<Token[]> => {
    return axios.get('/products')
}
