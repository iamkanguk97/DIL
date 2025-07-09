import { Audience2 } from './Audience2';
import { TicketSeller2 } from './TicketSeller2';

export class Theater2 {
  private ticketSeller: TicketSeller2;

  constructor(ticketSeller: TicketSeller2) {
    this.ticketSeller = ticketSeller;
  }

  public enter(audience: Audience2) {
    this.ticketSeller.sellTo(audience);
  }
}
