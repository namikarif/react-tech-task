import React, {FC, useEffect} from 'react';
import {LoanStepEnum} from "../models/loan-step.enum";
import {useAppDispatch, useAppSelector} from "../hooks/useRedux";
import {changeStep, cleanLoanState, selectLoanStep} from "../redux/features/loan";
import SelectCustomer from "../components/loan-form/SelectCustomer";
import Detail from "../components/loan-form/Detail";
import Additionals from "../components/loan-form/Additionals";
import Guarantor from "../components/loan-form/Guarantor";
import {useLocation} from "react-router-dom";
import CalculateLoan from "../components/loan-form/CalculateLoan";
import Summary from "../components/loan-form/Summary";

const renderForm = (step: LoanStepEnum) => {
    switch (step) {
        case LoanStepEnum.CUSTOMER_SELECT:
            return <SelectCustomer/>
        case LoanStepEnum.ADDITIONAL:
            return <Additionals/>
        case LoanStepEnum.DETAIL:
            return <Detail/>
        case LoanStepEnum.GUARANTOR_LIST:
            return <Guarantor/>
        case LoanStepEnum.CALCULATE:
            return <CalculateLoan/>
        case LoanStepEnum.SUMMARY:
            return <Summary/>
    }
}

const LoanForm: FC = () => {
    const step = useAppSelector(selectLoanStep);
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        if (Object.keys(location.state || {}).length === 0) {
            dispatch(cleanLoanState())
        } else {
            dispatch(changeStep(location.state?.step || LoanStepEnum.CUSTOMER_SELECT));
        }
    }, []);

    return (
        <div className="p-5">
            <span className="font-bold mb-5 text-lg">Add loan</span>
            {renderForm(step)}
        </div>
    );
}

export default LoanForm;
