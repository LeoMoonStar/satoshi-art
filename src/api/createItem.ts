import axios from './axios'

export type MetaDataType = {
    name: string
    description?: string
    copiesCount?: number
    file: string
    cover?: string
    status: string
    royalties: number
    type: string
}

export const uploadFile = (formData: FormData): Promise<Array<any>> =>
    axios.post('/upload', formData)

export const uploadMetaData = (metadata: MetaDataType): Promise<any> =>
    axios.post('/metadata', { payload: metadata })

export const updateMetaData = (id: string, tx_hash: string): Promise<void> =>
    axios.put(`/metadata/${id}`, { tx_hash })
