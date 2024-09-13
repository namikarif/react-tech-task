import {ICustomer} from "./customer.dto";

export class ICustomerState {
    customer: ICustomer = new ICustomer();
    customers: ICustomer[] = [];
}
