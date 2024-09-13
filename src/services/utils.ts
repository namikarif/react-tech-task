import classNames from "classnames";
import {extendTailwindMerge} from "tailwind-merge";
import {ILoan} from "../models/loan.dto";
import {ICalculation, ICalculationList} from "../models/calculation.dto";
import {ICustomer} from "../models/customer.dto";

const twMerge = extendTailwindMerge({});

export function cn(...inputs: any[]) {
    return twMerge(classNames(inputs));
}

export const calculateLoan = (loanData: ILoan): ICalculation => {
    let amount = loanData.detail.amount;
    let period = loanData.detail.period;
    let rate = loanData.detail.rate;

    let month_percent = (rate / 12) / 100;

    let percent_pow = Math.pow((1 + month_percent), period);

    let formul_top = month_percent * percent_pow;
    let formul_bottom = percent_pow - 1;
    let formul_k = formul_top / formul_bottom;
    let formul_result = formul_k * amount;

    let monthly_payment = Number(formul_result.toFixed(2));
    let rate_amount = (amount * (rate / 12)) / 100;
    let main_price = 0;
    let debt_balance = amount;

    let total_payments = 0;
    let total_main_price = 0;
    let total_rate_amount = 0;

    let list: ICalculationList[] = [];

    for (let i = 0; i < period; i++) {
        const now = new Date();

        rate_amount = Number((debt_balance * month_percent).toFixed(2));

        if ((i + 1) === period) {
            monthly_payment = Number(list[i - 1].debt_balance) + rate_amount;
            main_price = Number((monthly_payment - rate_amount).toFixed(2));
            debt_balance = 0;
        } else {
            main_price = Number((monthly_payment - rate_amount).toFixed(2));
            debt_balance = Number((debt_balance - main_price).toFixed(2));
        }

        total_payments += Number(monthly_payment.toFixed(2));
        total_main_price += Number(main_price.toFixed(2));
        total_rate_amount = Number((total_rate_amount + rate_amount).toFixed(2));

        list.push({
            id: i + 1,
            month: new Date(now.setMonth(now.getMonth() + i)),
            monthly_payment: monthly_payment.toFixed(2),
            main_price: main_price.toFixed(2),
            rate_amount: rate_amount.toFixed(2),
            debt_balance: debt_balance.toFixed(2),
        })
    }

    return {
        monthly_payment: list[0].monthly_payment,
        total_payments: total_payments.toFixed(2),
        total_main_price: total_main_price.toFixed(2),
        total_rate_amount: total_rate_amount.toFixed(2),
        month_percent: (month_percent * 100).toFixed(2),
        list
    }
}

export const getCustomerLabel = (customer: ICustomer): string => {
    return `${customer.id_card.name} ${customer.id_card.lastname} ${customer.id_card.father_name} - ${customer.id_card.fin_code}`;
}
