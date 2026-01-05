import { QueryClient } from '@tanstack/react-query';

/**
 * React Query QueryClient 설정
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 기본 설정
      staleTime: 1000 * 60 * 5, // 5분
      gcTime: 1000 * 60 * 10, // 10분 (이전 cacheTime)
      retry: 1, // 실패 시 1번 재시도
      refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
      refetchOnMount: true, // 컴포넌트 마운트 시 refetch
    },
    mutations: {
      // Mutation 기본 설정
      retry: 1,
    },
  },
});

