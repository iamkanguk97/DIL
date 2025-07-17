import { Screening2 } from './Screening';
import { DiscountPolicy } from './DiscountPolicy/DiscountPolicy';
import { Money2 } from './Money';

export class Movie2 {
    /**
     * title: 영화제목
     * runningTime: 상영시간
     * fee: 가격정보 (영화의 기본 요금)
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
     * 할인 정책까지 더함
     *
     * 즉, 영화의 기본 요금에서 할인 금액을 뺀 금액을 반환함
     */
    // TODO: 할인까지 적용된 금액을 반환하는 것이 Movie에서 하는게 맞을까?
    calculateMovieFee(screening: Screening2): Money2 {
        return this.fee.minus(this.discountPolicy.calculateDiscountAmount(screening));
    }
}
