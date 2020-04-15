import { IStorageService } from "../prototype/service.prototype";

class StorageService implements IStorageService {

    private storage: Storage;

    constructor(source: Storage) {
        this.storage = source;
    }

    setItem<T>(key: string, item: T) {
        this.storage.setItem(key, JSON.stringify(item));
    }

    getItem<T>(key: string): T {
        let itemText = this.storage.getItem(key);
        return itemText ? JSON.parse(itemText) : null;
    }
}
export const storageInstance = new StorageService(window.localStorage);

export const Keys = {
    Standings: "standings",
    Races: "races"
}