import React, {FC, useMemo} from 'react';
import {Button} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
import {useForm} from "react-hook-form";
import Input from "../Input";
import Grid from "@mui/material/Grid2";
import {changeStep, selectLoan, updateLoanData} from "../../redux/features/loan";
import {LoanStepEnum} from "../../models/loan-step.enum";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoanAdittionalModel} from "../../models/validations/loan.validation";
import Form from "../Form";

interface IDProps {
}

const Additionals: FC<IDProps> = () => {
    const dispatch = useAppDispatch();
    const form = useForm({
        mode: 'all',
        reValidateMode: 'onSubmit',
        resolver: yupResolver(LoanAdittionalModel),
    });

    const loanData = useAppSelector(selectLoan);

    console.log("form?.formState?.errors : ", form?.formState?.errors);

    const onSubmit = (data: any) => {
        dispatch(updateLoanData({...loanData, ...data}));
        dispatch(changeStep(LoanStepEnum.DETAIL));
    }

    return (
        <Form form={form} onSubmit={onSubmit} label="Additionals">
            <Grid size={5} className="grid gap-4">
                <Input name="activity_sector" label="Sector" required={true}/>
                <Input name="monthly_income"
                       label="Monthly income"
                       required={true}
                       type="number"
                       mask={Number}
                       scale={2}/>
                <Input name="work_experience_year"
                       label="Work experience (years)"
                       inputProps={{
                           min: 0
                       }}
                       required={true}
                       mask={Number}/>
                <Input name="work_experience_month"
                       label="Work experience (months)"
                       inputProps={{
                           max: 12,
                           min: 0
                       }}
                       required={true}
                       mask={Number}/>

            </Grid>
            <Grid size={5} className="grid gap-2">
                <Input name="region" label="Region" required={true}/>
                <Input name="business_address" label="Business address" multiline={true} rows={4} required={true}/>
                <Button variant="contained"
                        type="submit">
                    <span className="normal-case">Save and continue</span>
                </Button>
            </Grid>
        </Form>
    );
}

export default Additionals;
