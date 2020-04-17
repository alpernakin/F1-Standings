import { Standing } from "../types/types";
import { createSlice } from '@reduxjs/toolkit';
import { container } from "../services/container/service.container";
import { IStorageService } from "../services/prototype/service.prototype";
import { StorageService, Keys } from "../services/storage.service";

// Please see src/app/services/container/service.container.ts for value registration.
const storageService: IStorageService = container.get(StorageService);
/* 
 * The initial value is fetched from cache.
 * If no cache data exists, then an empty array.
 */
export const initialState = storageService.getItem<Standing[]>(Keys.Standings) || [];

const standingSlice = createSlice({
    name: 'standings',
    initialState: initialState,
    // The reducers are paired with the actions through toolkit
    reducers: {
        // The method adds and cache a list of standings
        add: (state: Standing[], action: { type: string, payload: Standing[] }): Standing[] => {
            // copy the current state
            let nextState = [...state];
            if (!action || !action.payload)
                return nextState;

            // override matching items
            action.payload.forEach(standing => {
                // check out if the standing already exists
                let index = nextState.findIndex(x => x.season === standing.season);
                // if the item does not exist in the current state
                if (index === -1)
                    nextState.push(standing);
                else
                    nextState[index] = standing;
            });

            // cache here
            storageService.setItem(Keys.Standings, nextState);

            return nextState;
        }
    }
});

export const { add: addStandings } = standingSlice.actions;

export default standingSlice.reducer;
