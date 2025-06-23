import { Ticket } from './Ticket';
import { Invitation } from './Invitation';

export class Bag {
    private amount: number;
    private invitation: Invitation | null;
    private ticket: Ticket | null;

    constructor(amount: number, invitation?: Invitation | null) {
        this.amount = amount;
        this.invitation = invitation ?? null;
    }

    public hasInvitation(): boolean {
        return this.invitation !== null;
    }

    public hasTicket(): boolean {
        return this.ticket !== null;
    }

    public minusAmount(amount: number) {
        this.amount -= amount;
    }

    public plusAmount(amount: number) {
        this.amount += amount;
    }
}
