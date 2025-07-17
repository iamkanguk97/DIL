import { DayOfWeek } from './../enum/index';
import { DiscountCondition } from './DiscountCondition';
import { Screening2 } from '../Screening';
import { DateUtil } from '../utils/date.util';

/**
 * <기간 조건>
 * - 상영 시작 시간이 특정한 기간 안에 포함되는지 여부 판단하여 할인 여부 결정
 */
export class PeriodCondition implements DiscountCondition {
    private dayOfWeek: DayOfWeek;
    private startTime: Date;
    private endTime: Date;

    constructor(dayOfWeek: DayOfWeek, startTime: Date, endTime: Date) {
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    isSatisfiedBy(screening: Screening2): boolean {
        return (
            DateUtil.fromJsDayOfWeek(screening.getWhenScreened().getDay()) === this.dayOfWeek &&
            this.startTime.getTime() <= screening.getWhenScreened().getTime() &&
            this.endTime.getTime() >= screening.getWhenScreened().getTime()
        );
    }
}
