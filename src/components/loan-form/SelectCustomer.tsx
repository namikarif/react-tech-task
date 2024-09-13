import React, {FC, useEffect} from 'react';
import {Button} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
import {selectCustomerList, setCustomer} from "../../redux/features/customer";
import {ICustomer} from "../../models/customer.dto";
import {useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {changeStep, setLoanCustomer} from "../../redux/features/loan";
import {LoanStepEnum} from "../../models/loan-step.enum";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoanCustomerModel} from "../../models/validations/loan.validation";
import Form from "../Form";
import CustomerSearchInput from "../CutomerSearchInput";
import {getCustomerLabel} from "../../services/utils";


const SelectCustomer: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const customers = useAppSelector(selectCustomerList);

    const location = useLocation();

    const customer = location.state?.customer;

    const form = useForm({
        mode: 'all',
        reValidateMode: 'onSubmit',
        resolver: yupResolver(LoanCustomerModel),
        defaultValues: {
            customer: new ICustomer(),
            customer_name: ''
        }
    });

    useEffect(() => {
        if (customer) {
            dispatch(setLoanCustomer(customer));
            form.setValue("customer", customer);
            form.setValue("customer_name", getCustomerLabel(customer));
        }
    }, []);

    const customerValue: ICustomer = form.watch('customer') as ICustomer;

    const onSubmit = (data: any) => {
        dispatch(changeStep(LoanStepEnum.ADDITIONAL));
    }

    return (
        <Form form={form} onSubmit={onSubmit} label="Select customer">
            <CustomerSearchInput name="customer"
                                 inputName="customer_name"
                                 disableClearable={true}
                                 options={customers}
                                 selected={customerValue ? [customerValue] : []}
                                 onChange={(event, newValue) => {
                                     if (newValue && newValue.id_card.fin_code.includes('Add')) {
                                         newValue.id_card.fin_code = newValue.id_card.fin_code.replace('Add ', '');
                                         dispatch(setCustomer(newValue));
                                         navigate('/customer/add', {
                                             state: {
                                                 key: "customer",
                                                 step: LoanStepEnum.CUSTOMER_SELECT
                                             }
                                         });
                                     } else if (newValue) {
                                         dispatch(setLoanCustomer(newValue));
                                         form.setValue("customer", newValue);
                                         form.setValue("customer_name", getCustomerLabel(newValue));
                                     }
                                 }}/>
            <Button variant="contained"
                    type="submit"
                    disabled={!customerValue?.id}>
                <span className="normal-case">Save and continue</span>
            </Button>
        </Form>
    );
}

export default SelectCustomer;
