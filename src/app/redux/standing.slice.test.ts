import { StorageService, Keys } from '../services/storage.service';
import { container } from '../services/container/service.container';
import { IStorageService } from '../services/prototype/service.prototype';
import { Standing } from '../types/types';
import reducer, { initialState, addStandings } from './standing.slice';
import { dummyStandingsData } from '../test/common.dummy.data';
import { MockStorage } from '../test/common.mocks';

// let's use mock storage service
container.use(new StorageService(new MockStorage()));

////////////////
// TEST SUITE //
////////////////

describe('Race Slice', () => {

    beforeEach(() => {
        // let's insert some data into mock storage for initial state
        let storage: IStorageService = container.get(StorageService);
        // a dummy race for the initial state
        let dummyStanding: Standing = dummyStandingsData[0];
        // let's clear the item first
        storage.removeItem(Keys.Races);
        // set them in the mock storage
        storage.setItem(Keys.Races, [dummyStanding]);
    });

    it('should return the inital state', () => {
        let nextState = initialState;
        // get the initial state with no affect dummy action
        let result = reducer(undefined, { type: 'NONE' });
        expect(result).toEqual(nextState);
    });

    it('should add new items', () => {
        let nextState = initialState;
        // a dummy standing to add
        let newDummyData = [dummyStandingsData[1]];
        // run the reducer function
        let result = reducer(nextState, addStandings(newDummyData));
        // the result should be a joint list with first state and new items
        expect(result).toEqual([...nextState, ...newDummyData]);
    });

    it('should override data', () => {
        // a dummy standing to add
        let dummyData = [dummyStandingsData[0]];
        // run the reducer function
        let result = reducer(dummyData, addStandings(dummyData));
        // it will be the same object again
        expect(result).toEqual(dummyData)
    });
})