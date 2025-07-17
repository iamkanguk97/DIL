import { Screening2 } from '../Screening';

export interface DiscountCondition {
    /** 상영이 할인이 가능한지 확인하는 메서드 구현체 */
    isSatisfiedBy(screening: Screening2): boolean;
}
