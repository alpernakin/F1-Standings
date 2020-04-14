import { Standing } from "../../types/types";
import { StorageInstance, Keys } from "../services/storage.service";
import { createSlice } from '@reduxjs/toolkit';

const standingSlice = createSlice({
    name: 'standings',
    // The initial value is fetched from cache.
    // If no cache data exists, then an empty array
    initialState: StorageInstance.getItem<Standing[]>(Keys.Standings) || [],
    // The reducers are paired with the actions through toolkit
    reducers: {
        // The method adds and cache a list of standings
        add: (state: Standing[], action: { type: string, payload: any }): Standing[] => {
            // concat the items
            let items = [
                ...state,
                ...action.payload
            ];
            // cache here
            StorageInstance.setItem(Keys.Standings, items);

            return items;
        }
    }
});

export const { add } = standingSlice.actions;

export default standingSlice.reducer;
