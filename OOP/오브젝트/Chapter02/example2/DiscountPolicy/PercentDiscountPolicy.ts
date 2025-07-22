import { DiscountCondition } from '../DiscountCondition/DiscountCondition';
import { Money2 } from '../Money';
import { Screening2 } from '../Screening';
import { DefaultDiscountPolicy } from './DefaultDiscountPolicy';

export class PercentDiscountPolicy extends DefaultDiscountPolicy {
    private percent: number;

    /**
     * Java에서는 퍼센테이지를 double, float과 같은 타입으로 표기가 가능함.
     * 그런데 TS에서는 double/float을 나누지 않고 number로 통일함.
     *
     * 이 부분은 책에서 나온 Money와 관련이 있을 것 같음.
     * 만약 Money와 같이 구체화된 타입을 정의하지 않는다면 변수명이 굉장히 중요할 것 같음.
     */
    constructor(percent: number, conditions: DiscountCondition[]) {
        super(conditions);
        this.percent = percent;
    }

    protected getDiscountAmount(screening: Screening2): Money2 {
        return screening.getMovieFee().times(this.percent);
    }
}
