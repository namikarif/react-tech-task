import React, {FC} from 'react';
import {FormProvider, UseFormReturn} from "react-hook-form";
import Grid from "@mui/material/Grid2";

interface IFProps {
    children: React.ReactNode;
    form: UseFormReturn<any>;
    onSubmit: (data: any) => void;
    label?: string;
}

const Form: FC<IFProps> = ({form, onSubmit, label, children}) => {
    return (
        <FormProvider {...form}>
            <Grid size={10}>
                <form onSubmit={form.handleSubmit(onSubmit, () => form.trigger())} className="w-full">
                    <div className="my-5">
                        <span className="text-sm text-sky-700">
                            {label}
                        </span>
                    </div>
                    <div className="flex justify-around w-full">
                        {children}
                    </div>
                </form>
            </Grid>
        </FormProvider>
    );
}

export default Form;
