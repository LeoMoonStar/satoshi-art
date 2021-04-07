import axios from './axios'

export const addUser = (hash: string): Promise<void> => {
    return axios.post(`users/${hash}`)
}

export const checkUser = (hash: string): Promise<void> => {
    return axios.get(`user/${hash}`)
}

export const checkUserWhitelisted = (
    hash: string
): Promise<{ isWhitelisted: boolean }> => {
    return axios.get(`isWhitelisted/${hash}`)
}
