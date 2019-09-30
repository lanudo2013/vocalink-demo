import { Beer } from "./beer.interface";

export interface BeersContext {
    list: Beer[];
    fetching: boolean;
    failed: boolean;
    page: number;
    perPage: number;
    food: string;
}
