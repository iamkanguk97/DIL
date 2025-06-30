/**
 * 2-1) switch 내에 포함된 로직 분리하기
 */

const fs = require('fs');

/**
 * 회극/비극에 따라 amount 계산하는 함수
 * @param {Object} perf 기본 공연 정보에 대한 정보
 * @param {Object} play 기본 공연 정보
 * @returns {number} 공연 요금
 */
function amountFor(perf, play) {
  let thisAmount = 0;

  switch (play.type) {
    case 'tragedy': // 비극
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case 'comedy': // 희극
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;
    default:
      throw new Error(`알 수 없는 장르: ${play.type}`);
  }

  return thisAmount;
}

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

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = amountFor(perf, play); // 해당 부분 별도 함수를 사용해서 값 추출!

    volumeCredits += Math.max(perf.audience - 30, 0); // 포인트 적립
    if (play.type === 'comedy') volumeCredits += Math.floor(perf.audience / 5); // 희극 관객 5명마다 추가포인트 지급

    result += `${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }

  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}

// Main
const plays = JSON.parse(fs.readFileSync('../data/plays.json', 'utf8'));
const invoices = JSON.parse(fs.readFileSync('../data/invoices.json', 'utf8'));

console.log(statement(invoices[0], plays));
