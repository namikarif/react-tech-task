import React, {FC, useMemo} from 'react';
import {Button} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
import {changeStep, selectLoan, updateLoanData} from "../../redux/features/loan";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoanDetailModel} from "../../models/validations/loan.validation";
import {LoanStepEnum} from "../../models/loan-step.enum";
import Form from "../Form";
import Grid from "@mui/material/Grid2";
import Input from "../Input";
import FormSelect from "../Select";

interface IDProps {
}

const currency = [
    {
        label: "$",
        value: "USD"
    },
    {
        label: "€",
        value: "EUR"
    },
    {
        label: "£",
        value: "GBP"
    },
    {
        label: "₼",
        value: "AZN"
    },
    {
        label: "₽",
        value: "RUB"
    },
    {
        label: "₺",
        value: "TRY"
    }
]

const Detail: FC<IDProps> = () => {
    const dispatch = useAppDispatch();
    const form = useForm({
        mode: 'all',
        reValidateMode: 'onSubmit',
        resolver: yupResolver(LoanDetailModel),
    });


    console.log("errors", form.formState.errors);

    const loanData = useAppSelector(selectLoan);

    const onSubmit = (data: any) => {
        dispatch(updateLoanData({...loanData, ...data}));
        dispatch(changeStep(LoanStepEnum.GUARANTOR_LIST));
    }

    return (
        <Form form={form} onSubmit={onSubmit} label="Detail">
            <Grid size={5} className="grid gap-4">
                <FormSelect name="detail.currency"
                            label="Currency"
                            options={currency}
                            required={true}/>
                <Input name="detail.amount"
                       label="Amount"
                       inputProps={{
                           min: 0
                       }}
                       mask={Number}
                       scale={2}
                       required={true}/>
                <Input name="detail.period"
                       label="Period"
                       inputProps={{
                           min: 1
                       }}
                       mask={Number}
                       required={true}/>

            </Grid>
            <Grid size={5} className="grid gap-2">
                <Input name="detail.rate"
                       label="Rate"
                       inputProps={{
                           min: 0
                       }}
                       mask={Number}
                       scale={2}
                       required={true}/>
                <Input name="detail.purpose"
                       label="Purpose"
                       multiline={true}
                       rows={3}
                       required={true}/>
                <Button variant="contained"
                        type="submit">
                    <span className="normal-case">Save and continue</span>
                </Button>
            </Grid>
        </Form>
    );
}

export default Detail;
