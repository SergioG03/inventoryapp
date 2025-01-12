import { createSlice } from '@reduxjs/toolkit';

const stockSlice = createSlice({
  name: 'stock',
  initialState: {
    movements: []
  },
  reducers: {
    addStockMovement: (state, action) => {
      state.movements.push(action.payload);
    }
  }
});

export const { addStockMovement } = stockSlice.actions;
export default stockSlice.reducer;
