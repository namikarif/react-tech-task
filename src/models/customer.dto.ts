export class ICustomer {
    id?: number;
    mobile_phone: string;
    home_phone: string;
    current_address: string;
    id_card: ICustomerIdCard = new ICustomerIdCard();

    constructor(fin_code?: string) {
        this.home_phone = "";
        this.mobile_phone = "";
        this.current_address = "";

        if (fin_code) {
            this.id_card.fin_code = fin_code;
        }
    }
}

export class ICustomerIdCard {
    fin_code: string;
    id_card_number: string;
    id_card_series: string;
    name: string;
    lastname: string;
    father_name: string;
    registered_address: string;
    date_of_birth: string;

    constructor() {
        this.name = "";
        this.father_name = "";
        this.fin_code = "";
        this.id_card_number = "";
        this.id_card_series = "";
        this.lastname = "";
        this.registered_address = "";
        this.date_of_birth = "";
    }
}
