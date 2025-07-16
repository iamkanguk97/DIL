import { Screening2 } from './Screening';

export interface DiscountCondition {
    isSatisfiedBy(screening: Screening2): boolean;
}
