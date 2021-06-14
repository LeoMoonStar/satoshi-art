import axios from './axios';
import { readCookie } from './cookie';
import { createCollectibleToken, getOutstandingBalance } from './createcollectible'
//import { isApprovedArtist, createCollectibleBlock } from './collectibleBlockchain'
import { createCollectibleAbi } from 'abis/buy_and_sell';

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
  numberOfCopy: number;
  totalCopies: number;
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

export const getCollectibleAndNumber = (name?: string) => {
  return axios.get(`${process.env.REACT_APP_API}/api/public/search/collectibles/names?field=${name}`);
};

export const getCollectibles = (name?: string, page?:any) => {
  if (name==undefined) {
    return axios.get(`${process.env.REACT_APP_API}/api/public/home/collectibles?pageSize=8&page=${page}`);
  } else {
    return axios.get(`${process.env.REACT_APP_API}/api/public/search/collectibles?field=${name}`);
  }
};

export const getHistory = (Id: string) => {
  return axios.get(`${process.env.REACT_APP_API}/api/public/collectibles/trade/${Id}/history`)
}

export const buyCollectible = (Id: string, price: number) => {
  return axios.post(
    `${process.env.REACT_APP_API}/api/auth/trade/${Id}`,
    { price: price, tradeType: "onSale" },
    {
      headers: {
        id: readCookie('id'),
        token: readCookie('token'),
        metamask_address: readCookie('metamask_address'),
      },
    }
  )
}

export const getCollectibleSearches = (name: string) => {
  return axios.get(`${process.env.REACT_APP_API}/api/public/search/collectibles?field=${name}`)
}

export const getUserCollectibles = (Id: string, pageSize = 8, page = 1) => {
  return axios.get(`${process.env.REACT_APP_API}/api/public/user/${Id}/collectibles?pageSize=${pageSize}&page=${page}&tradable=2&user=owner`)
}

export const getOnSaleCollectibles = (Id: string, pageSize = 8, page = 1, tradable = 1, user = "creator") => {
  return axios.get(`${process.env.REACT_APP_API}/api/public/user/${Id}/collectibles?pageSize=${pageSize}&page=${page}&tradable=1&user=creator`)
}

export const getLikedCollectibles = (Id: string, pageSize = 8, page = 1) => {
  return axios.get(`${process.env.REACT_APP_API}/api/public/user/${Id}/get-user-liked`)
}

export const getOnHoldCollectibles = (Id: string, pageSize = 8, page = 1) => {
  return axios.get(`${process.env.REACT_APP_API}/api/public/user/${Id}/collectibles?pageSize=${pageSize}&page=${page}&tradable=0&user=owner`);
};

export const getCreatedCollectibles = (Id: string, pageSize = 8, page = 1) => {
  return axios.get(`${process.env.REACT_APP_API}/api/public/user/${Id}/collectibles?pageSize=${pageSize}&page=${page}&user=creator`)
}

export const getCollectible = (Id: string) => {
  return axios.get(`${process.env.REACT_APP_API}/api/public/collectibles/${Id}`);
};

export const getCollection = (Id: string) => {
  return axios.get(`${process.env.REACT_APP_API}/api/public/collection/${Id}`);
}

export const putCollectibleOnSale = async(Id: string, data: any) => {
  return axios.put(
    `${process.env.REACT_APP_API}/api/auth/${Id}/put-on-sale`,
    data,
    {
      headers: {
        id: readCookie('id'),
        token: readCookie('token'),
        metamask_address: readCookie('metamask_address'),
      },
    }
  )
}

export const removeCollectibleFromSale = async(Id: string) => {
  return axios.put(
    `${process.env.REACT_APP_API}/api/auth/${Id}/remove-on-sale`,
    {},
    {
      headers: {
        id: readCookie('id'),
        token: readCookie('token'),
        metamask_address: readCookie('metamask_address'),
      },
    }
  )
}

export const createCollection = (name: string) => {
  const [id, token, metamask_address] = [readCookie('id'), readCookie('token'), readCookie('metamask_address')];
  return axios.post(
    `${process.env.REACT_APP_API}/api/auth/user/collections/create`,
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

export const likeCollectible = (Id: string) => {
  return axios.post(
    `${process.env.REACT_APP_API}/api/auth/user/${Id}/like`,
    {},
    {
      headers: {
        id: readCookie('id'),
        token: readCookie('token'),
        metamask_address: readCookie('metamask_address'),
      },
    }
  )
}

export const dislikeCollectible = (Id: string) => {
  return axios.delete(
    `${process.env.REACT_APP_API}/api/auth/user/${Id}/unlike`,
    {
      headers: {
        id: readCookie('id'),
        token: readCookie('token'),
        metamask_address: readCookie('metamask_address'),
      },
    }
  )
}

export const thumbsupCollectible = (Id: string) => {
  return axios.post(
    `${process.env.REACT_APP_API}/api/auth/user/${Id}/thumbup`,
    {},
    {
      headers: {
        id: readCookie('id'),
        token: readCookie('token'),
        metamask_address: readCookie('metamask_address'),
      },
    }
  )
}

export const thumbsdownCollectible = (Id: string) => {
  return axios.delete(
    `${process.env.REACT_APP_API}/api/auth/user/${Id}/unthumbup`,
    {
      headers: {
        id: readCookie('id'),
        token: readCookie('token'),
        metamask_address: readCookie('metamask_address'),
      },
    }
  )
}

export const getCollectibleThumbs = (Id: string) => {
  return axios.get(`${process.env.REACT_APP_API}/api/public/collectibles/${Id}/number-thumbups`)
}

export const getCollectibleLikes = (Id: string) => {
  return axios.get(`${process.env.REACT_APP_API}/api/public/collectibles/${Id}/number-likes`)
}

export const getBalance = async() => {
  return await getOutstandingBalance(readCookie("metamask_address"));
}

export const createCollectible = async (data: any) => {
  await axios.post(
    `${process.env.REACT_APP_API}/api/auth/user/collectibles/create`, 
    data, 
    {
      headers: {
        id: readCookie('id'),
        token: readCookie('token'),
        metamask_address: readCookie('metamask_address'),
      },
    }
  );
};
