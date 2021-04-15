import { TokenType } from 'state/transactions/actions'
import axios from 'axios'
import api from './axios'

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
    return api.get('/products')
}

export const getCurrency = async () => {
    console.log('hl')
    const response = axios.get(
        `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.REACT_APP_ETHERSCAN_KEY}`
    )
    console.log(response)
}
