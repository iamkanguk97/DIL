import { DiscountCondition } from '../DiscountCondition/DiscountCondition';
import { Money2 } from '../Money';
import { Screening2 } from '../Screening';
import { DiscountPolicy } from './DiscountPolicy';

export class PercentDiscountPolicy extends DiscountPolicy {
    private percent: number;

    constructor(percent: number, conditions: DiscountCondition[]) {
        super(conditions);
        this.percent = percent;
    }

    protected getDiscountAmount(screening: Screening2): Money2 {
        return screening.getMovieFee().times(this.percent);
    }
}
