import { Money } from './Money';

export class Movie {
    /**
     * title: 영화제목
     * runningTime: 상영시간
     * fee: 가격정보
     */
    private title: string;
    private runningTime: number;
    private fee: number;

    /**
     * 영화 기본요금 반환 메서드
     */
    getFee(): Money {
        return Money.wons(this.fee);
    }

    /**
     * 1인당 예매 요금 계산 메서드
     */
    // TODO: 왜 screening을 인자로 받는건지? -> 혹시 할인정책 같은거 때문에?
    calculateMovieFee(): Money {
        // return screening.getMovieFee();
        return Money.wons(this.fee);
    }
}
