/**
 * 2-5)
 * - play 변수를 제거하면서 로컬 유효범위의 변수가 하나 줄어서 적립 포인트 계산 부분을 추출하기가 쉬워졌습니다.
 * - volumeCredits를 구하는 부분도 함수를 새로 추출해서 관리했습니다.
 */

const fs = require('fs');

/**
 * 공연료 청구서를 출력하는 함수
 * @param {Object} invoice 공연료 청구서
 * @param {Object} plays 공연 정보
 */
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  // Intl: JavaScript의 국제화(Internationalization) API
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;

  /**
   * 해당 공연의 playID를 추출해서 plays 객체에서 공연 정보를 추출하는 함수
   * @param {Object} performance 공연 정보
   * @returns {Object} 공연 정보
   */
  function playFor(performance) {
    return plays[performance.playID];
  }

  /**
   * 회극/비극에 따라 amount 계산하는 함수
   * @param {Object} performance 기본 공연 정보에 대한 정보
   * @param {Object} play 기본 공연 정보
   * @returns {number} 공연 요금
   */
  function amountFor(performance) {
    let result = 0;

    switch (
      playFor(performance).type // 변수 인라인
    ) {
      case 'tragedy': // 비극
        result = 40000;
        if (performance.audience > 30) {
          result += 1000 * (performance.audience - 30);
        }
        break;
      case 'comedy': // 희극
        result = 30000;
        if (performance.audience > 20) {
          result += 10000 + 500 * (performance.audience - 20);
        }
        result += 300 * performance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${playFor(performance).type}`);
    }

    return result;
  }

  /**
   * 회극/비극에 따라 volumeCredits 계산하는 함수
   * @param {Object} performance 기본 공연 정보에 대한 정보
   */
  function volumeCreditsFor(performance) {
    let result = 0;

    result += Math.max(performance.audience - 30, 0);
    if (playFor(performance).type === 'comedy') {
      result += Math.floor(performance.audience / 5);
    }

    return result;
  }

  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf);

    result += `${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += amountFor(perf);
  }

  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}

// Main
const plays = JSON.parse(fs.readFileSync('../data/plays.json', 'utf8'));
const invoices = JSON.parse(fs.readFileSync('../data/invoices.json', 'utf8'));

console.log(statement(invoices[0], plays));
