import { Standing, Driver, Race } from "../types/types";
import { addStandings } from "../redux/standing.slice";
import { addRaces } from "../redux/race.slice";
import { IF1Service } from "../prototype/service.prototype";
import { f1ServiceInstance } from "../services/f1.service";
import store from "../redux/store";

/**
 *  Controller to manage data flow between stores / api sources / cache and components.
 * 
 *  Here we combine different sources for data selection.
 */
class F1Controller {

    constructor(private service: IF1Service) { }

    /**
     * Returns standings combining data from API and store
     * @returns An array of standings
     */
    public async getStandings(): Promise<Standing[]> {
        // sort ascending by season
        let sort = (standings: Standing[]) =>
            [...standings].sort((x, y) => x.season > y.season ? 1 : -1);

        return new Promise(resolve => {
            // first check the standings in the store
            let standings = store.getState().standings;
            // if there is no data
            if (!standings || !standings.length) {
                // then request data from the API
                this.service.getStandings()
                    .then(standings => {
                        let result = sort(standings);
                        // save them in the store, for future requests
                        store.dispatch(addStandings(result));
                        // return data
                        resolve(result);
                    });
            }
            else {
                // return data
                resolve(sort(standings));
            }
        });
    }

    /**
     * Returns races combining data from API and store
     * @param season The year of season 2005 - 2015
     * @returns An array of races
     */
    public async getRaces(season: number): Promise<Race[]> {
        // sort ascending by year
        let sort = (races: Race[]) =>
            [...races].sort((x, y) => x.timestamp > y.timestamp ? 1 : -1);

        return new Promise<Race[]>(resolve => {
            let races = store.getState().races.filter(x => x.season === season);
            // if no race exists in the given season
            if (!races || !races.length) {
                // then request them from the API
                this.service.getRaces(season)
                    .then(races => {
                        let result = sort(races);
                        // add them in the store
                        store.dispatch(addRaces(result));
                        // return the data
                        resolve(result);
                    });
            }
            else {
                // return the data
                resolve(sort(races));
            }
        });
    }

    /**
     * Returns string ID for the winner driver.
     * 
     * It loads standings if they are not in the store.
     * @param season The year of the season
     * @returns string ID for the winner driver.
     */
    public async getSeasonWinner(season: number): Promise<Driver | undefined> {
        let seasonStanding = (await this.getStandings())
            .find(x => x.season === season);

        return seasonStanding?.winnerDriver;
    }
}
export const f1Controller = new F1Controller(f1ServiceInstance);