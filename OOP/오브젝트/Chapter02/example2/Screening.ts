import { Reservation } from './Reservation';
import { Customer2 } from './Customer';
import { Movie2 } from './Movie';
import { Money2 } from './Money';

/**
 * 상영 클래스
 * - 실제로 관객들이 영화를 관람하는 사건
 */
export class Screening2 {
    /**
     * movie: 상영되는 영화
     * sequence: 순번
     * whenScreened: 상영일시
     */
    private movie: Movie2;
    private sequence: number;
    private whenScreened: Date;

    constructor(movie: Movie2, sequence: number, whenScreened: Date) {
        this.movie = movie;
        this.sequence = sequence;
        this.whenScreened = whenScreened;
    }

    /**
     * 왜 Reserve 메서드를 Screening에 두는 것일까?
     * - 관객들은 영화가 아니라 상영이라는 객체를 예매하는 것
     * - 따라서 상영이라는 객체는 "예매" 라는 메세지(인터페이스)를 제공해야함
     */
    reserve(customer: Customer2, audienceCount: number): Reservation {
        return new Reservation(customer, this, this.calculateFee(audienceCount), audienceCount);
    }

    /**
     * 상영일시 반환 메서드
     */
    getWhenScreened(): Date {
        return this.whenScreened;
    }

    /**
     * 영화 기본요금 반환 메서드
     */
    getMovieFee(): Money2 {
        return this.movie.getFee();
    }

    /**
     * 순번 일치 여부 검사 메서드
     */
    isSequence(sequence: number): boolean {
        return this.sequence === sequence;
    }

    /**
     * 요금 계산 메서드
     */
    private calculateFee(audienceCount: number): Money2 {
        // return this.movie.getFee().times(audienceCount);
        return this.movie.calculateMovieFee(this).times(audienceCount);
    }
}
