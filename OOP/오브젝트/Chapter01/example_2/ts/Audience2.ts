import { Bag2 } from './Bag2';
import { Ticket2 } from './Ticket2';

export class Audience2 {
    private bag: Bag2;

    constructor(bag: Bag2) {
        this.bag = bag;
    }

    buy(ticket: Ticket2) {
        if (this.bag.hasInvitation()) {
            this.bag.setTicket(ticket);
            return 0;
        }

        this.bag.setTicket(ticket);
        this.bag.minusAmount(ticket.getFee());
        return ticket.getFee();
    }
}
