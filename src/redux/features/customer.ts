import {ICustomer} from "../../models/customer.dto";
import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICustomerState} from "../../models/customer-state.dto";
import {RootState} from "../store";

const initialState: ICustomerState = {
    customer: new ICustomer(),
    customers: [
        {
            id: 1,
            mobile_phone: "+998 99 999 99 99",
            home_phone: "",
            current_address: "Neapol 26a, Xetai rayonu, Baki",
            id_card: {
                father_name: "Arif",
                fin_code: "5299P1G",
                id_card_number: "3449943",
                id_card_series: "AA",
                name: "Namik",
                lastname: "Arifoglu",
                registered_address: "Mingecevir",
                date_of_birth: "1990-09-02"
            }
        }
    ]
};

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        addCustomer: (state, action: PayloadAction<ICustomer>) => {
            state.customers.push(action.payload);
        },
        editCustomer: (state, action: PayloadAction<ICustomer>) => {
            state.customers = state.customers.map(customer => {
                if (customer.id === action.payload.id) {
                    return action.payload;
                }
                return customer;
            });
        },
        deleteCustomer: (state, action: PayloadAction<number>) => {
            state.customers = state.customers.filter(customer => customer.id !== action.payload);
        },
        setCustomer: (state, action: PayloadAction<ICustomer>) => {
            state.customer = action.payload;
        },
        clearCustomer: (state) => {
            state.customer = initialState.customer;
        },
    }
});

export const selectCustomer = createSelector(
    (state: RootState) => state.customer.customer,
    state => state,
);

export const selectCustomerList = createSelector(
    (state: RootState) => state.customer.customers,
    state => state,
);

export const selectCustomerCount = createSelector(
    (state: RootState) => state.customer.customers.length,
    state => state,
);


export const {
    addCustomer,
    editCustomer,
    deleteCustomer,
    setCustomer,
    clearCustomer
} = customerSlice.actions;

export default customerSlice.reducer;
