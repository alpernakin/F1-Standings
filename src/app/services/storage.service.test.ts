import { StorageService } from './storage.service'
import { MockStorage } from '../test/common.mocks';

////////////////
// TEST SUITE //
////////////////

describe('Storage Service', () => {

    it('should create', () => {
        let service = new StorageService(new MockStorage());
        expect(service).toBeTruthy();
    });

    it('should stringfy item', () => {
        // mock the dependency
        let storage = new MockStorage();
        let service = new StorageService(storage);

        service.setItem('test_key', { prop: 1 });
        expect(storage.getItem('test_key')).toEqual('{"prop":1}');
    });

    it('should parse item', () => {
        // mock the dependency
        let storage = new MockStorage();
        let service = new StorageService(storage);

        storage['test_key'] = '{"prop":1}';
        expect(service.getItem('test_key')).toEqual({ prop: 1 });
    });
})