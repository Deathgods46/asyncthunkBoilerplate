import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useGet } from '../../../services/api';


interface ExampleState {
  data: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ExampleState = {
  data: null,
  status: 'idle',
  error: null,
};

export const getExampleData = createAsyncThunk(
  'example/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await useGet('/todos/1');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExampleData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getExampleData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getExampleData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default exampleSlice.reducer;
