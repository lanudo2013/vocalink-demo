import { BeersContext } from "../classes/interfaces/beers-context.interface";
import { Action, INIT_REQUEST_BEERS, SUCCESS_REQUEST_BEERS, FAILED_REQUEST_BEERS, InitRequestBeersAction,
        SuccessRequestBeersAction, UpdateMealAction, UPDATE_MEAL, UPDATE_PAGE, UPDATE_PER_PAGE,
        UpdatePageAction, UpdatePerPageAction } from "./actions";

export default function reducer(state: BeersContext, action: Action<any>): BeersContext {
    let act;
    switch (action.type) {
        case INIT_REQUEST_BEERS:
            act = action as InitRequestBeersAction;
            return {...state, fetching: true};
        case SUCCESS_REQUEST_BEERS:
            act = action as SuccessRequestBeersAction;
            return {...state, fetching: false, list: act.payload};
        case FAILED_REQUEST_BEERS:
            act = action as SuccessRequestBeersAction;
            return {...state, fetching: false, failed: true};
        case UPDATE_MEAL:
            act = action as UpdateMealAction;
            return {...state, food: act.payload, page: 1};
        case UPDATE_PAGE:
            act = action as UpdatePageAction;
            return {...state, page: act.payload};
        case UPDATE_PER_PAGE:
                act = action as UpdatePerPageAction;
                return {...state, perPage: act.payload, page: 1};
        default:
            throw new Error();
    }
}
