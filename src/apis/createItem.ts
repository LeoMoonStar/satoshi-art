import axios from './axios';

export type MetaDataType = {
  name: string;
  description?: string;
  copiesCount?: number;
  file: string;
  cover?: string;
  royalties: number;
};

export const uploadFile = (formData: FormData): Promise<Array<any>> => {
  return axios.post('/upload', formData);
};

export const uploadMetaData = (
  metadata: MetaDataType,
  walletHash: string,
  type: string,
  thumbnail?: string
): Promise<any> => {
  return axios.post('/metadata', {
    payload: metadata,
    walletHash,
    type,
    status: 'pending',
    thumbnail,
  });
};

export const updateMetaData = (id: string, tx_hash: string, authToken: string): Promise<void> => {
  return axios.put(`/metadata/${id}`, { tx_hash, authToken });
};
