import React, {FC, SyntheticEvent} from 'react';
import {ICustomer} from "../models/customer.dto";
import {Autocomplete, createFilterOptions, TextField} from "@mui/material";
import {useController, useFormContext} from "react-hook-form";

interface ICSProps {
    name: string;
    inputName: string;
    options: ICustomer[];
    selected: ICustomer[];
    disableClearable?: boolean;
    onChange: (event: SyntheticEvent, newValue: ICustomer | null) => void;
}


const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option: ICustomer) => option.id_card.fin_code,
});

const CustomerSearchInput: FC<ICSProps> = ({
                                               name,
                                               inputName,
                                               options,
                                               selected,
                                               onChange,
                                               disableClearable
                                           }) => {
    const {register, watch} = useFormContext();
    const inputValue = watch(inputName);

    return (
        <Autocomplete
            options={options}
            getOptionLabel={(option) => `${option.id_card.name} ${option.id_card.lastname} ${option.id_card.father_name} - ${option.id_card.fin_code}`}
            filterOptions={(options, params) => {
                const filtered = filterOptions(options, params);

                if (params.inputValue !== '') {
                    filtered.push(new ICustomer(`Add ${params.inputValue}`));
                }

                return filtered;
            }}
            disableClearable={disableClearable}
            getOptionDisabled={(option: ICustomer) => selected.findIndex(s => s.id === option.id) > -1}
            sx={{width: 300}}
            renderInput={(params) => {
                return <TextField {...params} label="Search customer" {...register(inputName)} value={inputValue}/>;
            }}
            inputValue={inputValue}
            onChange={(event, value) => onChange(event, value)}
        />
    )
}

export default CustomerSearchInput;
