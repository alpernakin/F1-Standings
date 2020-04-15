import { IRequestService } from "../prototype/service.prototype";

export class RequestService implements IRequestService {

    public async get<T>(uri: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            fetch(uri)
                .then(response =>
                    resolve(response.json()))
                .catch(reason => {
                    reject(reason);
                    // log the error here
                    console.log(reason);
                });
        });
    }
}
export const requestInstance = new RequestService();