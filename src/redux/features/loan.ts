import {ILoan} from "../../models/loan.dto";
import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ILoanState} from "../../models/loan-state.dto";
import {RootState} from "../store";
import {LoanStatusEnum} from "../../models/loan-status.enum";
import {LoanStepEnum} from "../../models/loan-step.enum";
import {ICustomer} from "../../models/customer.dto";

const initialState: ILoanState = {
    loan: {
        customer: {
            id: 0,
            mobile_phone: "",
            home_phone: "",
            current_address: "",
            id_card: {
                fin_code: "",
                id_card_number: "",
                id_card_series: "",
                name: "",
                lastname: "",
                father_name: "",
                registered_address: "",
                date_of_birth: "",
            }
        },
        activity_sector: "",
        monthly_income: 0,
        work_experience_year: 0,
        work_experience_month: 0,
        region: "",
        business_address: "",
        detail: {
            currency: "",
            amount: 0,
            period: 0,
            rate: 0,
            purpose: "",
        },
        summary: {
            status: LoanStatusEnum.PENDING,
            reject_reason: "",
        },
        guarantors: [],
    },
    loans: [],
    step: LoanStepEnum.CUSTOMER_SELECT
};

const loanSlice = createSlice({
    name: "loan",
    initialState,
    reducers: {
        addLoan: (state, action: PayloadAction<ILoan>) => {
            const lastId = state.loans[state.loans.length - 1]?.id;
            state.loans.push({...action.payload, id: (lastId || 0) + 1});
        },
        editLoan: (state, action: PayloadAction<{ data: ILoan, index: number }>) => {
            state.loans[action.payload.index] = action.payload.data;
        },
        updateLoanData: (state, action: PayloadAction<ILoan>) => {
            state.loan = action.payload;
        },
        setLoanCustomer: (state, action: PayloadAction<ICustomer>) => {
            state.loan.customer = action.payload;
        },
        addLoanGuarantor: (state, action: PayloadAction<ICustomer>) => {
            state.loan.guarantors.push(action.payload);
        },
        deleteLoanGuarantor: (state, action: PayloadAction<number>) => {
            state.loan.guarantors = state.loan.guarantors.filter(guarantor => guarantor.id !== action.payload);
        },
        deleteLoan: (state, action: PayloadAction<number>) => {
            state.loans = state.loans.filter(loan => loan.id !== action.payload);
        },
        setLoan: (state, action: PayloadAction<ILoan>) => {
            state.loan = action.payload;
        },
        clearLoan: (state) => {
            state.loan = initialState.loan;
        },
        changeStep: (state, action: PayloadAction<LoanStepEnum>) => {
            state.step = action.payload
        },
        cleanLoanState: (state) => {
            Object.assign(state, initialState);
        }
    }
});

export const selectLoan = createSelector(
    (state: RootState) => state.loan.loan,
    state => state,
);

export const selectLoanStep = createSelector(
    (state: RootState) => state.loan.step,
    state => state,
);

export const selectLoanList = createSelector(
    (state: RootState) => state.loan.loans,
    state => state,
);


export const {
    addLoan,
    editLoan,
    deleteLoan,
    setLoan,
    setLoanCustomer,
    addLoanGuarantor,
    deleteLoanGuarantor,
    clearLoan,
    updateLoanData,
    changeStep,
    cleanLoanState,
} = loanSlice.actions;

export default loanSlice.reducer;
