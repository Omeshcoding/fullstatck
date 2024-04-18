import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return action.payload;
    },
  },
});

export const { showNotification, clearNotification } =
  notificationSlice.actions;

export const setNotification = (content, second) => {
  return (dispatch) => {
    const miliSeconds = second * 1000;
    dispatch(showNotification(content));
    setTimeout(() => {
      dispatch(clearNotification(null));
    }, miliSeconds);
  };
};

export default notificationSlice.reducer;
