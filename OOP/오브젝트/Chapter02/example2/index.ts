import { Customer2 } from './Customer';
import { PeriodCondition } from './DiscountCondition/PeriodCondition';
import { SequenceCondition } from './DiscountCondition/SequenceCondition';
import { AmountDiscountPolicy } from './DiscountPolicy/AmountDiscountPolicy';
import { NoneDiscountPolicy } from './DiscountPolicy/NoneDiscountPolicy';
import { PercentDiscountPolicy } from './DiscountPolicy/PercentDiscountPolicy';
import { DayOfWeek } from './enum';
import { Money2 } from './Money';
import { Movie2 } from './Movie';
import { Screening2 } from './Screening';

function main(): void {
    /**
     * 영화 상영 정보 세팅
     * - avatar: 영화 아바타
     * - hereditary: 영화 유전
     */
    const avatar = new Movie2(
        '아바타', // 영화 제목
        120, // 러닝타임(분)
        Money2.wons(10000), // 기본가격
        new AmountDiscountPolicy( // 금액할인정책
            Money2.wons(800), // 800원
            [
                // 할인조건
                new SequenceCondition(1), // 순번 조건
                new PeriodCondition(
                    DayOfWeek.MONDAY,
                    new Date('2025-07-21 10:20'),
                    new Date('2025-07-22 10:30')
                )
            ]
        )
    );

    const avatar_screening1 = new Screening2(avatar, 1, new Date('2025-07-20 18:20'));
    const avatar_screening2 = new Screening2(avatar, 3, new Date('2025-07-21 10:25'));
    const avatar_screening3 = new Screening2(avatar, 19, new Date('2025-07-23 16:40'));

    const hereditary = new Movie2(
        '유전',
        140,
        Money2.wons(12000),
        new PercentDiscountPolicy(15, [
            new PeriodCondition(
                DayOfWeek.WEDNESDAY,
                new Date('2025-07-25 08:30'),
                new Date('2025-07-30 16:30')
            )
        ])
    );

    const hereditary_screening1 = new Screening2(hereditary, 1, new Date('2025-07-20 01:30'));
    const hereditary_screening2 = new Screening2(hereditary, 2, new Date('2025-07-22 09:30'));
    const hereditary_screening3 = new Screening2(hereditary, 3, new Date('2025-07-25 12:30'));

    const starwars = new Movie2('스타워즈', 135, Money2.wons(15000), new NoneDiscountPolicy());

    const starwars_screening1 = new Screening2(starwars, 1, new Date('2025-07-20 10:30'));
    const starwars_screening2 = new Screening2(starwars, 2, new Date('2025-07-22 10:30'));
    const starwars_screening3 = new Screening2(starwars, 3, new Date('2025-07-25 10:30'));

    // 손님 정의
    const customer1 = new Customer2('이강욱');
    const customer2 = new Customer2('이상운');
    const customer3 = new Customer2('백효석');

    // 예약 정의
    const avatar_reservation1 = avatar_screening1.reserve(customer1, 2);
    const avatar_reservation2 = avatar_screening2.reserve(customer2, 1);
    const hereditary_reservation1 = hereditary_screening3.reserve(customer3, 3);
    const starwars_reservation1 = starwars_screening2.reserve(customer1, 1);
}

main();
