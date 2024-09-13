import {array, boolean, number, object, string} from "yup";

export const CustomerModel = object().shape(
        {
            mobile_phone: string().required("Required"),
            home_phone: string().required("Required"),
            current_address: string().required("Required"),
            id_card: object().shape({
                father_name: string().required("Required"),
                fin_code: string().required("Required"),
                id_card_number: string().required("Required"),
                id_card_series: string().required("Required"),
                name: string().required("Required"),
                lastname: string().required("Required"),
                registered_address: string().required("Required"),
                date_of_birth: string().required("Required"),
            }),
        },
    );

