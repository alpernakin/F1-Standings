import { IF1Service } from "../services/prototype/service.prototype";
import { Standing, Race } from "../types/types";
import { dummyStandingsData, dummyRacesData } from "./common.dummy.data";

/** Mock F1 Service */
export class F1Service implements IF1Service {
    async getStandings(): Promise<Standing[]> {
        return dummyStandingsData;
    }

    async getRaces(_season: number): Promise<Race[]> {
        return dummyRacesData;
    }
}

/** 
 * Mock Storage.
 * 
 * For example: can be replaced with localStorage.
 */
export class MockStorage implements Storage {
    [name: string]: any;
    public length: number;

    constructor() {
        this.length = 0;
    }

    clear(): void {
        // no need to implement for now
        throw new Error("Method not implemented.");
    }
    key(index: number): string | null {
        // no need to implement for now
        throw new Error("Method not implemented.");
    }

    removeItem(key: string): void {
        this[key] = null;
    }

    setItem(key: string, value: string) {
        this[key] = value;
    }

    getItem(key: string): string {
        return this[key];
    }
}