import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const filterSlice = createSlice({
  name: 'filterAnecdote',
  initialState,
  reducers: {
    filterChange(state, action) {
      return action.payload;
    },
  },
});

export const { filterChange } = filterSlice.actions;

export default filterSlice.reducer;

// const filterReducer = (state = '', action) => {
//   switch (action.type) {
//     case 'FILTER_ANECDOTE':
//       return action.payload;
//     default:
//       return state;
//   }
// };
// export const filterChange = (filter) => {
//   return {
//     type: 'FILTER_ANECDOTE',
//     payload: filter,
//   };
// };

// export default filterReducer;
