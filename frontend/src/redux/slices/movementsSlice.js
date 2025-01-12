// src/redux/slices/movementsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { movementService } from '../../services/api';

export const fetchMovements = createAsyncThunk(
  'movements/fetchMovements',
  async () => {
    const response = await movementService.getAll();
    return response.data;
  }
);

const movementsSlice = createSlice({
  name: 'movements',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovements.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovements.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMovements.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { resetStatus } = movementsSlice.actions;
export default movementsSlice.reducer;
