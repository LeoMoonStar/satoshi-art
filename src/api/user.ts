import axios from './axios'

export const addUser = (hash: string): Promise<void> =>
    axios.post(`users/${hash}`)

export const checkUser = (hash: string): Promise<void> =>
    axios.get(`user/${hash}`)
