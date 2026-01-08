import { apiGet, apiPost, apiPut, apiDelete } from '../lib/api';
import type { Marathon } from '../components/MarathonCard';

/**
 * 마라톤 목록 조회
 */
export async function getMarathons(params?: {
  type?: 'all' | 'domestic' | 'international';
  distance?: string;
  difficulty?: string;
  month?: string;
  search?: string;
}): Promise<Marathon[]> {
  const queryParams = new URLSearchParams();
  
  if (params?.type && params.type !== 'all') {
    queryParams.append('type', params.type);
  }
  if (params?.distance) {
    queryParams.append('distance', params.distance);
  }
  if (params?.difficulty) {
    queryParams.append('difficulty', params.difficulty);
  }
  if (params?.month) {
    queryParams.append('month', params.month);
  }
  if (params?.search) {
    queryParams.append('search', params.search);
  }

  const queryString = queryParams.toString();
  const endpoint = `/api/marathons${queryString ? `?${queryString}` : ''}`;
  
  return apiGet<Marathon[]>(endpoint);
}

/**
 * 마라톤 상세 조회
 */
export async function getMarathonById(id: number): Promise<Marathon> {
  return apiGet<Marathon>(`/api/marathons/${id}`);
}

/**
 * 마라톤 생성 (관리자용)
 */
export async function createMarathon(data: Partial<Marathon>): Promise<Marathon> {
  return apiPost<Marathon>('/api/marathons', data);
}

/**
 * 마라톤 수정 (관리자용)
 */
export async function updateMarathon(
  id: number,
  data: Partial<Marathon>
): Promise<Marathon> {
  return apiPut<Marathon>(`/api/marathons/${id}`, data);
}

/**
 * 마라톤 삭제 (관리자용)
 */
export async function deleteMarathon(id: number): Promise<void> {
  return apiDelete<void>(`/api/marathons/${id}`);
}

/**
 * AI 추천 마라톤 조회
 */
export async function getAIRecommendations(params: {
  experience: string;
  location: string;
  weather: string;
}): Promise<Marathon[]> {
  return apiPost<Marathon[]>('/api/marathons/ai-recommend', params);
}

