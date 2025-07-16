export class Money2 {
    private amount: number;

    // 0원 정적 객체 생성
    static ZERO = Money2.wons(0);

    constructor(amount: number) {
        this.amount = amount;
    }

    /**
     * 원화 생성 메서드
     */
    static wons(amount: number): Money2 {
        return new Money2(amount);
    }

    /**
     * 더하기 메서드
     */
    plus(amount: Money2): Money2 {
        return new Money2(this.amount + amount.amount);
    }

    /**
     * 빼기 메서드
     */
    minus(amount: Money2) {
        return new Money2(this.amount - amount.amount);
    }

    /**
     * 곱하기 메서드
     */
    times(percent: number) {
        return new Money2(this.amount * percent);
    }

    /**
     * 비교 메서드 (작은지 여부)
     */
    isLessThan(other: Money2) {
        return this.amount < other.amount;
    }

    /**
     * 비교 메서드 (크거나 같은지 여부)
     */
    isGreaterThanOrEqual(other: Money2) {
        return this.amount >= other.amount;
    }
}
