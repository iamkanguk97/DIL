import { SequenceCondition } from './DiscountCondition/SequenceCondition';
import { AmountDiscountPolicy } from './DiscountPolicy/AmountDiscountPolicy';
import { Money2 } from './Money';
import { Movie2 } from './Movie';

function main() {
    const avatar = new Movie2(
        '아바타',
        120,
        Money2.wons(10000),
        new AmountDiscountPolicy(Money2.wons(800), [new SequenceCondition(1)])
    );
}

main();
