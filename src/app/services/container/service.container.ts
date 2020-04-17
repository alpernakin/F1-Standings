import { RequestService } from "../request.service";
import { F1Service } from "../f1.service";
import { StorageService } from "../storage.service";

export class Container {

    [key: string]: any;

    /**
     * Registers an object by the given `key`
     * 
     * @param constructor The constructor type
     * @param value The object
     */
    private register<T>(constructor: string, value: T) {
        this[constructor] = value;
    }

    /**
     * Registers the `value` with its own class / type
     * 
     * For example, a date instance will be registered with class type `Date`
     * 
     * @param value The instance
     */
    public use<T>(value: T) {
        if (typeof value === 'undefined')
            throw Error('Undefined object cannot be registered.');

        if (!value || !(value as any)["constructor"])
            throw Error('Cannot identify the constuctor type of the object.');

        let constructor = (value as any).constructor.name;

        this.register(constructor, value);
    }

    /**
     * Returns the instance matching the given `func`
     * 
     * @param func 
     * @returns The instance matching the given `func`
     */
    public get<T>(func: Function): T {
        return this[func.name] as T;
    }
}
/** a simple central container for services */
export const container = new Container();

// Here we simply register the services.
// They will be accessible throughout the application.

let requestService = new RequestService();
// F1 Service is created with a request service
// in order to make API requests.
let ergastF1Service = new F1Service(requestService);
// We have a selection of storages for caching.
// Local storage is the choice for the browser-wide caching.
let storageService = new StorageService(window.localStorage);

container.use(ergastF1Service);
container.use(storageService);