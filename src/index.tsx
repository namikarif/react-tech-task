import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./redux/store";
import {StyledEngineProvider} from '@mui/material/styles';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <StyledEngineProvider injectFirst>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <App/>
                </LocalizationProvider>
            </StyledEngineProvider>
        </PersistGate>
    </Provider>,
);

reportWebVitals();
