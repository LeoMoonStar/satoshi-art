import axios from './axios';
import { readCookie } from './cookie';
//import { isApprovedArtist, createCollectibleBlock } from './collectibleBlockchain'

export type MetaData = {
  page: number;
  pageSize: number;
  total: number;
  totalPage: number;
};

export type Collectible = {
  id: string;
  ownerId: string;
  creatorId: string;
  tokenId: string;
  name: string;
  description?: string;
  price: number;
  status: string;

  file?: {
    fileUrl?: string;
    thumbnailUrl: string;
  };
  thumbnailUrl?: string;

  properties: [];

  // unadded
  walletHash: string;
};

export type CollectibleInfo = {
  status: string;
  ownerId: string;
  creatorId: string;
  thumbnailUrl: string;
  tokenId: string;
  id: string;
  name: string;
  price: number;
  description: [];
  properties: [];
  walletHash?: string;
};

export type CollectibleInfoResponse = {
  data: CollectibleInfo;
};

export type Response = {
  data: Collectible[];
  metadata: MetaData;
};

export type CreateCollectible = {
  status: string;
  name: string;
  tokenId: string;
  royalties: number;
  collectionId: string;
  price: number;
  file: {
    filenName: string;
    mediaType: string;
    content: string;
  };
};

export const getCollectibles = (name?: string): Promise<Response> => {
  if (!name) {
    return axios.get(`/api/public/home/collectibles?pageSize=8&page=$1`);
  } else {
    return axios.get(`/api/public/search/collectibles?field=${name}`);
  }
};

export const getOnSaleCollectibles = (metamaskId: string, pageSize = 8, page = 1): Promise<Response> => {
  return axios.get(
    `/api/public/user/${metamaskId.toLowerCase()}/collectibles?pageSize=${pageSize}&page=${page}&tradable=1&user=owner`
  );
};

export const getOnHoldCollectibles = (metamaskId: string, pageSize = 8, page = 1): Promise<Response> => {
  return axios.get(
    `/api/public/user/${metamaskId.toLowerCase()}/collectibles?pageSize=${pageSize}&page=${page}&tradable=0&user=owner`
  );
};

export const getCreatorsCollectibles = (metamaskId: string, pageSize = 8, page = 1): Promise<Response> => {
  return axios.get(
    `/api/public/user/${metamaskId.toLowerCase()}/collectibles?pageSize=${pageSize}&page=${page}&user=creator`
  );
};

export const getCollectible = (id: string): Promise<CollectibleInfoResponse> => {
  return axios.get(`/api/public/collectibles/${id}`);
};

export const createCollection = (name: string) => {
  return axios.post(
    `/api/auth/user/collections/create`,
    { collectionName: name },
    {
      headers: {
        id: readCookie('id'),
        token: readCookie('token'),
        metamask_address: readCookie('metamask_address'),
      },
    }
  );
};

export const createCollectible = async (data: any) => {
  //const isApproved = isApprovedArtist(account)

  /*if (isApproved) {
		data.tokenIds = createCollectibleBlock()
	}*/

  await axios.post(`/api/auth/user/collectibles/create`, data, {
    headers: {
      id: readCookie('id'),
      token: readCookie('token'),
      metamask_address: readCookie('metamask_address'),
    },
  });

  return;
};
