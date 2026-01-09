import type { Marathon } from '../components/MarathonCard';

/**
 * 실제 API 응답 타입 (DB 스키마 기반)
 */
interface ApiMarathonResponse {
  id?: string | number;
  title?: string;
  name?: string;
  event_date?: string;
  date?: string;
  location?: string;
  country?: string;
  courses?: string; // "Full, 10km, 5km" 형식의 문자열
  distances?: string[];
  difficulty?: string; // "중", "상", "하" 또는 "easy", "medium", "hard"
  fee?: string | number;
  price?: string;
  participant_limit?: number;
  participants?: string;
  review?: string | null;
  scenery?: string;
  weather?: {
    condition?: string;
    temperature?: string;
    description?: string;
  } | null;
  source_url?: string;
  website?: string;
  type?: 'domestic' | 'international';
  is_major?: boolean;
  details?: {
    courseDescription?: string;
    elevation?: string;
    services?: string[];
    deadline?: string;
    website?: string;
    startTime?: string;
    parking?: string;
  };
}

/**
 * 날짜 문자열을 포맷팅합니다 (예: "2026-01-21" → "2026년 1월 21일")
 */
function formatDate(dateStr: string | undefined | null): string {
  if (!dateStr) return '날짜 정보 없음';
  
  try {
    // ISO 형식 (2026-01-21)
    if (dateStr.includes('-') && dateStr.length === 10) {
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}년 ${month}월 ${day}일`;
      }
    }
    
    // 이미 포맷된 형식이면 그대로 반환
    return dateStr;
  } catch {
    return dateStr;
  }
}

/**
 * 난이도 한글을 영어로 변환합니다
 */
function normalizeDifficulty(difficulty: string | undefined | null): 'easy' | 'medium' | 'hard' {
  if (!difficulty) return 'medium';
  
  const lower = difficulty.toLowerCase();
  if (lower === '하' || lower === 'easy' || lower === '초급') return 'easy';
  if (lower === '상' || lower === 'hard' || lower === '고급') return 'hard';
  return 'medium';
}

/**
 * 코스 문자열을 배열로 변환합니다 (예: "Full, 10km, 5km" → ["Full", "10km", "5km"])
 */
function parseCourses(courses: string | string[] | undefined | null): string[] {
  if (!courses) return [];
  if (Array.isArray(courses)) return courses;
  
  return courses
    .split(',')
    .map(c => c.trim())
    .filter(c => c.length > 0);
}

/**
 * 국가 코드로 타입을 판단합니다
 */
function getTypeFromCountry(country: string | undefined | null): 'domestic' | 'international' {
  if (!country) return 'domestic';
  return country === 'KR' || country === '한국' ? 'domestic' : 'international';
}

/**
 * 숫자를 포맷팅합니다 (예: 30000 → "30,000명")
 */
function formatParticipants(count: number | string | undefined | null): string {
  if (count === null || count === undefined) return '정보 없음';
  const num = typeof count === 'string' ? parseInt(count, 10) : count;
  if (isNaN(num)) return String(count);
  return `${num.toLocaleString()}명`;
}

/**
 * 참가비를 포맷팅합니다 (예: "30000" → "30,000원")
 */
function formatPrice(fee: string | number | undefined | null): string {
  if (fee === null || fee === undefined) return '정보 없음';
  const num = typeof fee === 'string' ? parseInt(fee, 10) : fee;
  if (isNaN(num)) return String(fee);
  return `${num.toLocaleString()}원`;
}

/**
 * API 응답 데이터를 프론트엔드 형식으로 변환합니다
 */
export function normalizeMarathon(data: ApiMarathonResponse | Partial<Marathon> | null | undefined): Marathon {
  if (!data) {
    return getDefaultMarathon();
  }

  // API 응답 형식인지 확인 (title, event_date 등이 있으면 API 응답)
  const isApiResponse = 'title' in data || 'event_date' in data || 'courses' in data;
  
  if (isApiResponse) {
    const apiData = data as ApiMarathonResponse;
    
    return {
      id: typeof apiData.id === 'string' ? parseInt(apiData.id, 10) : (apiData.id ?? 0),
      name: apiData.title ?? apiData.name ?? '이름 없음',
      date: formatDate(apiData.event_date ?? apiData.date),
      location: apiData.location ?? '위치 정보 없음',
      country: apiData.country ?? '국가 정보 없음',
      type: apiData.type ?? getTypeFromCountry(apiData.country),
      distances: parseCourses(apiData.courses ?? apiData.distances),
      participants: formatParticipants(apiData.participant_limit ?? apiData.participants),
      difficulty: normalizeDifficulty(apiData.difficulty),
      weather: apiData.weather
        ? {
            condition: (apiData.weather.condition ?? 'sunny') as 'sunny' | 'cloudy' | 'rainy' | 'snowy',
            temperature: apiData.weather.temperature ?? '정보 없음',
            description: apiData.weather.description ?? '날씨 정보 없음',
          }
        : {
            condition: 'sunny' as const,
            temperature: '정보 없음',
            description: '날씨 정보 없음',
          },
      scenery: apiData.review ?? apiData.scenery ?? '풍경 정보 없음',
      price: formatPrice(apiData.fee ?? apiData.price),
      details: apiData.details
        ? {
            courseDescription: apiData.details.courseDescription ?? '코스 설명 없음',
            elevation: apiData.details.elevation ?? '정보 없음',
            services: Array.isArray(apiData.details.services) ? apiData.details.services : [],
            deadline: apiData.details.deadline ?? '정보 없음',
            website: apiData.details.website ?? apiData.source_url ?? '#',
            startTime: apiData.details.startTime ?? '정보 없음',
            parking: apiData.details.parking ?? '정보 없음',
          }
        : {
            courseDescription: '코스 설명 없음',
            elevation: '정보 없음',
            services: [],
            deadline: '정보 없음',
            website: apiData.source_url ?? '#',
            startTime: '정보 없음',
            parking: '정보 없음',
          },
    };
  }

  // 기존 형식 (이미 변환된 데이터)
  const marathonData = data as Partial<Marathon>;
  return {
    id: marathonData.id ?? 0,
    name: marathonData.name ?? '이름 없음',
    date: marathonData.date ?? '날짜 정보 없음',
    location: marathonData.location ?? '위치 정보 없음',
    country: marathonData.country ?? '국가 정보 없음',
    type: marathonData.type ?? 'domestic',
    distances: Array.isArray(marathonData.distances) ? marathonData.distances : [],
    participants: marathonData.participants ?? '정보 없음',
    difficulty: marathonData.difficulty ?? 'medium',
    weather: marathonData.weather
      ? {
          condition: marathonData.weather.condition ?? 'sunny',
          temperature: marathonData.weather.temperature ?? '정보 없음',
          description: marathonData.weather.description ?? '날씨 정보 없음',
        }
      : {
          condition: 'sunny' as const,
          temperature: '정보 없음',
          description: '날씨 정보 없음',
        },
    scenery: marathonData.scenery ?? '풍경 정보 없음',
    price: marathonData.price ?? '정보 없음',
    details: marathonData.details
      ? {
          courseDescription: marathonData.details.courseDescription ?? '코스 설명 없음',
          elevation: marathonData.details.elevation ?? '정보 없음',
          services: Array.isArray(marathonData.details.services) ? marathonData.details.services : [],
          deadline: marathonData.details.deadline ?? '정보 없음',
          website: marathonData.details.website ?? '#',
          startTime: marathonData.details.startTime ?? '정보 없음',
          parking: marathonData.details.parking ?? '정보 없음',
        }
      : {
          courseDescription: '코스 설명 없음',
          elevation: '정보 없음',
          services: [],
          deadline: '정보 없음',
          website: '#',
          startTime: '정보 없음',
          parking: '정보 없음',
        },
  };
}

/**
 * 기본 마라톤 객체를 반환합니다
 */
function getDefaultMarathon(): Marathon {
  return {
    id: 0,
    name: '이름 없음',
    date: '날짜 정보 없음',
    location: '위치 정보 없음',
    country: '국가 정보 없음',
    type: 'domestic',
    distances: [],
    participants: '정보 없음',
    difficulty: 'medium',
    weather: {
      condition: 'sunny',
      temperature: '정보 없음',
      description: '날씨 정보 없음',
    },
    scenery: '풍경 정보 없음',
    price: '정보 없음',
    details: {
      courseDescription: '코스 설명 없음',
      elevation: '정보 없음',
      services: [],
      deadline: '정보 없음',
      website: '#',
      startTime: '정보 없음',
      parking: '정보 없음',
    },
  };
}

/**
 * 마라톤 배열을 정규화합니다
 */
export function normalizeMarathons(
  data: (ApiMarathonResponse | Partial<Marathon> | null | undefined)[] | null | undefined
): Marathon[] {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map(normalizeMarathon).filter((marathon) => marathon.id > 0);
}

