export class ICalculation {
    monthly_payment: string;
    total_payments: string;
    total_main_price: string;
    total_rate_amount: string;
    month_percent: string;
    list: ICalculationList[];
}

export class ICalculationList {
    id: number;
    month: Date;
    monthly_payment: string;
    main_price: string;
    rate_amount: string;
    debt_balance: string;
}
