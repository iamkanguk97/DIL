/**
 * 3)
 */

const fs = require('fs');

/**
 * 공연료 청구서를 출력하는 함수
 * @param {Object} invoice 공연료 청구서
 * @param {Object} plays 공연 정보
 */
function statement(invoice, plays) {
  const statementData = {};
  return renderPlainText(statementData, invoice, plays);
}

function renderPlainText(data, invoice, plays) {
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  for (let perf of invoice.performances) {
    result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    }석)\n`;
  }

  result += `총액: ${usd(totalAmount())}`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;
  return result;

  /**
   * 숫자를 통화 형식으로 변환하는 함수
   * @param {number} number 숫자
   * @returns {string} 통화 형식의 문자열
   */
  function usd(number) {
    // Intl: JavaScript의 국제화(Internationalization) API
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(number / 100);
  }

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

  function totalVolumeCredits() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  function totalAmount() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  }
}

// Main
const plays = JSON.parse(fs.readFileSync('../data/plays.json', 'utf8'));
const invoices = JSON.parse(fs.readFileSync('../data/invoices.json', 'utf8'));

console.log(statement(invoices[0], plays));
