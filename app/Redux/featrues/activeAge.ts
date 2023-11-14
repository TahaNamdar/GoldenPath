import { createSlice } from "@reduxjs/toolkit";

const activeAgeSlice = createSlice({
  name: "activeAge",
  initialState: { activeAge: null },
  reducers: {
    setActiveAge: (state, action) => {
      state.activeAge = action.payload;
    },
  },
});

export const { setActiveAge } = activeAgeSlice.actions;

export default activeAgeSlice.reducer;

export const activeAgeFromStore = (state: any) => state.activeAge.activeAge;
