import axios from 'utils/axios'

async function addUser(hash: string): Promise<void> {
    return axios.post(`users/${hash}`)
}

async function checkUser(hash: string): Promise<boolean> {
    return axios.get(`user/${hash}`)
}

export { addUser, checkUser }
