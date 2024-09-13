import React, {FC, useEffect, useState} from 'react';
import {Button} from "@mui/material";
import {useForm} from "react-hook-form";
import Grid from "@mui/material/Grid2";
import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {yupResolver} from "@hookform/resolvers/yup";
import {useLocation, useNavigate} from "react-router-dom";


import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
import {LoanGuarantorsModel} from "../../models/validations/loan.validation";
import {addLoanGuarantor, changeStep, deleteLoanGuarantor, selectLoan} from "../../redux/features/loan";
import {customerListColumns} from "../../pages/CustomerList";
import {selectCustomerList, setCustomer} from "../../redux/features/customer";
import CustomerSearchInput from "../CutomerSearchInput";
import {LoanStepEnum} from "../../models/loan-step.enum";
import AlertDialog from "../AlertDialog";
import {getCustomerLabel} from "../../services/utils";
import Form from "../Form";

const Detail: FC = () => {
    const dispatch = useAppDispatch();
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const form = useForm({
        mode: 'all',
        reValidateMode: 'onSubmit',
    });

    const navigate = useNavigate();
    const loanData = useAppSelector(selectLoan);
    const guarantors = loanData?.guarantors || [];
    const customers = useAppSelector(selectCustomerList);

    const location = useLocation();

    const guarantor = location.state?.guarantor;

    useEffect(() => {
        if (guarantor) {
            dispatch(addLoanGuarantor(guarantor));
            form.setValue("guarantor", guarantor)
            form.setValue("guarantor_name", getCustomerLabel(guarantor))
        }
    }, [guarantor]);

    const columns: GridColDef[] = [
        {
            field: '#',
            headerName: 'Actions',
            width: 100,
            renderCell: (params: GridRenderCellParams<any, any>) => {
                return (
                    <Button variant="contained"
                            color="error"
                            onClick={() => {
                                setDeleteId(params.row.id);
                                setIsAlertOpen(true);
                            }}>
                        <span className="normal-case">Delete</span>
                    </Button>
                );
            },
        },
        ...customerListColumns
    ];

    const removeGuarantor = () => {
        dispatch(deleteLoanGuarantor(deleteId!));
        setDeleteId(null);
        setIsAlertOpen(false);
    }

    const onSubmit = (data: any) => {
        dispatch(changeStep(LoanStepEnum.CALCULATE));
    }

    return (
        <>
            <div className="text-sky-700">Guarantors</div>
            <Form form={form} onSubmit={onSubmit}>
                <Grid size={12} className="grid gap-4">
                    <div className="flex gap-x-2">
                        <CustomerSearchInput name="guarantor"
                                             inputName="guarantor_name"
                                             options={customers.filter(c => c.id !== loanData.customer?.id)}
                                             selected={guarantors}
                                             onChange={(event, newValue) => {
                                                 if (newValue && newValue.id_card.fin_code.includes('Add')) {
                                                     newValue.id_card.fin_code = newValue.id_card.fin_code.replace('Add ', '');
                                                     dispatch(setCustomer(newValue));
                                                     navigate('/customer/add', {
                                                         state: {
                                                             key: "guarantor",
                                                             step: LoanStepEnum.GUARANTOR_LIST
                                                         }
                                                     });
                                                 } else if (newValue) {
                                                     dispatch(addLoanGuarantor(newValue));
                                                     form.setValue("guarantor", newValue)
                                                     form.setValue("guarantor_name", getCustomerLabel(newValue))
                                                 }
                                             }}/>
                        <Button variant="contained"
                                type="submit"
                                disabled={guarantors.length === 0}>
                            <span className="normal-case">Save and continue</span>
                        </Button>
                    </div>
                    <DataGrid rows={guarantors} columns={columns}/>
                </Grid>
            </Form>
            <AlertDialog open={isAlertOpen}
                         title="Delete guarantor"
                         description="Guarantor will be removed from the list. Are you sure?"
                         handleClose={() => {
                             setIsAlertOpen(false);
                             setDeleteId(null);
                         }}
                         handleAgree={removeGuarantor}/>
        </>
    );
}

export default Detail;
