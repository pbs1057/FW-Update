import { ref } from 'vue';
import { getStats } from '../api/router';
import type { StatsData } from '../type/type';

/**
 * 대시보드 통계 데이터를 관리하는 컴포저블
 * - 통계 데이터 로딩
 * - 로딩 상태 관리
 * - 에러 처리
 */
export function useStats() {
  const stats = ref<StatsData>({
    total_user: 0,
    revenue: 0,
    active_project: 0
  });

  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchStats = async () => {
    try {
      loading.value = true;
      error.value = null;
      const data = await getStats<StatsData>();
      stats.value = data;
    } catch (err: any) {
      console.error('통계 데이터 불러오기 실패:', err);
      error.value = err.message || '통계를 불러오는데 실패했습니다';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const resetStats = () => {
    stats.value = {
      total_user: 0,
      revenue: 0,
      active_project: 0
    };
    error.value = null;
  };

  return {
    stats,
    loading,
    error,
    fetchStats,
    resetStats
  };
}
