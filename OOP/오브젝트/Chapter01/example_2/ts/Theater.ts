import { TicketSeller } from './../../example_1/ts/TicketSeller';

export class Theater {
    private ticketSeller: TicketSeller;

    constructor(ticketSeller: TicketSeller) {
        this.ticketSeller = ticketSeller;
    }
}
