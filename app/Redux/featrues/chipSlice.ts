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

        reorderChips: (state, action: PayloadAction<any>) => {
            const { source_age, source_index, destination_age, destination_index } = action.payload;

            // remove from source
            const [chip] = state[source_age].Chips.splice(source_index, 1);

            // add the removed chip to the destination
            state[destination_age].Chips.splice(destination_index, 0, chip);
        },
    },
});

export const { addChip, setLifeGoals, removeChip, reorderChips } = chipSlice.actions;
export default chipSlice.reducer;
