import { Screening2 } from './Screening';
import { DiscountPolicy } from './DiscountPolicy';
import { Money2 } from './Money';

export class Movie2 {
    /**
     * title: 영화제목
     * runningTime: 상영시간
     * fee: 가격정보
     * discountPolicy: 할인정책
     */
    private title: string;
    private runningTime: number;
    private fee: Money2;
    private discountPolicy: DiscountPolicy;

    constructor(title: string, runningTime: number, fee: Money2, discountPolicy: DiscountPolicy) {
        this.title = title;
        this.runningTime = runningTime;
        this.fee = fee;
        this.discountPolicy = discountPolicy;
    }

    /**
     * 영화 기본요금 반환 메서드
     */
    getFee(): Money2 {
        return this.fee;
    }

    /**
     * 1인당 예매 요금 계산 메서드
     */
    // TODO: 왜 screening을 인자로 받는건지? -> 혹시 할인정책 같은거 때문에?
    calculateMovieFee(screening: Screening2): Money2 {
        return this.fee
            .minus
            // this.discountPolicy.calculateDiscountAmount(screening)
            ();
    }
}
