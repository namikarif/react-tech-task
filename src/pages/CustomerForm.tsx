import React, {FC, useEffect, useMemo} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import Grid from "@mui/material/Grid2";
import {DatePicker} from "@mui/x-date-pickers";
import moment from "moment";
import {yupResolver} from "@hookform/resolvers/yup"

import {useAppDispatch, useAppSelector} from "../hooks/useRedux";
import {addCustomer, selectCustomer, selectCustomerList} from "../redux/features/customer";
import {ICustomer} from "../models/customer.dto";
import {CustomerModel} from "../models/validations/customer.validation";
import Form from "../components/Form";
import Input from "../components/Input";
import {Button} from "@mui/material";
import FormSelect from "../components/Select";

const CustomerForm: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const customer = useAppSelector(selectCustomer);
    const customers = useAppSelector(selectCustomerList);

    const form = useForm<ICustomer>({
        mode: 'all',
        reValidateMode: 'onSubmit',
        resolver: yupResolver(CustomerModel),
    });

    useEffect(() => {
        if (customer) {
            form.reset(customer);
        }
    }, [customer]);

    const onSubmit = (data: ICustomer) => {
        const lastId: number | undefined = customers[customers.length - 1]?.id;
        data = {...data, id: lastId ? lastId + 1 : 1};
        dispatch(addCustomer(data));

        const state: any = {...location.state};

        state[location.state.key] = data;

        navigate("/loan/add", {state});
    }

    return (
        <div className="p-5">
            <Form form={form} onSubmit={onSubmit} label="Add customer">
                <Grid size={5} className="grid gap-4">
                    <Input name="id_card.name" label="Name" required={true}/>
                    <Input name="id_card.lastname" label="Last name" required={true}/>
                    <Input name="id_card.father_name" label="Father name" required={true}/>
                    <Input name="id_card.fin_code" label="Fin code" mask="" required={true}/>
                    <div className="flex">
                        <Grid size={4}>
                            <FormSelect name="id_card.id_card_series"
                                        label="Series"
                                        options={[{label: "AA", value: "AA"}, {label: "AZE", value: "AZE"}]}
                                        required={true}/>
                        </Grid>
                        <Grid size={8}>
                            <Input name="id_card.id_card_number" label="Card number" mask="0000000" required={true}/>
                        </Grid>
                    </div>
                    <DatePicker {...form.register("id_card.date_of_birth")}
                                shouldDisableDate={day => day.toNow() < moment().toNow()}
                                onChange={(value) => form.setValue("id_card.date_of_birth", value?.format("YYYY-MM-DD") || "")}/>
                </Grid>
                <Grid size={5} className="grid gap-4">
                    <Input name="mobile_phone" label="Phone number" mask="+994 (00) 000-00-00" required={true}/>
                    <Input name="home_phone" label="Home number" mask="+994 (00) 000-00-00"/>
                    <Input name="current_address" label="Current address" required={true}/>
                    <Input name="id_card.registered_address" label="Registered address" required={true}/>

                    <Button variant="contained"
                            type="submit">
                        <span className="normal-case">Save</span>
                    </Button>
                </Grid>
            </Form>
        </div>
    );
}

export default CustomerForm;
