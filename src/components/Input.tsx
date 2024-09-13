import React, {FC} from 'react';
import {TextField} from "@mui/material";
import {useController, useFormContext} from "react-hook-form";
import {useIMask} from 'react-imask';

interface IFProps {
    type?: React.InputHTMLAttributes<unknown>['type'];
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    multiline?: boolean;
    mask?: any;
    scale?: number;
    rows?: number;
    maskEnum?: any[];
    inputProps?: React.InputHTMLAttributes<unknown>;
}

const Input: FC<IFProps> = ({
                                name,
                                label,
                                placeholder,
                                type = "text",
                                mask,
                                scale = 0,
                                multiline,
                                rows = 1,
                                maskEnum = [],
                                required,
                                inputProps
                            }) => {
    const {field, fieldState} = useController({name});
    const ctx = useFormContext();
    const error = fieldState.error?.message;

    const {ref} = useIMask({mask, enum: maskEnum, scale});

    const _placeholdder = typeof mask === "string" ? mask : placeholder;

    return (
        <TextField label={label}
                   required={required}
                   type={type}
                   className="w-full"
                   placeholder={_placeholdder}
                   multiline={multiline}
                   rows={rows}
                   autoComplete="off"
                   inputProps={{
                       ...inputProps,
                       className: "h-5",
                       ref: ref,
                   }}
                   error={!!error}
                   helperText={error}
                   {...ctx.register(name, {required})} />
    );
}

export default Input;
