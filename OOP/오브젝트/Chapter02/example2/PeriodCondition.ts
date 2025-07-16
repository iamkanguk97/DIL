import { DiscountCondition } from './DiscountCondition';
import { Screening2 } from './Screening';

/**
 * <기간 조건>
 * - 상영 시작 시간이 특정한 기간 안에 포함되는지 여부 판단하여 할인 여부 결정
 */
export class PeriodCondition implements DiscountCondition {
    private dayOfWeek: any;
    private startTime: Date;
    private endTime: Date;

    isSatisfiedBy(screening: Screening2): boolean {
        return true;
    }
}
