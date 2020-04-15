import { Standing, Race } from "../types/types";

export interface IRequestService {

    get<T>(uri: string): Promise<T>;
}

/**
 * F1 service for API requests.
 */
export interface IF1Service {

    /**
     * Returns standings for each season between 2005 - 2015.
     * Requests winner standings for specific seasons.
     * @returns Standings for each season between 2005 - 2015.
     */
    getStandings(): Promise<Standing[]>;

    /**
     * Returns race details for the given season.
     * @param season The year of the season e.g. 2005.
     * @returns Race details for the given season.
     */
    getRaces(season: number): Promise<Race[]>;
}

/**
 * Service for caching in the storage.
 */
export interface IStorageService {

    /**
     * Sets the given object in cache.
     * @param key Cache key.
     * @param item The object to cache.
     */
    setItem<T>(key: string, item: T): void;

    /**
     * Returns an object by cache key.
     * @param key 
     * @returns An object by cache key.
     */
    getItem<T>(key: string): T;
}