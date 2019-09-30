import React from "react";
import { BeersContext } from "../classes/interfaces/beers-context.interface";

export const InitialState: BeersContext = {
    list: [],
    fetching: false,
    failed: false,
    page: 1,
    perPage: 10,
    food: ''
};
export default React.createContext(InitialState);
