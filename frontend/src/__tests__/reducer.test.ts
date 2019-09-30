import { beersData } from '../util/mocks';
import { Action, InitRequestBeersAction, initRequestBeers, updateMeal, successRequestBeers, SuccessRequestBeersAction, FailedRequestBeersAction, failedRequestBeers, UpdatePerPageAction, updatePerPage, updatePage } from './../state/actions';
import { InitialState } from './../components/BeersContext';
import { BeersContext } from './../classes/interfaces/beers-context.interface';
import reducer from '../state/state-reducer';
describe('Reducer test', () => {
    let state: BeersContext;
    beforeEach(() => {
        state = InitialState;
    });

    test('unknown action', () => {
        const action: Action<string> = {
            type: 'abcdefg',
            payload: 'my_name'
        };
        try {
            reducer(state, action);
            fail();
        } catch(e) {}
    });

    test('actions for a successful beers api request cycle', () => {
        const p = 'Pizza';
        const foodAction = updateMeal(p);
        state = reducer(state, foodAction);
        expect(state).toEqual({
            fetching: false,
            failed: false,
            food: p,
            list: InitialState.list,
            page: InitialState.page,
            perPage: InitialState.perPage

        } as BeersContext);

        const initAction: InitRequestBeersAction = initRequestBeers();
        state = reducer(state, initAction);

        expect(state).toEqual({
            fetching: true,
            failed: false,
            food: p,
            list: InitialState.list,
            page: InitialState.page,
            perPage: InitialState.perPage

        } as BeersContext);

        const returnedList = beersData.slice(0, 10);

        const successAction: SuccessRequestBeersAction = successRequestBeers(returnedList);
        state = reducer(state, successAction);

        expect(state).toEqual({
            fetching: false,
            failed: false,
            food: p,
            list: returnedList,
            page: InitialState.page,
            perPage: InitialState.perPage
        } as BeersContext);
    });

    test('actions for a failed beers api request cycle', () => {
        const p = 'Hh';
        const foodAction = updateMeal(p);
        state = reducer(state, foodAction);
        expect(state).toEqual({
            fetching: false,
            failed: false,
            food: p,
            list: InitialState.list,
            page: InitialState.page,
            perPage: InitialState.perPage

        } as BeersContext);

        const initAction: InitRequestBeersAction = initRequestBeers();
        state = reducer(state, initAction);

        expect(state).toEqual({
            fetching: true,
            failed: false,
            food: p,
            list: InitialState.list,
            page: InitialState.page,
            perPage: InitialState.perPage

        } as BeersContext);

        const err = 'err';
        const failedAction: FailedRequestBeersAction = failedRequestBeers(err);
        state = reducer(state, failedAction);

        expect(state).toEqual({
            fetching: false,
            failed: true,
            food: p,
            list: InitialState.list,
            page: InitialState.page,
            perPage: InitialState.perPage
        } as BeersContext);
    });

    test('pagination actions', () => {
        const page = 3;
        const changePageAction = updatePage(page);
        state = reducer(state, changePageAction);
        expect(state).toEqual({
            fetching: false,
            failed: false,
            food: InitialState.food,
            list: InitialState.list,
            page,
            perPage: InitialState.perPage
        } as BeersContext);

        const perPage = 50;
        const perPageAction = updatePerPage(perPage);
        state = reducer(state, perPageAction);
        expect(state).toEqual({
            fetching: false,
            failed: false,
            food: InitialState.food,
            list: InitialState.list,
            page: 1,
            perPage
        } as BeersContext);
    });
});
