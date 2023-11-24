import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Chip = {
  id: string;
  value: string;
  age: any;
};

interface ChipState {
  [index: string]: { id: string; Chips: Chip[] };
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
        const { age, Chips, id } = item;
        normalizeData[age] = { id, Chips };
      });

      return {
        ...state,
        ...normalizeData,
      };
    },

    addChip: (state, action: PayloadAction<Chip>) => {
      const { id, age, value } = action.payload;
      const chip = { id, age, value };

      let { Chips } = state[age];

      Chips.push(chip);
      state[age].Chips = Chips;
    },

    removeChip: (state, action: PayloadAction<any>) => {
      const { id, age } = action.payload;
      const data = state[age];
      const filteredData = data.Chips.filter((item) => item.id !== id);
      state[age].Chips = filteredData;
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

      const [movedChip] = state[age].Chips.splice(sourceIndex, 1);
      state[age].Chips.splice(destinationIndex, 0, movedChip);
    },

    removeFromSourceValue: (state, action: PayloadAction<any>) => {
      const { sourceValue, sourceValues } = action.payload;

      const updatedSourceValues = sourceValues.Chips.filter(
        (item: any) => item.id !== sourceValue.id
      );
      // Update the state with the modified sourceValues

      state[sourceValue.age].Chips = updatedSourceValues;
    },

    addToDestinationValue: (state, action: PayloadAction<any>) => {
      const { sourceValue, destinationValues, destinationAge } = action.payload;

      state[destinationAge].Chips = [
        ...state[destinationAge].Chips,
        { id: sourceValue.id, value: sourceValue.value, age: destinationAge },
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
