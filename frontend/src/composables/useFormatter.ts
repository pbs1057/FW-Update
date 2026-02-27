export function useFormatter() {
  // 금액 포맷 (₩10,000)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(value);
  };

  // 일반 숫자 포맷 (10,000)
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('ko-KR').format(value);
  };

  // 상대 날짜 포맷 (방금 전, 5분 전...)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return '방금 전';
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}일 전`;

    return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
  };

  return { formatCurrency, formatNumber, formatDate };
}