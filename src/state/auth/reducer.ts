import { BooleanLiteral } from '@babel/types';
import { createReducer } from '@reduxjs/toolkit';
import { fetchProfile, removeProfile } from './actions';
import { AuthState } from './type';

const initialState: AuthState = {
  id: '',
  avatar: '',
  address: '',
  isArtist: false,
  isCelebrity: false,
};

export default createReducer(initialState, auth => {
  auth
    .addCase(fetchProfile, (state, action) => {
      const { address, id, avatar, isArtist, isCelebrity } = action.payload;
      (state.address = address), (state.id = id);
      state.isArtist = isArtist;
      state.isCelebrity = isCelebrity;
      state.avatar = avatar;
    })
    .addCase(removeProfile, (state, action) => {
      const { address, id, avatar, isArtist, isCelebrity } = initialState;
      (state.address = address), (state.id = id);
      state.isArtist = isArtist;
      state.isCelebrity = isCelebrity;
      state.avatar = avatar;
    });
});
