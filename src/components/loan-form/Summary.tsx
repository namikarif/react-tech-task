import React, {FC, useMemo, useState} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
import Grid from "@mui/material/Grid2";
import {addLoan, selectLoan} from "../../redux/features/loan";
import {calculateLoan} from "../../services/utils";
import {ICalculation} from "../../models/calculation.dto";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {LoanStatusEnum} from "../../models/loan-status.enum";
import {ILoan} from "../../models/loan.dto";
import {useNavigate} from "react-router-dom";

const Summary: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState(false);
    const [status, setStatus] = useState(LoanStatusEnum.PENDING);

    const loanData = useAppSelector(selectLoan);

    const loanSummary: ICalculation = useMemo(() => {
        return calculateLoan(loanData)
    }, [loanData]);

    const completeLoan = (status: LoanStatusEnum) => {
        setShowAlert(true);
        setStatus(status);
    }

    const handleClose = () => {
        setShowAlert(false);
        setStatus(LoanStatusEnum.PENDING);
    }

    return (
        <>
            <div className="grid gap-4 w-full">
                <div>
                    <Button variant="contained"
                            onClick={() => completeLoan(LoanStatusEnum.ACCEPTED)}>
                        <span className="normal-case">Submit</span>
                    </Button>

                    <Button variant="contained"
                            color="error"
                            className="ml-2"
                            onClick={() => completeLoan(LoanStatusEnum.REJECTED)}>
                        <span className="normal-case">Reject</span>
                    </Button>
                </div>
                <div className="flex">
                    <Grid size={6} className="grid gap-2">
                        <div>
                    <span
                        className="font-bold">Customer:</span> {loanData.customer.id_card.name} {loanData.customer.id_card.lastname} {loanData.customer.id_card.father_name}
                        </div>
                        <div>
                            <span className="font-bold">Sector:</span> {loanData.activity_sector}
                        </div>
                        <div>
                            <span className="font-bold">Monthly income:</span> {loanData.monthly_income?.toFixed(2)}
                        </div>
                        <div>
                    <span
                        className="font-bold">Work experience:</span> {loanData.work_experience_year} years {loanData.work_experience_month} months
                        </div>
                        <div>
                            <span className="font-bold">Region:</span> {loanData.region}
                        </div>
                        <div>
                            <span className="font-bold">Business address:</span> {loanData.business_address}
                        </div>
                    </Grid>
                    <Grid size={6} className="grid gap-2">
                        <div>
                        <span
                            className="font-bold">Loan amount:</span> {loanData.detail.amount} {loanData.detail.currency}
                        </div>
                        <div>
                            <span className="font-bold">Loan duration:</span> {loanData.detail.period} months
                        </div>
                        <div>
                            <span className="font-bold">Rate:</span> {loanData.detail.rate}%
                        </div>
                        <div>
                            <span className="font-bold">Monthly percent:</span> {loanSummary.month_percent}%
                        </div>
                        <div>
                    <span
                        className="font-bold">Monthly payment:</span> {loanSummary.monthly_payment} {loanData.detail.currency}
                        </div>
                        <div>
                    <span
                        className="font-bold">Total payments:</span> {loanSummary.total_payments} {loanData.detail.currency}
                        </div>
                    </Grid>
                    <Grid size={6} className="grid gap-2">
                        <div>
                            <span className="font-bold">Guarantors:</span> <br/>
                            {loanData.guarantors.map((guarantor, index) => {
                                return <div
                                    key={index}>{index + 1}. {guarantor.id_card.name} {guarantor.id_card.lastname} {guarantor.id_card.father_name}</div>
                            })}
                        </div>
                    </Grid>
                </div>
            </div>

            <Dialog
                open={showAlert}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const reason = formJson.reason;
                        const data: ILoan = {
                            ...loanData,
                            summary: {
                                status: status,
                                reject_reason: reason || ''
                            }
                        }

                        dispatch(addLoan(data));
                        navigate('/loan');
                    },
                }}
            >
                <DialogTitle>Warning</DialogTitle>
                <DialogContent>
                    <DialogContentText className="mb-3">
                        Are you sure you want to {status === LoanStatusEnum.ACCEPTED ? 'accept' : 'reject'} this loan?
                    </DialogContentText>
                    {status === LoanStatusEnum.REJECTED && (
                        <TextField
                            autoFocus
                            required
                            id="reason"
                            name="reason"
                            label="Rejection reason"
                            fullWidth
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Summary;
