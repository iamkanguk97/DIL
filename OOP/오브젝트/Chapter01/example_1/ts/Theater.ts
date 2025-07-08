import { Audience } from './Audience';
import { TicketSeller } from './TicketSeller';

export class Theater {
    private ticketSeller: TicketSeller;

    constructor(ticketSeller: TicketSeller) {
        this.ticketSeller = ticketSeller;
    }

    /**
     * <초대권이 있는 경우>
     * - 교환해줄 ticket을 매표소에서 받아옴
     * - 관람객의 가방에 티켓을 넣어줌
     *
     * <초대권이 없는 경우>
     * - 교환해줄 ticket을 매표소에서 받아옴
     * - 관람객이 보유하고 있는 현금 차감
     * - 티켓가격을 매표소 매출에 추가
     * - 관람객의 가방에 티켓을 넣어줌
     */
    public enter(audience: Audience) {
        if (audience.getBag().hasInvitation()) {
            const ticket = this.ticketSeller.getTicketOffice().getTicket();
            audience.getBag().setTicket(ticket);
        } else {
            const ticket = this.ticketSeller.getTicketOffice().getTicket();
            audience.getBag().minusAmount(ticket.getFee());
            this.ticketSeller.getTicketOffice().plusAmount(ticket.getFee());
            audience.getBag().setTicket(ticket);
        }
    }
}
