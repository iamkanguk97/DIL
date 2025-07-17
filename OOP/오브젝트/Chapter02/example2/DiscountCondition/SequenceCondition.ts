import { DiscountCondition } from './DiscountCondition';
import { Screening2 } from '../Screening';

/**
 * <순번 조건>
 * - 상영 순번과 input 순번이 일치하는 경우 할인이 가능하다고 판단
 */
export class SequenceCondition implements DiscountCondition {
    private sequence: number;

    constructor(sequence: number) {
        this.sequence = sequence;
    }

    /**
     * 할인조건 만족 확인 메서드
     */
    isSatisfiedBy(screening: Screening2): boolean {
        return screening.isSequence(this.sequence);
    }
}
