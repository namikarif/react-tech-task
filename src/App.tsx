import React from 'react';
import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from '@mui/material/Grid2';

import {RouteInterface} from "./models/route.interface";
import Menu from "./components/Menu";
import LoanList from "./pages/LoanList";
import Dashboard from "./pages/Dashboard";
import CustomerList from "./pages/CustomerList";
import CustomerForm from "./pages/CustomerForm";
import LoanForm from "./pages/LoanForm";

const routes: RouteInterface[] = [
    {
        path: "/",
        component: Dashboard,
        label: "Home"
    },
    {
        path: "/loan",
        component: LoanList,
        label: "Loan list"
    },
    {
        path: "/loan/add",
        component: LoanForm,
        hide: true
    },
    {
        path: "/customer",
        component: CustomerList,
        label: "Customer list"
    },
    {
        path: "/customer/add",
        component: CustomerForm,
        hide: true
    },
    {
        path: "/customer/edit/:id",
        component: CustomerForm,
        hide: true
    }
]

function App() {
    return (
        <BrowserRouter basename="/">
            <Grid container>
                <Grid size={2}>
                    <Menu routes={routes.filter(menu => !menu.hide)}/>
                </Grid>
                <Grid size={10}>
                    <Paper sx={{height: "100vh", width: '100%'}}>
                        <Routes>
                            {
                                routes.map((route, index) => {
                                    const Comp = route.component;
                                    return (
                                        <Route key={index} path={route.path} element={<Comp/>}/>
                                    )
                                })
                            }
                        </Routes>
                    </Paper>
                </Grid>
            </Grid>
        </BrowserRouter>
    );
}

export default App;
