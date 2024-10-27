import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Video } from '../types/video';
import { mockVideos } from '../data/mockVideos';
import { fetchVideoDetails } from '../services/youtube';

interface VideoState {
  videos: Video[];
  selectedVideo: Video | null;
  loading: boolean;
  error: string | null;
}

const initialState: VideoState = {
  videos: mockVideos,
  selectedVideo: null,
  loading: false,
  error: null,
};

export const loadVideoDetails = createAsyncThunk(
  'video/loadDetails',
  async (video: Video, { rejectWithValue }) => {
    try {
      const details = await fetchVideoDetails(video.youtubeId);
      return {
        ...video,
        ...details,
      };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  }
);

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setSelectedVideo: (state, action: PayloadAction<Video | null>) => {
      state.selectedVideo = action.payload;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadVideoDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadVideoDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedVideo = action.payload;
        
        // Update video in the list with new details
        const index = state.videos.findIndex(v => v.id === action.payload.id);
        if (index !== -1) {
          state.videos[index] = action.payload;
        }
      })
      .addCase(loadVideoDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to load video details';
      });
  },
});

export const { setSelectedVideo, clearError } = videoSlice.actions;
export default videoSlice.reducer;