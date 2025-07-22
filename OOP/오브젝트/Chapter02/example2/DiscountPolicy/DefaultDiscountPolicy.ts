import { DiscountCondition } from '../DiscountCondition/DiscountCondition';
import { Money2 } from '../Money';
import { Screening2 } from '../Screening';
import { DiscountPolicy } from './DiscountPolicy';

export abstract class DefaultDiscountPolicy implements DiscountPolicy {
    // 하나의 할인 정책은 여러 개의 할인 조건을 가질 수 있음
    private conditions: DiscountCondition[];

    constructor(conditions?: DiscountCondition[]) {
        this.conditions = conditions ?? [];
    }

    /**
     * ===================
     * === 템플릿 메서드 ====
     * ===================
     */

    /**
     * 할인 가능 금액 계산 메서드
     */
    calculateDiscountAmount(screening: Screening2): Money2 {
        for (const condition of this.conditions) {
            if (condition.isSatisfiedBy(screening)) {
                return this.getDiscountAmount(screening);
            }
        }

        // 조건이 없는 경우 할인 요금으로 0원을 반환
        return Money2.ZERO;
    }

    /**
     * 할인 요금 계산 메서드
     */
    // protected abstract getDiscountAmount(screening: Screening2): Money2;
    protected abstract getDiscountAmount(screening?: Screening2): Money2;
}
