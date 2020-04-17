import { Race } from "../types/types";
import { createSlice } from '@reduxjs/toolkit';
import { container } from "../services/container/service.container";
import { StorageService, Keys } from "../services/storage.service";
import { IStorageService } from "../services/prototype/service.prototype";

// Please see src/app/services/container/service.container.ts for value registration.
const storageService: IStorageService = container.get(StorageService);
/* 
 * The initial value is fetched from cache.
 * If no cache data exists, then an empty array
 */
export const initialState = storageService.getItem<Race[]>(Keys.Races) || [];

const raceSlice = createSlice({
    name: 'races',
    initialState: initialState,
    // The reducers are paired with the actions through toolkit
    reducers: {
        // The method adds and cache a list of standings
        add: (state: Race[], action: { type: string, payload: Race[] }): Race[] => {
            // copy the current state
            let nextState = [...state];
            if (!action || !action.payload)
                return nextState;

            // override matching items
            action.payload.forEach(race => {
                // check out if the race already exists
                let index = nextState.findIndex(x =>
                    x.season === race.season &&
                    x.round === race.round);
                // if the item does not exist in the current state
                if (index === -1)
                    nextState.push(race);
                else
                    nextState[index] = race;
            });

            // cache here
            storageService.setItem(Keys.Races, nextState);

            return nextState;
        }
    }
});

export const { add: addRaces } = raceSlice.actions;

export default raceSlice.reducer;
