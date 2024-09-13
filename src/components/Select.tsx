import React, {FC} from 'react';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import {FormHelperText, Select} from "@mui/material";
import {useController, useFormContext} from "react-hook-form";

interface ISProps {
    name: string;
    label: string;
    required?: boolean;
    options: { label: string, value: string }[];
}

const FormSelect: FC<ISProps> = ({name, label, required, options = []}) => {
    const {field, fieldState} = useController({name});
    const ctx = useFormContext();
    const error = fieldState.error?.message;

    return (
        <FormControl fullWidth error={!!error}>
            <InputLabel>{label} *</InputLabel>
            <Select
                label={label}
                {...ctx.register(name)}
                required={required}
            >
                {
                    options.map((option, index) => (
                        <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                    ))
                }
            </Select>
            {!!error && <FormHelperText>error</FormHelperText>}
        </FormControl>
    )
}

export default FormSelect;
