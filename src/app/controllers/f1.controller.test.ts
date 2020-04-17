import '@testing-library/react';
import { F1Controller } from './f1.controller';
import { container } from '../services/container/service.container';
import { dummyStandingsData, dummyRacesData } from '../test/common.dummy.data';
import { F1Service } from '../test/common.mocks';

// use the mock service
container.use(new F1Service());

////////////////
// TEST SUITE //
////////////////

describe('F1 Controller', () => {

    it('should create', () => {
        let controller = new F1Controller();
        expect(controller).toBeTruthy();
    });

    it('should sort standings by season', (done: jest.DoneCallback) => {
        let controller = new F1Controller();

        controller.getStandings().then(standings => {
            expect(standings[0]).toEqual(dummyStandingsData[1]);
            // done with the test
            done();
        });
    });

    it('should sort races by date', (done: jest.DoneCallback) => {
        let controller = new F1Controller();

        controller.getRaces(2008).then(races => {
            expect(races[0]).toEqual(dummyRacesData[1]);
            // done with the test
            done();
        });
    });

    it('should load standings on driver request', (done: jest.DoneCallback) => {
        let controller = new F1Controller();

        controller.getSeasonWinner(2006).then(driver => {
            expect(driver).toEqual(dummyStandingsData[0].winnerDriver);
            // done with the test
            done();
        });
    });
});