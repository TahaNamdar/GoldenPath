import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Chip {
  id: string;
  value: string;
  age: any;
}

interface ChipState extends Array<Chip> {}

const initialState: ChipState = [];

const chipSlice = createSlice({
  name: "chip",
  initialState,
  reducers: {
    addChip: (state, action: PayloadAction<Chip>) => {
      state.push(action.payload);
    },

    updateInput: (
      state,
      action: PayloadAction<{ id: string; value: string }>
    ) => {
      const inputIndex = state.findIndex(
        (input) => input.id === action.payload.id
      );
      if (inputIndex !== -1) {
        state[inputIndex].value = action.payload.value;
      }
    },
    removeChip: (state, action: PayloadAction<string>) => {
      return state.filter((chip) => chip.id !== action.payload);
    },
  },
});

export const { addChip, removeChip, updateInput } = chipSlice.actions;
export default chipSlice.reducer;
