import {ILoan} from "./loan.dto";
import {LoanStepEnum} from "./loan-step.enum";

export class ILoanState {
    loan: ILoan;
    loans: ILoan[];
    step: LoanStepEnum;

    constructor() {
        this.loan = new ILoan();
        this.loans = [];
        this.step = LoanStepEnum.CUSTOMER_SELECT;
    }
}
