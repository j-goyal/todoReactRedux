import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    notificationMessage:null,
    notificationType : null
}


const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      showNotification: (state, action) => {
        const { notificationMessage, notificationType } = action.payload;
        state.notificationMessage = notificationMessage;
        state.notificationType = notificationType;
      },

      hideNotification: (state) => {
        state.notificationMessage = null;
        state.notificationType = null;
      },
    },
  });


export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
  

