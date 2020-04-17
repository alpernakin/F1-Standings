import { F1Service } from "./f1.service";
import { IRequestService } from "./prototype/service.prototype";

class MockRequestService implements IRequestService {
    async get(_uri: string): Promise<any> {
        return Promise.resolve({});
    }
}

////////////////
// TEST SUITE //
////////////////

describe('F1 Service', () => {

    it('should create', () => {
        // mock request service dependency
        let request = new MockRequestService();
        let service = new F1Service(request);
        expect(service).toBeTruthy();
    });

    it('should map the driver standings result', (done: jest.DoneCallback) => {
        // mock request service dependency
        let request = new MockRequestService();
        // fake the method `get`
        request.get = (_: string) => Promise.resolve(dummyDriverStandingsResponse);
        // crete the service with the dependency `request`
        let service = new F1Service(request);

        service.getStandings().then(data => {
            // please see dummy driver standings response below
            expect(data[0]).toEqual({
                season: 2005,
                points: 133,
                wins: 7,
                winnerDriver: {
                    driverId: "alonso",
                    givenName: "Fernando",
                    familyName: "Alonso",
                    nationality: "Spanish"
                },
                winnerTeam: {
                    teamId: "renault",
                    name: "Renault",
                    nationality: "French"
                }
            });
            // done with the test
            done();
        });
    });

    it('should map the season race result', (done: jest.DoneCallback) => {
        // mock request service dependency
        let request = new MockRequestService();
        // fake the method `get`
        request.get = (_: string) => Promise.resolve(dummySeasonRacesResponse);
        // crete the service with the dependency `request`
        let service = new F1Service(request);
        // the season parameter has no affect at all
        service.getRaces(2005).then(data => {
            // please see dummy season races response below
            expect(data[0]).toEqual({
                season: 2008,
                name: 'Australian Grand Prix',
                round: 1,
                timestamp: new Date('2008-03-16T04:30:00Z').getTime(),
                winnerDriver: {
                    driverId: 'hamilton',
                    givenName: 'Lewis',
                    familyName: 'Hamilton',
                    nationality: 'British'
                },
                winnerTeam: {
                    teamId: 'mclaren',
                    name: 'McLaren',
                    nationality: 'British'
                }
            })
            // done with the test
            done();
        });
    });
});

////////////////
// DUMMY DATA //
////////////////

const dummyDriverStandingsResponse = {
    "MRData": {
        "StandingsTable": {
            "driverStandings": "1",
            "StandingsLists": [
                {
                    "season": "2005",
                    "round": "19",
                    "DriverStandings": [
                        {
                            "position": "1",
                            "positionText": "1",
                            "points": "133",
                            "wins": "7",
                            "Driver": {
                                "driverId": "alonso",
                                "givenName": "Fernando",
                                "familyName": "Alonso",
                                "nationality": "Spanish"
                            },
                            "Constructors": [
                                {
                                    "constructorId": "renault",
                                    "url": "http://en.wikipedia.org/wiki/Renault_in_Formula_One",
                                    "name": "Renault",
                                    "nationality": "French"
                                }
                            ]
                        }
                    ]
                },
                {
                    "season": "2006",
                    "round": "18",
                    "DriverStandings": [
                        {
                            "position": "1",
                            "positionText": "1",
                            "points": "134",
                            "wins": "7",
                            "Driver": {
                                "driverId": "alonso",
                                "givenName": "Fernando",
                                "familyName": "Alonso",
                                "nationality": "Spanish"
                            },
                            "Constructors": [
                                {
                                    "constructorId": "renault",
                                    "url": "http://en.wikipedia.org/wiki/Renault_in_Formula_One",
                                    "name": "Renault",
                                    "nationality": "French"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
};

const dummySeasonRacesResponse = {
    "MRData": {
        "RaceTable": {
            "season": "2008",
            "position": "1",
            "Races": [
                {
                    "season": "2008",
                    "round": "1",
                    "url": "http://en.wikipedia.org/wiki/2008_Australian_Grand_Prix",
                    "raceName": "Australian Grand Prix",
                    "date": "2008-03-16",
                    "time": "04:30:00Z",
                    "Results": [
                        {
                            "number": "22",
                            "position": "1",
                            "positionText": "1",
                            "points": "10",
                            "Driver": {
                                "driverId": "hamilton",
                                "givenName": "Lewis",
                                "familyName": "Hamilton",
                                "nationality": "British"
                            },
                            "Constructor": {
                                "constructorId": "mclaren",
                                "url": "http://en.wikipedia.org/wiki/McLaren",
                                "name": "McLaren",
                                "nationality": "British"
                            }
                        }
                    ]
                },
                {
                    "season": "2008",
                    "round": "2",
                    "url": "http://en.wikipedia.org/wiki/2008_Malaysian_Grand_Prix",
                    "raceName": "Malaysian Grand Prix",
                    "date": "2008-03-23",
                    "time": "07:00:00Z",
                    "Results": [
                        {
                            "number": "1",
                            "position": "1",
                            "positionText": "1",
                            "points": "10",
                            "Driver": {
                                "driverId": "raikkonen",
                                "givenName": "Kimi",
                                "familyName": "Räikkönen",
                                "nationality": "Finnish"
                            },
                            "Constructor": {
                                "constructorId": "ferrari",
                                "url": "http://en.wikipedia.org/wiki/Scuderia_Ferrari",
                                "name": "Ferrari",
                                "nationality": "Italian"
                            }
                        }
                    ]
                }
            ]
        }
    }
}