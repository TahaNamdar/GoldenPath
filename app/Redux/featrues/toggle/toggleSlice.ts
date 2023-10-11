import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  active: false,
  drawerActive: false,
  modalActive: false,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState: initialStateValue,
  reducers: {
    openAction: (state = initialStateValue) => {
      state.active = true;
    },
    closeAction: (state = initialStateValue) => {
      state.active = false;
    },
    openDrawerAction: (state = initialStateValue) => {
      state.drawerActive = true;
    },
    closeDrawerAction: (state = initialStateValue) => {
      state.drawerActive = false;
    },
    closeModalAction: (state = initialStateValue) => {
      state.modalActive = false;
    },
    openModalAction: (state = initialStateValue) => {
      state.modalActive = true;
    },
  },
});

export const {
  openAction,
  closeAction,
  openDrawerAction,
  closeDrawerAction,
  closeModalAction,
  openModalAction,
} = toggleSlice.actions;
export default toggleSlice.reducer;
