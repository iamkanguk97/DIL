import { Ticket } from './Ticket';
import { Invitation } from './Invitation';

/**
 * 관람객이 소지품을 보관할 가방 클래스
 *
 * TODO: Ticket으로 변경하면 invitation을 null로 변경해줘야 하는데 해당 메서드는 어디에 위치?
 */
export class Bag {
    private amount: number; // 현금
    private invitation: Invitation | null; // 초대장
    private ticket: Ticket | null; // 티켓

    constructor(amount: number, invitation?: Invitation) {
        this.amount = amount;
        this.invitation = invitation ?? null;
        this.ticket = null; // 생성할 당시에는 ticket은 NULL이 맞음.
    }

    public hasInvitation(): boolean {
        return this.invitation !== null;
    }

    public hasTicket(): boolean {
        return this.ticket !== null;
    }

    // 초대권을 통해 티켓으로 교환할 때 사용하는 메서드
    public setTicket(ticket: Ticket) {
        this.ticket = ticket;
    }

    public plusAmount(amount: number) {
        this.amount += amount;
    }

    public minusAmount(amount: number) {
        this.amount -= amount;
    }
}
