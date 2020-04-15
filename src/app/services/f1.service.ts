import { requestInstance } from "./request.service";
import { IRequestService, IF1Service } from "../prototype/service.prototype";
import { Standing, Driver, Team, Race } from "../types/types";

export class F1Service implements IF1Service {

    constructor(private request: IRequestService) { }

    public async getStandings(): Promise<Standing[]> {
        let responseData = await this.request
            .get<DriverStandingsResponse>(`http://ergast.com/api/f1/driverstandings/1.json?limit=11&offset=55`);

        return responseData.MRData.StandingsTable.StandingsLists.map(standing => {
            let driverStanding = standing.DriverStandings[0];
            let constructor = driverStanding.Constructors[0];
            return {
                season: parseInt(standing.season),
                points: parseInt(driverStanding.points),
                wins: parseInt(driverStanding.wins),
                winnerDriver: {
                    ...driverStanding.Driver
                } as Driver,
                winnerTeam: {
                    teamId: constructor.constructorId,
                    name: constructor.name,
                    nationality: constructor.nationality
                } as Team
            } as Standing
        });
    }

    public async getRaces(season: number): Promise<Race[]> {
        let responseData = await this.request
            .get<SeasonRacesResponse>(`http://ergast.com/api/f1/${season}/results/1.json`);

        return responseData.MRData.RaceTable.Races.map(race => ({
            season: parseInt(race.season),
            name: race.raceName,
            round: parseInt(race.round),
            time: race.time,
            date: new Date(race.date),
            winnerDriver: {
                ...race.Results[0].Driver
            } as Driver,
            winnerTeam: {
                teamId: race.Results[0].Constructor.constructorId,
                name: race.Results[0].Constructor.name,
                nationality: race.Results[0].Constructor.nationality
            }
        }) as Race);
    }
}
/** F1 service instance to make API requests. */
export const f1ServiceInstance = new F1Service(requestInstance);

/////////////////////////////////
// API RESPONSE DATA PROTOTYPE //
/////////////////////////////////

interface DriverStandingsResponse {
    MRData: {
        StandingsTable: {
            StandingsLists: {
                season: string,
                DriverStandings: {
                    points: string,
                    wins: string,
                    Driver: {
                        driverId: string,
                        givenName: string,
                        familyName: string,
                        nationality: string
                    },
                    Constructors: {
                        constructorId: string,
                        name: string,
                        nationality: string
                    }[]
                }[]
            }[]
        }
    }
}

interface SeasonRacesResponse {
    MRData: {
        RaceTable: {
            season: string,
            Races: {
                season: string,
                round: string,
                raceName: string,
                date: string,
                time: string,
                Results: {
                    position: string,
                    Driver: {
                        driverId: string,
                        givenName: string,
                        familyName: string,
                        nationality: string
                    },
                    Constructor: {
                        constructorId: string,
                        name: string,
                        nationality: string
                    }
                }[]
            }[]
        }
    }
}