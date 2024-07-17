import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useGet } from '../../../services/api';

interface UserState {
  userInfo: any;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  userInfo: null,
  token: localStorage.getItem('accessToken'),
  status: 'idle',
  error: null,
};

export const fetchUserDetails = createAsyncThunk(
  'user/fetchUserDetails',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { user: UserState };
    const token = state.user.token;

    if (token) {
      try {
        const response = await useGet('/user/details', { Authorization: `Bearer ${token}` });
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
    return rejectWithValue('No token found');
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('accessToken', action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      state.userInfo = null;
      localStorage.removeItem('accessToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setToken, clearToken } = userSlice.actions;

export default userSlice.reducer;
