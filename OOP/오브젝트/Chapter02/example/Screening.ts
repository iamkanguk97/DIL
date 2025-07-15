import { Movie } from './Movie';

/**
 * 상영 클래스
 */
export class Screening {
  private movie: Movie;
  private sequence: number;
  private whenScreened: Date;   // 상영일시

  /**
   * 상영일시 반환 메서드
   */
  getWhenScreened(): Date {
    return this.whenScreened;
  }

  // 순번일치여부 검사하는 메서드
  // 기본요금을 반환하는 메서드
}