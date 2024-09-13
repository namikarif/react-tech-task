import {ICustomer} from "./customer.dto";
import {IGuarantor} from "./guarantor.dto";
import {LoanStatusEnum} from "./loan-status.enum";

export class ILoan {
    id?: number;
    customer: ICustomer = new ICustomer();
    guarantors: IGuarantor[] = [];
    activity_sector: string;
    monthly_income: number;
    work_experience_year: number;
    work_experience_month: number;
    region: string;
    business_address: string;
    detail: ILoanDetail = new ILoanDetail();
    summary: ILoanSummary = new ILoanSummary();

    constructor() {
        this.activity_sector = "";
        this.monthly_income = 0;
        this.work_experience_year = 0;
        this.work_experience_month = 0;
        this.region = "";
        this.business_address = "";
        this.guarantors = [];
    }
}

export class ILoanDetail {
    currency: string;
    amount: number;
    period: number;
    rate: number;
    purpose: string;

    constructor() {
        this.currency = "";
        this.amount = 0;
        this.period = 0;
        this.rate = 0;
        this.purpose = "";
    }
}

export class ILoanSummary {
    status: LoanStatusEnum;
    reject_reason?: string;

    constructor() {
        this.status = LoanStatusEnum.PENDING;
        this.reject_reason = "";
    }
}
