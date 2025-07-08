import { Ticket } from './Ticket';
/**
 * 매표소 클래스
 * - 관람객에게 판매할 티켓
 * - 티켓의 판매 금액이 보관되어 있어야함
 * - 관람객이 현금 또는 초대권을 주면 매표소에서 요청에 맞게 티켓을 반환함
 */
export class TicketOffice {
    private amount: number;
    private storedTicketList: Ticket[];

    constructor(amount: number, storedTicketList: Ticket[]) {
        this.amount = amount;
        this.storedTicketList = storedTicketList;
    }

    public getTicket(): Ticket {
        const ticket = this.storedTicketList.pop();

        if (!ticket) {
            throw new Error('매표소에 남아있는 티켓이 없습니다!');
        }

        return ticket;
    }

    public plusAmount(amount: number) {
        this.amount += amount;
    }

    public minusAmount(amount: number) {
        this.amount -= amount;
    }
}
