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
