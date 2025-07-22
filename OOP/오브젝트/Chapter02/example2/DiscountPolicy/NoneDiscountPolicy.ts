import { Money2 } from '../Money';
import { DiscountPolicy } from './DiscountPolicy';

export class NoneDiscountPolicy implements DiscountPolicy {
    calculateDiscountAmount(): Money2 {
        return Money2.ZERO;
    }
}
