import { TokenType } from 'state/transactions/actions'
import preview from 'shared/images/artist/work.jpg'
import { Token } from 'api/tokens'

export const testingArray = (tokens: Token[]): Token[] => {
    const testingTokens = [...tokens]
    testingTokens.unshift({
        TokenID: '24',
        id: '607e8bd777ca3c0014e4b8bf',
        metadata: {
            type: TokenType.MULTIPLE,
            thumbnail: preview,
            payload: {
                name: 'Fresh Meat #F',
                copiesCount: 20,
                description: '',
                file: preview,
            },
        },
    })
    return testingTokens
}
