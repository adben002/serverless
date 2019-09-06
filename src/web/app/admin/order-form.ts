export class OrderDetails {

    constructor(public orderValues: Array<Order>) {
    }

}

export class Order {

    constructor(public key: string,
                public values: Array<string>) {
    }

}
