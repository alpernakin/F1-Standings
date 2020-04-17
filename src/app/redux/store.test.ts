import store from "./store";
import { addStandings } from "./standing.slice";
import { addRaces } from "./race.slice";
import { dummyRacesData, dummyStandingsData } from "../test/common.dummy.data";

////////////////
// TEST SUITE //
////////////////

describe('Store', () => {

    it('should create', () => {
        expect(store).toBeTruthy();
    });

    it('should add standings', () => {
        store.dispatch(addStandings(dummyStandingsData));
        expect(store.getState().standings).toEqual(dummyStandingsData);
    });

    it('should add races', () => {
        store.dispatch(addRaces(dummyRacesData));
        expect(store.getState().races).toEqual(dummyRacesData);
    });

    // The rest of store related tests can be found in slice tests.
});