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

type getTokensProps = {
    sort?: string
    walletHash?: string
}
export const getTokens = ({
    sort,
    walletHash,
}: getTokensProps): Promise<Token[]> => {
    return api.get('/products', {
        params: {
            _sort: sort,
            'metadata.walletHash': walletHash,
        },
    })
}

export const getToken = (id: string): Promise<Token> => {
    return api.get(`/products/${id}`)
}

export const getCurrency = async (): Promise<string> => {
    const response = await axios.get(
        `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.REACT_APP_ETHERSCAN_KEY}`
    )
    return response.data.result.ethusd
}
