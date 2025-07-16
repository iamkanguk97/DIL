import { Screening } from './Screening';
import { Customer } from './Customer';
import { Money } from './Money';

/**
 * 예약 클래스
 */
export class Reservation {
    /**
     * - customer: 예약자
     * - screening: 상영
     * - fee: 예매 요금
     * - audienceCount: 관객수
     */
    private customer: Customer;
    private screening: Screening;
    private fee: Money;
    private audienceCount: number;

    constructor(customer: Customer, screening: Screening, fee: Money, audienceCount: number) {
        this.customer = customer;
        this.screening = screening;
        this.fee = fee;
        this.audienceCount = audienceCount;
    }
}
