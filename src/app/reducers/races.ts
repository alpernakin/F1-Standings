import { Race } from "../../types/types";
import { StorageInstance, Keys } from "../services/storage.service";
import { createSlice } from '@reduxjs/toolkit';

const raceSlice = createSlice({
    name: 'races',
    // The initial value is fetched from cache.
    // If no cache data exists, then an empty array
    initialState: StorageInstance.getItem<Race[]>(Keys.Races) || [],
    // The reducers are paired with the actions through toolkit
    reducers: {
        // The method adds and cache a list of standings
        add: (state: Race[], action: { type: string, payload: any }): Race[] => {
            // concat the items
            let items = [
                ...state,
                ...action.payload
            ];
            // cache here
            StorageInstance.setItem(Keys.Races, items);

            return items;
        }
    }
});

export const { add } = raceSlice.actions;

export default raceSlice.reducer;
