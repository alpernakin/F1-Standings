import { Container } from "./service.container";

class Dummy {
    constructor(public x: number) { }
}

////////////////
// TEST SUITE //
////////////////

describe('Service Container', () => {

    it('should create', () => {
        let container = new Container();
        expect(container).toBeTruthy();
    });

    it('should register value', () => {
        let container = new Container();
        // register the instance
        container.use(new Dummy(5));
        // expect it to be registered
        expect(container.get(Dummy)).toBeTruthy();
        expect(container.get<Dummy>(Dummy).x).toEqual(5);
    });

    it('should fail to register undefined object', () => {
        let error = null;
        try {
            let container = new Container();
            container.use(undefined);
        } catch (err) {
            error = err;
        }

        expect(error).toBeTruthy();
    });

    it('should failt to register a null object', () => {
        let error = null;
        try {
            let container = new Container();
            container.use(null);
        } catch (err) {
            error = err;
        }

        expect(error).toBeTruthy();
    });
});