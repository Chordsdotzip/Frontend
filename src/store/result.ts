import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface resultInfo {
  filename: string;
  chords: string[][];
}

const result = createSlice({
  name: 'result',
  initialState: { filename: '', chords: [[]] } as resultInfo,
  reducers: {
    saveResult: (state, { payload: payload }: PayloadAction<resultInfo>) => {
      state = { ...payload };
      return state;
    },
  },
});

export default result;
