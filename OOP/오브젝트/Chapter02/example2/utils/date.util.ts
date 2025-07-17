import { DayOfWeek } from '../enum';

export namespace DateUtil {
    export function fromJsDayOfWeek(jsDayOfWeek: number) {
        // 일요일(0)은 DayOfWeek.SUNDAY(7)로, 나머지는 그대로 +1
        if (jsDayOfWeek === 0) {
            return DayOfWeek.SUNDAY;
        } else {
            return jsDayOfWeek as DayOfWeek; // 1-6은 DayOfWeek enum 값과 일치
        }
    }
}
