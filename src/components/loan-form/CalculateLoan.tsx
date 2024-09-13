import React, {FC, useMemo} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
import Grid from "@mui/material/Grid2";
import {changeStep, selectLoan} from "../../redux/features/loan";
import {LoanStepEnum} from "../../models/loan-step.enum";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {calculateLoan} from "../../services/utils";
import {ICalculation, ICalculationList} from "../../models/calculation.dto";
import {Button} from "@mui/material";

const CalculateLoan: FC = () => {
    const dispatch = useAppDispatch();

    const loanData = useAppSelector(selectLoan);

    const data: ICalculation = useMemo(() => {
        return calculateLoan(loanData);
    }, [loanData]);

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'No',
            width: 70,
        },
        {
            field: 'month',
            headerName: 'Month',
            type: 'date',
            flex: 1,
        },
        {
            field: 'monthly_payment',
            flex: 1,
            renderHeader: (params) => (
                <div className="grid">
                    <span>Monthly payment</span>
                    <span>Total payments: <span className="font-bold">{data.total_payments} {loanData.detail.currency}</span></span>
                </div>
            ),
        },
        {
            field: 'main_price',
            flex: 1,
            renderHeader: (params) => (
                <div className="grid">
                    <span>Main price</span>
                    <span>Total amount: <span className="font-bold">{data.total_main_price} {loanData.detail.currency}</span></span>
                </div>
            ),
        },
        {
            field: 'rate_amount',
            flex: 1,
            renderHeader: (params) => (
                <div className="grid">
                    <span>Rate amount</span>
                    <span>Total amount: <span className="font-bold">{data.total_rate_amount} {loanData.detail.currency}</span></span>
                </div>
            ),
        },
        {
            field: 'debt_balance',
            headerName: 'Debt balance',
            flex: 1,
        },
    ];

    const onSubmit = (data: any) => {
        dispatch(changeStep(LoanStepEnum.SUMMARY));
    }

    return (
        <Grid size={12} className="grid gap-4">
            <div className="flex justify-between">
                <div>
                    <div>Credit amount: {loanData.detail.amount} {loanData.detail.currency}</div>
                    <div>Monthly payment: {data.monthly_payment} {loanData.detail.currency}</div>
                </div>
                <Button onClick={onSubmit} variant="contained">Next</Button>
            </div>
            <DataGrid rows={data.list || []}
                      columns={columns}
                      disableColumnSorting={true}
                      disableColumnMenu={true}
                      disableColumnResize={true}
                      initialState={{
                          pagination: { paginationModel: { pageSize: 10, page: 0 } },
                      }}
                      pageSizeOptions={[10, 20, 50]}
            />
        </Grid>
    );
}

export default CalculateLoan;
