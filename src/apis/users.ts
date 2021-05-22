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

export const getDropOfTheDay = (): Promise<any> => {
  return axios.get(`/api/public/home/dropOfTheDay`);
};

export const getUserProfile = (userId: string): Promise<UserProfile> => {
  return axios.get(`/api/public/user/${userId}/profile`);
};

export const followUser = (otherUserId: string): Promise<any> => {
  return axios.post(
    `/api/auth/user/follow`,
    { followingMetamaskId: otherUserId },
    {
      headers: {
        id: readCookie('id'),
        token: readCookie('token'),
        metamask_address: readCookie('metamask_address'),
      },
    }
  );
};

export const unfollowUser = async (otherUserId: string): Promise<any> => {
  return axios.delete(`/api/auth/user/${otherUserId}/unfollow`, {
    headers: {
      id: readCookie('id'),
      token: readCookie('token'),
      metamask_address: readCookie('metamask_address'),
    },
  });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const updateProfile = (data: any): Promise<any> => {
  return axios.put(`/api/auth/user/edit-profile`, data, {
    headers: {
      id: readCookie('id'),
      token: readCookie('token'),
      metamask_address: readCookie('metamask_address'),
    },
  });
};

export const getFollowers = (userId: string, pageSize: number, page: number): Promise<any> => {
  return axios.get(`/api/public/user/${userId}/followers?pageSize=${pageSize}&page=${page}`);
};

export const getFollowings = (userId: string, pageSize: number, page: number): Promise<any> => {
  return axios.get(`/api/public/user/${userId}/followings?pageSize=${pageSize}&page=${page}`);
};
