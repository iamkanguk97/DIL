import { Screening2 } from './Screening';
import { Customer2 } from './Customer';
import { Money2 } from './Money';

/**
 * 예약 클래스
 */
export class Reservation {
    /**
     * - customer: 예약자
     * - screening: 상영
     * - fee: 예매 요금
     *  - 할인까지 모두 완료되어 결제된 최종 금액
     * - audienceCount: 관객수
     */
    private customer: Customer2;
    private screening: Screening2;
    private fee: Money2;
    private audienceCount: number;

    constructor(customer: Customer2, screening: Screening2, fee: Money2, audienceCount: number) {
        this.customer = customer;
        this.screening = screening;
        this.fee = fee;
        this.audienceCount = audienceCount;
    }
}
