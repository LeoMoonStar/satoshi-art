import axios from './axios';
import { readCookie } from './cookie';

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
  return axios.get(`/api/public/home/dropOfTheDay`);
};

export const getUserProfile = (Id: string): Promise<UserProfile> => {
  return axios.get(`/api/public/user/${Id}/profile`);
};

export const followUser = async (otherMetamaskId: string) => {
  await axios.post(
    `/api/auth/user/follow`,
    { followingMetamaskId: otherMetamaskId },
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
  await axios.delete(`/api/auth/user/${otherMetamaskId}/unfollow`, {
    headers: {
      id: readCookie('id'),
      token: readCookie('token'),
      metamask_address: readCookie('metamask_address'),
    },
  });

  return;
};

export const updateProfile = async (data: any) => {
  await axios.put(`/api/auth/user/edit-profile`, data, {
    headers: {
      id: readCookie('id'),
      token: readCookie('token'),
      metamask_address: readCookie('metamask_address'),
    },
  });

  return 'success';
};

export const checkIfArtist = (Id: string) => {
  return axios.get(`/api/public/user/${Id}/profile`);
};

export const getFollowers = (Id: string) => {
  return axios.get(`/api/public/user/${Id}/followers?pageSize=5&page=1`);
};

export const getFollowings = (Id: string) => {
  return axios.get(`/api/public/user/${Id}/followings?pageSize=5&page=1`);
};

export const getUserInfo = (Id: string) => {
  return axios.get(`/api/public/user/${Id}/profile`);
};
