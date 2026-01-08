import { supabase } from './supabase.js';
import type { Marathon } from '../data/marathons.js';

/**
 * 데이터베이스에서 마라톤 목록 조회
 */
export async function getMarathonsFromDB(filters?: {
  type?: string;
  distance?: string;
  difficulty?: string;
  month?: number;
  search?: string;
}): Promise<Marathon[]> {
  try {
    let query = supabase.from('marathons').select('*');

    // 필터 적용
    if (filters?.type && filters.type !== 'all') {
      query = query.eq('type', filters.type);
    }

    if (filters?.difficulty && filters.difficulty !== 'all') {
      query = query.eq('difficulty', filters.difficulty);
    }

    if (filters?.search) {
      query = query.or(
        `name.ilike.%${filters.search}%,location.ilike.%${filters.search}%,country.ilike.%${filters.search}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    // 거리 필터와 월 필터는 클라이언트 사이드에서 처리
    // (배열 필드와 날짜 파싱이 필요하므로)
    let filtered = data || [];

    if (filters?.distance && filters.distance !== 'all') {
      filtered = filtered.filter((m: Marathon) =>
        m.distances.includes(filters.distance!)
      );
    }

    if (filters?.month) {
      filtered = filtered.filter((m: Marathon) => {
        const match = m.date.match(/(\d+)월/);
        const monthNum = match ? parseInt(match[1]) : 0;
        return monthNum === filters.month;
      });
    }

    return filtered as Marathon[];
  } catch (error) {
    console.error('Error fetching marathons from database:', error);
    throw error;
  }
}

/**
 * 데이터베이스에서 마라톤 상세 조회
 */
export async function getMarathonByIdFromDB(id: number): Promise<Marathon | null> {
  try {
    const { data, error } = await supabase
      .from('marathons')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // 레코드를 찾을 수 없음
        return null;
      }
      console.error('Database error:', error);
      throw error;
    }

    return data as Marathon;
  } catch (error) {
    console.error('Error fetching marathon from database:', error);
    throw error;
  }
}

