import React, {FC, useState} from 'react';
import {DataGrid, GridColDef, GridRenderCellParams, GridRowSelectionModel} from '@mui/x-data-grid';
import {useAppSelector} from "../hooks/useRedux";
import {Button, TextField} from "@mui/material";
import {useDebouncedSearch} from "../hooks/useDebouncedSearch";
import {ILoan} from "../models/loan.dto";
import {selectLoanList} from "../redux/features/loan";
import {useNavigate} from "react-router-dom";

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 70
    },
    {
        field: 'id_card.fin_code',
        headerName: 'Fin code',
        valueGetter: (value, row: ILoan) => `${row.customer.id_card?.fin_code || ''}`,
        width: 130
    },
    {
        field: 'id_card.id_card_series',
        headerName: 'ID card number',
        width: 130,
        valueGetter: (value, row: ILoan) => `${row.customer.id_card?.id_card_series || ''} ${row.customer.id_card?.id_card_number || ''}`,
    },
    {
        field: 'id_card.name',
        headerName: 'First name',
        valueGetter: (value, row: ILoan) => `${row.customer.id_card?.name || ''}`,
        flex: 0.4
    },
    {
        field: 'id_card.lastname',
        headerName: 'Last name',
        valueGetter: (value, row: ILoan) => `${row.customer.id_card?.lastname || ''}`,
        flex: 0.4
    },
    {
        field: 'detail.amount',
        headerName: 'Amount',
        valueGetter: (value, row: ILoan) => `${row.detail?.amount} ${row.detail?.currency}`,
        type: 'number'
    },
    {
        field: 'detail.rate',
        headerName: 'Rate',
        valueGetter: (value, row: ILoan) => `${row.detail?.rate}%`,
    },
    {
        field: 'detail.period',
        headerName: 'Months',
        valueGetter: (value, row: ILoan) => `${row.detail?.period}`,
        type: 'number',
    },
    {
        field: 'summary.status',
        headerName: 'Status',
        valueGetter: (value, row: ILoan) => `${row.summary.status}`,
    },
    {
        field: 'summary.reject_reason',
        headerName: 'Reason',
        valueGetter: (value, row: ILoan) => `${row.summary.reject_reason}`,
    },
];

const paginationModel = {page: 0, pageSize: 5};

const LoanList: FC = () => {

    const navigate = useNavigate();

    const [data, setData] = useState<ILoan[]>([]);

    const loanList: ILoan[] = useAppSelector(selectLoanList);

    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

    const {searchInputValue, setSearchInputValue} = useDebouncedSearch(() => {
        const list: ILoan[] = loanList.filter((loan: ILoan) => {
            return loan.customer.id_card.fin_code?.toLocaleLowerCase().includes(searchInputValue?.toLocaleLowerCase());
        }) || [];

        setData(list);
    });


    return (
        <>
            <div className="py-2 px-4 flex items-center justify-between">
                <TextField id="standard-basic"
                           label="Search fin code"
                           onChange={(e) => setSearchInputValue(e.target.value)}
                           variant="standard"/>
                <Button variant="contained"
                        color="primary"
                        className="ml-4"
                        onClick={() => navigate("/loan/add")}>
                    <span className="normal-case">Create new loan</span>
                </Button>
            </div>
            <DataGrid
                disableColumnSorting={true}
                disableColumnMenu={true}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                }}
                rowSelectionModel={rowSelectionModel}
                rows={data}
                columns={columns}
                initialState={{pagination: {paginationModel}}}
                pageSizeOptions={[5, 10, 20]}
                sx={{border: 0}}
            />
        </>
    );
}

export default LoanList;
