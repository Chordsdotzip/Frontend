import { createSlice } from '@reduxjs/toolkit';

export interface LoadingStatus {
  isShow: boolean;
}

const loading = createSlice({
  name: 'loading',
  initialState: { isShow: false } as LoadingStatus,
  reducers: {
    startLoading: (state) => {
      state.isShow = true;
      return state;
    },
    endLoading: (state) => {
      state.isShow = false;
      return state;
    },
  },
});

export default loading;
