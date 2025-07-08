import { TicketOffice } from './TicketOffice';

/**
 * 티켓 판매원
 */
export class TicketSeller {
    private ticketOffice: TicketOffice;

    constructor(ticketOffice: TicketOffice) {
        this.ticketOffice = ticketOffice;
    }

    getTicketOffice(): TicketOffice {
        return this.ticketOffice;
    }
}
