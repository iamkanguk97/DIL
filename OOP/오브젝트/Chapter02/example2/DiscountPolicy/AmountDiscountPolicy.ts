import { DiscountCondition } from '../DiscountCondition/DiscountCondition';
import { Money2 } from '../Money';
import { DefaultDiscountPolicy } from './DefaultDiscountPolicy';

export class AmountDiscountPolicy extends DefaultDiscountPolicy {
    private discountAmount: Money2;

    constructor(discountAmount: Money2, conditions: DiscountCondition[]) {
        super(conditions);
        this.discountAmount = discountAmount;
    }

    // TODO: 해당 부분은 screening이 필요하지 않음. 하지만 추상 클래스에서는 screening을 받도록 되어있음. 그래도 정의를 해놓는건지?
    // 그냥 DiscountPolicy의 getDiscountAmount 부분에서 받는 인자인 screening을 optional로 하면 되는거 아닌지?
    // 구조적 타이핑으로 인해 지원됨.
    protected getDiscountAmount(): Money2 {
        return this.discountAmount;
    }
}
