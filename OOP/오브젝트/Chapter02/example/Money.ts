export class Money {
    private amount: number;

    // 0원 정적 객체 생성
    static ZERO = Money.wons(0);

    constructor(amount: number) {
        this.amount = amount;
    }

    /**
     * 원화 생성 메서드
     */
    static wons(amount: number): Money {
        return new Money(amount);
    }

    /**
     * 더하기 메서드
     */
    plus(amount: Money): Money {
        return new Money(this.amount + amount.amount);
    }

    /**
     * 빼기 메서드
     */
    minus(amount: Money) {
        return new Money(this.amount - amount.amount);
    }

    /**
     * 곱하기 메서드
     */
    times(percent: number) {
        return new Money(this.amount * percent);
    }

    /**
     * 비교 메서드 (작은지 여부)
     */
    isLessThan(other: Money) {
        return this.amount < other.amount;
    }

    /**
     * 비교 메서드 (크거나 같은지 여부)
     */
    isGreaterThanOrEqual(other: Money) {
        return this.amount >= other.amount;
    }
}
