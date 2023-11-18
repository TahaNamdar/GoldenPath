import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Chip = {
  id: string;
  value: string;
  age: any;
};

interface ChipState {
  [index: string]: Chip[];
}

type LifeGoalResult = {
  userId: string;
  id: string;
  age: string;
  Chips: Chip[];
};

const initialState: ChipState = {};

const chipSlice = createSlice({
  name: "chip",
  initialState,
  reducers: {
    setLifeGoals: (state, action: PayloadAction<LifeGoalResult[]>) => {
      const data = action.payload;

      const normalizeData: any = {};
      data.forEach((item) => {
        const { age, Chips } = item;
        normalizeData[age] = Chips;
      });

      return {
        ...state,
        ...normalizeData,
      };
    },

    addChip: (state, action: PayloadAction<Chip>) => {
      const { id, age, value } = action.payload;
      const chip = { id, age, value };
      let chips = state[age];

      chips.push(chip);
      state[age] = chips;
    },

    removeChip: (state, action: PayloadAction<any>) => {
      const { id, age } = action.payload;
      const data = state[age];
      const filteredData = data.filter((item) => item.id !== id);
      state[age] = filteredData;
    },

    reorderChips: (
      state,
      action: PayloadAction<{
        sourceIndex: number;
        destinationIndex: number;
        age: any;
      }>
    ) => {
      const { sourceIndex, destinationIndex, age } = action.payload;

      const [movedChip] = state[age].splice(sourceIndex, 1);
      state[age].splice(destinationIndex, 0, movedChip);
    },

    removeFromSourceValue: (state, action: PayloadAction<any>) => {
      const { sourceValue, sourceValues } = action.payload;

      const updatedSourceValues = sourceValues.filter(
        (item: any) => item.id !== sourceValue.id
      );
      // Update the state with the modified sourceValues
      state[sourceValue.age] = updatedSourceValues;
    },

    addToDestinationValue: (state, action: PayloadAction<any>) => {
      const { sourceValue, destinationValues, destinationAge } = action.payload;
      state[destinationAge] = [
        ...destinationValues,
        { ...sourceValue, age: destinationAge },
      ];
    },
  },
});

export const {
  addChip,
  setLifeGoals,
  removeChip,
  reorderChips,
  removeFromSourceValue,
  addToDestinationValue,
} = chipSlice.actions;
export default chipSlice.reducer;
