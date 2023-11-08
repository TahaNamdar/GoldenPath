import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Editor {
  id: any;
  value: string;
  title: string;
  checked: boolean;
  isFavorite: boolean;
}

interface EditorState extends Array<Editor> {}

const uniqueId = uuidv4();

const initialState: EditorState = [
  { id: uniqueId, value: "", title: "", checked: false, isFavorite: false },
];

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setInputsFromRedux: (state, action) => {
      return [...state, action.payload];
    },

    updateInput: (state, action) => {
      const newState = [...state];
      const input = newState.find((input) => input.id === action.payload.id);
      if (input) {
        Object.assign(input, action.payload);
      }
      return newState;
    },

    removeInput: (state, action) => {
      return state.filter((item: any, _) => item.id !== action.payload);
    },

    reorderChips: (
      state,
      action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>
    ) => {
      const { sourceIndex, destinationIndex } = action.payload;

      const [movedChip] = state.splice(sourceIndex, 1);
      state.splice(destinationIndex, 0, movedChip);
    },
  },
});

export const { reorderChips, updateInput, setInputsFromRedux, removeInput } =
  editorSlice.actions;
export default editorSlice.reducer;
