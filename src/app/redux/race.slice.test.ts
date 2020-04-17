import { StorageService, Keys } from '../services/storage.service';
import { container } from '../services/container/service.container';
import { IStorageService } from '../services/prototype/service.prototype';
import { Race } from '../types/types';
import reducer, { initialState, addRaces } from './race.slice';
import { dummyRacesData } from '../test/common.dummy.data';
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
        let dummyRace: Race = dummyRacesData[0];
        // let's clear the item first
        storage.removeItem(Keys.Races);
        // set them in the fake storage
        storage.setItem(Keys.Races, [dummyRace]);
    });

    it('should return the inital state', () => {
        let nextState = initialState;
        // get the initial state with no affect dummy action
        let result = reducer(undefined, { type: 'NONE' });
        expect(result).toEqual(nextState);
    });

    it('should add new items', () => {
        let nextState = initialState;
        // a dummy race to add
        let newDummyData = [dummyRacesData[1]];
        // run the reducer function
        let result = reducer(nextState, addRaces(newDummyData)); 
        // the result should be a joint list with first state and new items
        expect(result).toEqual([...nextState, ...newDummyData]);
    });

    it('should override data', () => {
        // a dummy object to add
        let dummyData = [dummyRacesData[0]];
        // run the reducer function
        let result = reducer(dummyData, addRaces(dummyData));
        // it will be the same object again
        expect(result).toEqual(dummyData)
    });
})