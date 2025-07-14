import { Audience2 } from './Audience2';
import { TicketOffice2 } from './TicketOffice2';

/**
 * 티켓 판매원
 */
export class TicketSeller2 {
  private ticketOffice: TicketOffice2;

  constructor(ticketOffice: TicketOffice2) {
    this.ticketOffice = ticketOffice;
  }

  sellTo(audience: Audience2) {
    this.ticketOffice.plusAmount(audience.buy(this.ticketOffice.getTicket()));
  }
}
