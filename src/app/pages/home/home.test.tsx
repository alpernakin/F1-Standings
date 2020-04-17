import { render } from '@testing-library/react';
import React from 'react';
import { createMemoryHistory, createLocation } from 'history';
import { container } from '../../services/container/service.container';
import { StorageService } from '../../services/storage.service';
import { MockStorage, F1Service } from '../../test/common.mocks';
import { IF1Service } from '../../services/prototype/service.prototype';
import Home from './home';
import { dummyStandingsData } from '../../test/common.dummy.data';
import { StandingItem } from '../../components/standing-list/standing.list';

// since the store uses storage.
container.use(new StorageService(new MockStorage));
// since controller uses F1 service.
// we need to use mock dependencies.
container.use(new F1Service());

////////////////
// TEST SUITE //
////////////////

describe('Home Component', () => {
    // to inject route component props
    let history = createMemoryHistory();
    let location = createLocation('');
    let match = {
        isExact: false,
        params: {},
        path: 'home',
        url: 'localhost'
    };
    // common function rend and create the component
    let rendComponent = () => render(
        <Home history={history} location={location} match={match} />);

    it('should create', () => {
        let component = rendComponent();
        expect(component).toBeTruthy();
    });

    it('should show `no data` text if there is no data', async () => {
        // change the method in the way, it returns no data
        let f1Service: IF1Service = container.get(F1Service);
        f1Service.getStandings = () => Promise.resolve([]);

        let component = rendComponent();
        expect(await component.getByText(/No Data/i)).toBeInTheDocument();
    });

    it('should map standing data properly for the child component', () => {
        let component = new Home({ history, location, match });
        let standingData = dummyStandingsData[0];
        expect(component.mapStanding(standingData)).toEqual({
            season: standingData.season,
            team: standingData.winnerTeam.name,
            winner: {
                id: standingData.winnerDriver.driverId,
                fullName: `${standingData.winnerDriver.givenName} ${standingData.winnerDriver.familyName}`,
                nationality: standingData.winnerDriver.nationality
            },
            points: standingData.points,
            wins: standingData.wins
        } as StandingItem);
    });
});