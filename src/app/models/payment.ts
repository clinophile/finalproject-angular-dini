export class Payment {
    static nextId: number = 0;

    constructor(
        public paymentDetailId: number = 0,
        public cardOwnerName : string = '',
        public cardNumber : string = '',
        public expirationDate : string = '',
        public securityCode : string = '')
    {
        this.paymentDetailId = paymentDetailId ? paymentDetailId : Payment.nextId++;
    }
}

