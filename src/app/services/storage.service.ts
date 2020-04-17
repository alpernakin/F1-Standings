import { IStorageService } from "./prototype/service.prototype";

export class StorageService implements IStorageService {

    private storage: Storage;

    constructor(storage: Storage) {
        this.storage = storage;
    }

    setItem<T>(key: string, item: T) {
        this.storage.setItem(key, JSON.stringify(item));
    }

    getItem<T>(key: string): T {
        let itemText = this.storage.getItem(key);
        return itemText ? JSON.parse(itemText) : null;
    }

    removeItem(key: string) {
        this.storage.removeItem(key);
    }
}

export const Keys = {
    Standings: "standings",
    Races: "races"
}