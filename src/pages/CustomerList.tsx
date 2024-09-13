import React, {FC, useState} from 'react';
import {DataGrid, GridColDef, GridRowSelectionModel} from '@mui/x-data-grid';
import {useAppSelector} from "../hooks/useRedux";
import {selectCustomerList} from "../redux/features/customer";
import {ICustomer} from "../models/customer.dto";
import {TextField} from "@mui/material";
import {useDebouncedSearch} from "../hooks/useDebouncedSearch";

export const customerListColumns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 70
    },
    {
        field: 'id_card.fin_code',
        headerName: 'Fin code',
        valueGetter: (value, row: ICustomer) => `${row.id_card?.fin_code || ''}`,
        width: 130
    },
    {
        field: 'id_card.id_card_series',
        headerName: 'Card number',
        width: 130,
        valueGetter: (value, row: ICustomer) => `${row.id_card?.id_card_series || ''} ${row.id_card?.id_card_number || ''}`,
    },
    {
        field: 'id_card.name',
        headerName: 'First name',
        valueGetter: (value, row: ICustomer) => `${row.id_card?.name || ''}`,
        flex: 0.4
    },
    {
        field: 'id_card.lastname',
        headerName: 'Last name',
        valueGetter: (value, row: ICustomer) => `${row.id_card?.lastname || ''}`,
        flex: 0.4
    },
    {
        field: 'id_card.father_name',
        headerName: 'Father name',
        valueGetter: (value, row: ICustomer) => `${row.id_card?.father_name || ''}`,
        flex: 0.4
    },
    {
        field: 'id_card.birth_date',
        headerName: 'Birth date',
        valueGetter: (value, row: ICustomer) => new Date(row.id_card?.date_of_birth),
        width: 130,
        type: "date"
    },
    {
        field: 'mobile_phone',
        headerName: 'Mobile phone',
        type: 'number',
    },
    {
        field: 'home_phone',
        headerName: 'Home phone',
        type: 'number',
    },
    {
        field: 'current_address',
        headerName: 'Current address',
    },
    {
        field: 'id_card.registered_address',
        headerName: 'Registered address',
        valueGetter: (value, row: ICustomer) => `${row.id_card?.registered_address || ''}`,
    },
];

const paginationModel = {page: 0, pageSize: 5};

const CustomerList: FC = () => {

    const [data, setData] = useState<ICustomer[]>([]);

    const customerList: ICustomer[] = useAppSelector(selectCustomerList);

    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

    const {searchInputValue, setSearchInputValue} = useDebouncedSearch(() => {
        const list: ICustomer[] = customerList.filter((customer: ICustomer) => {
            return customer.id_card.fin_code?.toLocaleLowerCase().includes(searchInputValue?.toLocaleLowerCase());
        }) || [];

        setData(list);
    });

    return (
        <>
            <div className="py-2 px-4">
                <TextField id="standard-basic"
                           label="Search fin code"
                           onChange={(e) => setSearchInputValue(e.target.value)}
                           variant="standard"/>
            </div>
            <DataGrid
                disableColumnSorting={true}
                disableColumnMenu={true}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                }}
                rowSelectionModel={rowSelectionModel}
                rows={data}
                columns={customerListColumns}
                initialState={{pagination: {paginationModel}}}
                pageSizeOptions={[5, 10, 20]}
                sx={{border: 0}}
            />
        </>
    );
}

export default CustomerList;
