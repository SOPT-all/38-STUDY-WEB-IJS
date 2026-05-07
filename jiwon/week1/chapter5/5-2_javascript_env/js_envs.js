// eslint, prettier 테스트
const test1 = () => {
  console.log('prettier테스트');
};

// 복잡한 함수로 테스트
/**
 * @param {Function} fn - 실행할 비동기 함수 (Promise 반환)
 * @param {Object} options - retries: 재시도 횟수, delay: 초기 대기 시간(ms)
 * @returns {Promise}
 */
const retryWithExponentialBackoff = async (fn, { retries = 3, delay = 1000 } = {}) => {
  try {
    // 함수 실행 시도
    return await fn();
  } catch (error) {
    // 잔여 재시도 횟수 확인
    if (retries <= 0) {
      console.error('최종 재시도 실패:');
      throw error;
    }

    // 지수 백오프 계산, 시도할 때마다 대기 시간을 2배씩 늘림 (jitter 추가 가능)
    console.warn(`남은 시도 횟수: ${retries}. ${delay}ms 후 재시도합니다...`);
    await new Promise((resolve) => setTimeout(resolve, delay));

    // 재귀 호출, 횟수를 차감하고 대기 시간을 늘려서 다시 실행
    return retryWithExponentialBackoff(fn, {
      retries: retries - 1,
      delay: delay * 2,
    });
  }
};

// --- 사용 예시 ---
const mockApiCall = (() => {
  let count = 0;
  return async () => {
    count++;
    if (count < 3) throw new Error('서버가 불안정합니다.');
    return '데이터 로드 성공!';
  };
})();

retryWithExponentialBackoff(mockApiCall, { retries: 3, delay: 500 }).then(console.log).catch(console.error);
