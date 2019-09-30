import React, { ReactElement } from "react";
import "./App.scss";
import { withTranslation } from "react-i18next";
import AppContainer from "./container/AppContainer";

function App(): ReactElement {
    return <AppContainer />;
}
export default withTranslation()(App);
