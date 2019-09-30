import { Beer } from "../classes/interfaces/beer.interface";

export const INIT_REQUEST_BEERS = 'INIT_REQUEST_BEERS';
export const SUCCESS_REQUEST_BEERS = 'SUCCESS_REQUEST_BEERS';
export const FAILED_REQUEST_BEERS = 'FAILED_REQUEST_BEERS';
export const UPDATE_MEAL = 'UPDATE_MEAL';
export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_PER_PAGE = 'UPDATE_PER_PAGE';

export interface Action<T> {
    type: string;
    payload: T;
}

export interface InitRequestBeersAction extends Action<void> {}
export interface SuccessRequestBeersAction extends Action<Beer[]> {}
export interface FailedRequestBeersAction extends Action<string> {}
export interface UpdateMealAction extends Action<string> {}
export interface UpdatePageAction extends Action<number> {}
export interface UpdatePerPageAction extends Action<number> {}

export function initRequestBeers(): InitRequestBeersAction {
    return {
        type: INIT_REQUEST_BEERS,
        payload: null
    };
}

export function successRequestBeers(list: Beer[]): SuccessRequestBeersAction {
    return {
        type: SUCCESS_REQUEST_BEERS,
        payload: list
    };
}

export function failedRequestBeers(error: string): FailedRequestBeersAction {
    return {
        type: FAILED_REQUEST_BEERS,
        payload: error
    };
}

export function updateMeal(food: string): UpdateMealAction {
    return {
        type: UPDATE_MEAL,
        payload: food
    };
}

export function updatePage(n: number): UpdatePageAction {
    return {
        type: UPDATE_PAGE,
        payload: n
    };
}

export function updatePerPage(n: number): UpdatePerPageAction {
    return {
        type: UPDATE_PER_PAGE,
        payload: n
    };
}
