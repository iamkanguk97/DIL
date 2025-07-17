import { DiscountCondition } from '../DiscountCondition/DiscountCondition';
import { Money2 } from '../Money';
import { Screening2 } from '../Screening';
import { DiscountPolicy } from './DiscountPolicy';

export class AmountDiscountPolicy extends DiscountPolicy {
    private discountAmount: Money2;

    constructor(discountAmount: Money2, conditions: DiscountCondition[]) {
        super(conditions);
        this.discountAmount = discountAmount;
    }

    protected getDiscountAmount(screening: Screening2): Money2 {
        return this.discountAmount;
    }
}
