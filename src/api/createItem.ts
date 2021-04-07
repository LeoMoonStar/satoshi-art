import axios from './axios'

export const uploadFile = (formData: FormData): Promise<Array<any>> =>
    axios.post('/upload', formData)
