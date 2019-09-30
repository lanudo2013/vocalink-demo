import React, { ReactElement, useState, useReducer } from "react";
import "./AppContainer.scss";
import { withTranslation, WithTranslation } from "react-i18next";
import { Container, Typography} from "@material-ui/core";
import MealInput from "../meal-input/MealInput";
import BeersContext, { InitialState } from "../BeersContext";
import service from '../../services/beers.service';
import BeersTable from "../beers-table/BeersTable";
import reducer from "../../state/state-reducer";
import { successRequestBeers, failedRequestBeers, updateMeal, updatePage, updatePerPage, initRequestBeers } from "../../state/actions";
import ErrorModal from "../error-modal/ErrorModal";

function AppContainer(props: {} & WithTranslation): ReactElement {
    const [errorMessage, setShowErrorMessage] = useState('');
    const [state, dispatch] = useReducer(reducer, InitialState);
    const {t} = props;
    const doRequest = (page: number, perPage: number, value: string) => {
        dispatch(initRequestBeers());
        service.getBeersByFood(page, perPage, value).subscribe(beers => {
            dispatch(successRequestBeers(beers));
        }, (err: string) => {
            dispatch(failedRequestBeers(err));
            setShowErrorMessage(t(err) || t('app.error.generalDesc'));
        });
    };

    const changeValue = (value: string) => {
        dispatch(updateMeal(value));
        doRequest(1, state.perPage, value);
    };

    const handleClose = () => {
        setShowErrorMessage(null);
    };

    const handleChangePage = (newPage: number) => {
        if (state.food) {
            dispatch(updatePage(newPage));
            doRequest(newPage, state.perPage, state.food);
        }
    };

    const handleChangePerPage = (newPerPage: number) => {
        dispatch(updatePerPage(newPerPage));
        if (state.food) {
            doRequest(1, newPerPage, state.food);
        }
    };

    return <BeersContext.Provider value={state}>
        <Container maxWidth="md" className="container" >
            <Typography variant="h2" component="h2" className="title">
                {t('app.title')}
            </Typography>
            <MealInput onChange={changeValue} loading={state.fetching}/>
            <BeersTable loading={state.fetching}
                        onChangePage={(newPage) => handleChangePage(newPage)}
                        onChangePerPage={perPage => handleChangePerPage(perPage)}
                        isLastPage={state.list.length < state.perPage}
            />
            <ErrorModal open={errorMessage && errorMessage !== '' ? true : false} onClose={handleClose}
                errorMessage={errorMessage}
            />
        </Container>
    </BeersContext.Provider>;
}
export default withTranslation()(AppContainer);
