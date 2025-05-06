import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type HomeState = {
  selectedTrailerIndex: number;
  isPlaying: boolean;
  playProgress: number;
  shouldPlayVideo?: boolean;
  isMuted?: boolean;
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
    setShouldPlayVideo: (state, action: PayloadAction<boolean>) => {
      state.shouldPlayVideo = action.payload;
    },
    setIsMuted: (state, action: PayloadAction<boolean>) => {
      state.isMuted = action.payload;
    },
  },
});

export const {
  setSelectedTrailerIndex,
  setIsPlaying,
  setPlayProgress,
  setShouldPlayVideo,
  setIsMuted,
} = homeSlice.actions;

export default homeSlice.reducer;
