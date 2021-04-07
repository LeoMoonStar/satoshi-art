import axios from './axios'

const tokens = [
    {
        id: 1,
        title: 'Fresh Meat #F',
        additionalPrice: 124.56,
        price: 0.25,
        total: 6,
        count: 3,
    },
    {
        id: 2,
        title: 'Fresh Meat #F',
        additionalPrice: 124.56,
        price: 0.25,
        total: 6,
        count: 3,
    },
    {
        id: 3,
        title: 'Fresh Meat #F',
        additionalPrice: 124.56,
        price: 0.25,
        total: 6,
        count: 3,
    },
    {
        id: 4,
        title: 'Fresh Meat #F',
        additionalPrice: 124.56,
        price: 0.25,
        total: 6,
        count: 3,
    },
]

export const getTokens = (limit: number, offset: number): Promise<any> => {
    // return axios.get('https://satoshi-art-api.herokuapp.com/products')

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tokens)
        }, 800)
    })
}

export const getCountOfTokens = (): Promise<any> => {
    // todo: we send 0 limit and offset because we need only total count of
    //  tokens. We need this count for checking that list of tokens was updated or not
    // return axios.get('https://satoshi-art-api.herokuapp.com/products', {
    //     params: { limit: 0, offset: 0 },
    // })

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tokens)
        }, 800)
    })
}
