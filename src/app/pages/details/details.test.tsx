import { render } from '@testing-library/react';
import React from 'react';
import Details from './details';
import { createMemoryHistory, createLocation } from 'history';
import { container } from '../../services/container/service.container';
import { StorageService } from '../../services/storage.service';
import { MockStorage, F1Service } from '../../test/common.mocks';
import { IF1Service } from '../../services/prototype/service.prototype';
import { dummyRacesData } from '../../test/common.dummy.data';
import { RaceItem } from '../../components/race-list/race.list';

// since the store uses storage.
container.use(new StorageService(new MockStorage));
// since controller uses F1 service.
// we need to use mock dependencies.
container.use(new F1Service());

////////////////
// TEST SUITE //
////////////////

describe('Details Component', () => {
    // to inject route component props
    let history = createMemoryHistory();
    let location = createLocation('');
    let match = {
        isExact: false,
        // pay attention, the param is used for requesting races
        params: { season: 2008 },
        path: 'details',
        url: 'localhost'
    };
    // common function rend and create the component
    let rendComponent = () => render(
        <Details history={history} location={location} match={match} />);

    it('should create', () => {
        let component = rendComponent();
        expect(component).toBeTruthy();
    });

    it('should show `no data` text if there is no data', async () => {
        // change the method in the way, it returns no data
        let f1Service: IF1Service = container.get(F1Service);
        f1Service.getRaces = () => Promise.resolve([]);
        
        let component = rendComponent();
        expect(await component.getByText(/No Data/i)).toBeInTheDocument();
    });

    it('should map race data properly for the child component', () => {
        let component = new Details({ history, location, match });
        let raceData = dummyRacesData[0];
        expect(component.mapRace(raceData)).toEqual({
            name: raceData.name,
            timestamp: raceData.timestamp,
            team: raceData.winnerTeam.name,
            winner: {
                id: raceData.winnerDriver.driverId,
                fullName: `${raceData.winnerDriver.givenName} ${raceData.winnerDriver.familyName}`,
                nationality: raceData.winnerDriver.nationality
            }
        } as RaceItem);
    });
});