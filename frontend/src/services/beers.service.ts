import { Endpoints } from './../classes/interfaces/endpoints.interface';
import { ajax, AjaxResponse, AjaxError } from 'rxjs/ajax';
import { Observable } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { Beer } from '../classes/interfaces/beer.interface';

declare const API: any;

export const SERVER_DELAY = 500;

export class BeersService {
    private api: Endpoints;

    constructor() {
        this.api = JSON.parse(API) as Endpoints;
    }

    getEndpointUrl(): string {
        return String(this.api.BEERS_ENDPOINT_URL);
    }

    getBeersByFood(page: number, perPage: number, food: string): Observable<Beer[]> {
        return ajax({
            url: `${this.api.BEERS_ENDPOINT_URL}?page=${page}&per_page=${perPage}&food=${food.toLowerCase()}`,
            responseType: 'json',
            method: 'GET',
            timeout: 30000
        }).pipe(
            delay(SERVER_DELAY),
            map((x: AjaxResponse) => x.response),
            catchError((x: AjaxError) => {
                throw x.message;
            })
        );
    }
};
export default new BeersService();
