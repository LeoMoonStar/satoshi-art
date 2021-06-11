import axios from './axios';
import { readCookie } from './cookie';
//import { getUserInfo } from 'apis/users'
import { getCollectible } from 'apis/collectibles'

export type User = {
  thumbnailUrl: string;
  id: string;
};

export type UserProfile = {
  data: {
    isArtist: boolean;
    metamaskId: string;
    avatarUrl: string;
    name: string;
  };
};

export const getDropOfTheDay = () => {
  return axios.get(`${process.env.REACT_APP_API}/api/public/home/dropOfTheDay`);
};

export const followUser = async (otherMetamaskId: string) => {
  console.log(otherMetamaskId)
  await axios.post(
    `${process.env.REACT_APP_API}/api/auth/user/follow`,
    { followingUserId: otherMetamaskId },
    {
      headers: {
        id: readCookie('id'),
        token: readCookie('token'),
        metamask_address: readCookie('metamask_address'),
      },
    }
  );

  return;
};

export const unfollowUser = async (otherMetamaskId: string) => {
  await axios.delete(`${process.env.REACT_APP_API}/api/auth/user/${otherMetamaskId}/unfollow`, {
    headers: {
      id: readCookie('id'),
      token: readCookie('token'),
      metamask_address: readCookie('metamask_address'),
    },
  });

  return;
};

export const updateProfile = async (data: any) => {
  await axios.put(
    `${process.env.REACT_APP_API}/api/auth/user/edit-profile`, 
    data, {
    headers: {
      id: readCookie('id'),
      token: readCookie('token'),
      metamask_address: readCookie('metamask_address'),
    },
  });

  return 'success';
};

export const getFollowers = (Id: string) => {
  return axios.get(`${process.env.REACT_APP_API}/api/public/user/${Id}/followers?pageSize=5&page=1`);
};

export const getFollowings = (Id: string) => {
  return axios.get(`${process.env.REACT_APP_API}/api/public/user/${Id}/followings?pageSize=5&page=1`);
};

export const userBecomeArtist = () => {
  return axios.post(
    `${process.env.REACT_APP_API}/api/auth/user/request`,
    { headers: {
      id: readCookie("id"), 
      token: readCookie('token'), 
      metamask_address: readCookie('metamask_address') 
    }}
  )
}

export const getUserInfo = (Id: string) => {
  return axios.get(`${process.env.REACT_APP_API}/api/public/user/${Id}/profile?=`)
}

export const getCelebrityInfo = (Id: string) => {
  return axios.get(`${process.env.REACT_APP_API}/api/public/user/${Id}/celebrity-profile`)
}

export const getChallenge = (metamaskId: string) => {
  return axios.get(`${process.env.REACT_APP_API}/api/public/auth/${metamaskId.toLowerCase()}`)
}

export const getSignature = (challenge: string, token: string, metamaskId: string) => {
  return axios.get(`${process.env.REACT_APP_API}/api/public/auth/${challenge}/${token}/${metamaskId}`)
}

export const getTopSellers = () => {
  return axios.get(`${process.env.REACT_APP_API}/api/public/top-seller`)
}

export const getTopBuyers = () => {
  return axios.get(`${process.env.REACT_APP_API}/api/public/top-buyer`)
}

export const getTopCollectors = () => {
  return axios.get(`${process.env.REACT_APP_API}/api/public/top-collector`)
}

export const getTopArtists = () => {
  return axios.get(`${process.env.REACT_APP_API}/api/public/top-artist`)
}

export const getLargestCollections = () => {
  return axios.get(`${process.env.REACT_APP_API}/api/public/largest-collections`)
}

export const getOrderList = (pageSize = 8, page = 1) => {
  return axios.get(
    `${process.env.REACT_APP_API}/api/auth/user/order-list?pageSize=${pageSize}&page=${page}`,
    { headers: {
      id: readCookie("id"), 
      token: readCookie('token'), 
      metamask_address: readCookie('metamask_address') 
    }}
  )
}

export const updateCelebrityProfile = (data: any) => {
  console.log('api',data)
  return axios.post(
    `${process.env.REACT_APP_API}/api/auth/user/celebrity/profile`,
    data,
    { headers: {
      id: readCookie("id"), 
      token: readCookie('token'), 
      metamask_address: readCookie('metamask_address') 
    }}
  )
}

export const getNotifications = () => {
  return axios.get(
    `${process.env.REACT_APP_API}/api/auth/notification`,
    { headers: {
      id: readCookie("id"), 
      token: readCookie('token'), 
      metamask_address: readCookie('metamask_address') 
    }}
  )
}
