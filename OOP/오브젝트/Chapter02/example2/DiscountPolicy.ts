import { Screening2 } from './Screening';
import { DiscountCondition } from './DiscountCondition';
import { Money2 } from './Money';

/**
 * 할인 정책
 * - 금액 할인 정책(AmountDiscountPolicy)과 비율 할인 정책(PercentDiscountPolicy)으로 구분
 * - 두 클래스는 코드가 유사하고 할인 요금을 계산하는 방식만 조금 다름
 * - DiscountPolicy를 부모 클래스로, 나머지 할인정책 클래스는 자식 클래스로 구현할 것!
 * - DiscountPolicy 클래스의 인스턴스를 생성할 필요가 없어서 추상 클래스로 구현
 */
export abstract class DiscountPolicy {
    // 하나의 할인 정책은 여러 개의 할인 조건을 가질 수 있음
    private conditions: DiscountCondition[];

    constructor(conditions: DiscountCondition[]) {
        this.conditions = conditions;
    }

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
    abstract getDiscountAmount(screening: Screening2): Money2;
}
