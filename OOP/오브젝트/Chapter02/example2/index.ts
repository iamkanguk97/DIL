import { Customer2 } from './Customer';
import { PeriodCondition } from './DiscountCondition/PeriodCondition';
import { SequenceCondition } from './DiscountCondition/SequenceCondition';
import { AmountDiscountPolicy } from './DiscountPolicy/AmountDiscountPolicy';
import { PercentDiscountPolicy } from './DiscountPolicy/PercentDiscountPolicy';
import { DayOfWeek } from './enum';
import { Money2 } from './Money';
import { Movie2 } from './Movie';
import { Screening2 } from './Screening';

function main() {
    /**
     * 영화 상영 정보 세팅
     * - avatar: 영화 아바타
     * - hereditary: 영화 유전
     */
    const avatar = new Movie2(
        '아바타',
        120,
        Money2.wons(10000),
        new AmountDiscountPolicy(
            Money2.wons(800),
            [
                new SequenceCondition(1),
                new PeriodCondition(DayOfWeek.MONDAY, new Date(), new Date())
            ]
        )
    );

    const avatar_screening1 = new Screening2(
        avatar,
        1,
        new Date()
    );
    const avatar_screening2 = new Screening2(
        avatar,
        1,
        new Date()
    );
    const avatar_screening3 = new Screening2(
        avatar,
        1,
        new Date()
    );

    const hereditary = new Movie2(
        '유전',
        140,
        Money2.wons(12000),
        new PercentDiscountPolicy(
            15,
            [
                new PeriodCondition(DayOfWeek.MONDAY, new Date(), new Date())
            ]
        )
    );

    const hereditary_screening1 = new Screening2(
        hereditary,
        1,
        new Date()
    );
    const hereditary_screening2 = new Screening2(
        hereditary,
        1,
        new Date()
    );
    const hereditary_screening3 = new Screening2(
        hereditary,
        1,
        new Date()
    );

    const customer1 = new Customer2('이강욱');
    const customer2 = new Customer2('이상운');
    const customer3 = new Customer2('백효석');

    /**
     * 예약 진행
     */
}

main();
