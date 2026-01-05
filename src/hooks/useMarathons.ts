import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMarathons,
  getMarathonById,
  createMarathon,
  updateMarathon,
  deleteMarathon,
  getAIRecommendations,
} from '../api/marathons';
import type { Marathon } from '../components/MarathonCard';

/**
 * Query Keys
 */
export const marathonKeys = {
  all: ['marathons'] as const,
  lists: () => [...marathonKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) =>
    [...marathonKeys.lists(), filters] as const,
  details: () => [...marathonKeys.all, 'detail'] as const,
  detail: (id: number) => [...marathonKeys.details(), id] as const,
};

/**
 * 마라톤 목록 조회 Hook
 */
export function useMarathons(params?: {
  type?: 'all' | 'domestic' | 'international';
  distance?: string;
  difficulty?: string;
  month?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: marathonKeys.list(params),
    queryFn: () => getMarathons(params),
    enabled: true, // 자동으로 쿼리 실행
  });
}

/**
 * 마라톤 상세 조회 Hook
 */
export function useMarathon(id: number) {
  return useQuery({
    queryKey: marathonKeys.detail(id),
    queryFn: () => getMarathonById(id),
    enabled: !!id, // id가 있을 때만 실행
  });
}

/**
 * 마라톤 생성 Mutation Hook
 */
export function useCreateMarathon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMarathon,
    onSuccess: () => {
      // 마라톤 목록 캐시 무효화하여 자동으로 새로고침
      queryClient.invalidateQueries({ queryKey: marathonKeys.lists() });
    },
  });
}

/**
 * 마라톤 수정 Mutation Hook
 */
export function useUpdateMarathon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Marathon> }) =>
      updateMarathon(id, data),
    onSuccess: (data, variables) => {
      // 해당 마라톤 상세 캐시 업데이트
      queryClient.setQueryData(marathonKeys.detail(variables.id), data);
      // 목록 캐시도 무효화
      queryClient.invalidateQueries({ queryKey: marathonKeys.lists() });
    },
  });
}

/**
 * 마라톤 삭제 Mutation Hook
 */
export function useDeleteMarathon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMarathon,
    onSuccess: () => {
      // 마라톤 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: marathonKeys.lists() });
    },
  });
}

/**
 * AI 추천 마라톤 조회 Hook
 */
export function useAIRecommendations(params: {
  experience: string;
  location: string;
  weather: string;
}) {
  return useQuery({
    queryKey: ['marathons', 'ai-recommend', params],
    queryFn: () => getAIRecommendations(params),
    enabled: !!(
      params.experience && params.location && params.weather
    ), // 모든 파라미터가 있을 때만 실행
  });
}

