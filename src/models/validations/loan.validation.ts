import {array, number, object, string} from "yup";
import {LoanStatusEnum} from "../loan-status.enum";


export const LoanDetailModel = object().shape({
    detail: object().shape({
        currency: string().required("Required"),
        amount: number().required("Required"),
        period: number()
            .min(1, "Must be greater than or equal to 1")
            .required("Required"),
        rate: number()
            .required("Required")
            .min(0.01, "Must be greater than or equal to 0.01"),
        purpose: string().required("Required"),
    }),
});

export const LoanSummaryModel = object()
    .shape({
        status: string().required("Required"),
        reject_reason: string(),
    })
    .test("reject_reason", "Required", function (value: any) {
        if (value?.status === LoanStatusEnum.REJECTED && !value?.reject_reason) {
            return this.createError({path: "reject_reason", message: "Required"});
        }
        return true;
    });

export const LoanAdittionalModel = object().shape(
    {
        activity_sector: string().required("Required"),
        monthly_income: number().required("Required").typeError("Required"),
        work_experience_year: number()
            .required("Required")
            .typeError("Required")
            .min(0, "Must be greater than or equal to 0"),
        work_experience_month: number()
            .required("Required")
            .typeError("Required")
            .min(0, "Must be greater than or equal to 0"),
        region: string().required("Required"),
        business_address: string().required("Required"),
    },
);

export const LoanCustomerModel = object().shape(
    {
        customer: object()
            .required("Required"),
        customer_name: string().required("Required"),
    },
);

export const LoanGuarantorsModel = object().shape(
    {
        guarantor: object(),
        guarantor_name: string(),
        guarantors: array()
            .required("Required")
            .length(1, "At least one guarantor is required"),
    },
);

