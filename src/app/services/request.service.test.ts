import { RequestService } from "./request.service";

////////////////
// TEST SUITE //
////////////////

describe('Request Service', () => {

    it('should create', () => {
        let service = new RequestService();
        expect(service).toBeTruthy();
    });

    // Since the single dependency in the class
    // is `fetch` function (see node_modules/typescript/lib/lib.dom.ts),
    // there is no need for more tests
})