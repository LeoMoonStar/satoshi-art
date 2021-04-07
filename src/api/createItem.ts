import axios from './axios'

export type MetaDataType = {
    name: string
    description?: string
    copiesCount?: number
    file: string
    cover?: string
    royalties: number
}

export const uploadFile = (formData: FormData): Promise<Array<any>> =>
    axios.post('/upload', formData)

export const uploadMetaData = (
    metadata: MetaDataType,
    walletHash: string,
    type: string
): Promise<any> =>
    axios.post('/metadata', {
        payload: metadata,
        walletHash,
        type,
        status: 'pending',
    })

export const updateMetaData = (id: string, tx_hash: string): Promise<void> =>
    axios.put(`/metadata/${id}`, { tx_hash })
