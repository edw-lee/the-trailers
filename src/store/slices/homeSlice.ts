import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type HomeState = {
  selectedTrailerIndex: number;
  isPlaying: boolean;
  playProgress: number;
};

const initialState: HomeState = {
  playProgress: 0,
  isPlaying: false,
  selectedTrailerIndex: 0,
};

const homeSlice = createSlice({
  name: "homeSlice",
  initialState,
  reducers: {
    setSelectedTrailerIndex: (state, action: PayloadAction<number>) => {
      state.selectedTrailerIndex = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setPlayProgress: (state, action: PayloadAction<number>) => {
      state.playProgress = action.payload;
    },
  },
});

export const { setSelectedTrailerIndex, setIsPlaying, setPlayProgress } =
  homeSlice.actions;

export default homeSlice.reducer;
