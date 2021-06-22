import { useDispatch } from 'react-redux';
import { getUserInfo } from '../apis/users';
import { fetchProfile } from '../state/auth/actions';
import { useUserProfile } from '../state/auth/hooks';
import { AuthState } from 'state/auth/type';
import { Dispatch } from 'react';

export const getProfile = (userId: string, profile: AuthState, dispatch: Dispatch<any>) => {
  getUserInfo(userId).then(({ data }) => {
    const { avatarUrl, id, isArtist, isCelebrity, name } = data;
    dispatch(
      fetchProfile({
        address: profile!.address,
        id: userId,
        avatar: avatarUrl,
        isArtist,
        isCelebrity,
      })
    );
  });
};
