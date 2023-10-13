import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  name: "",
  active: false,
  drawerActive: false,
  largeScreenSizeFlag: false,
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
    lessThanModalSizeAction: (state = initialStateValue) => {
      state.largeScreenSizeFlag = false;
    },
    moreThanMobileSizeAction: (state = initialStateValue) => {
      state.largeScreenSizeFlag = true;
    },
    setModalNameAction: (state = initialStateValue, action) => {
      state.name = action.payload;
    },
  },
});

export const {
  openAction,
  closeAction,
  openDrawerAction,
  closeDrawerAction,
  lessThanModalSizeAction,
  moreThanMobileSizeAction,
  setModalNameAction,
} = toggleSlice.actions;
export default toggleSlice.reducer;
