import { Calendar, MapPin, Flag, Users, Trophy, Sun, Cloud, CloudRain, Snowflake, Coins } from 'lucide-react';

export interface Marathon {
  id: number;
  name: string;
  date: string;
  location: string;
  country: string;
  type: 'domestic' | 'international';
  distances: string[];
  participants: string;
  difficulty: 'easy' | 'medium' | 'hard';
  weather: {
    condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy';
    temperature: string;
    description: string;
  };
  scenery: string;
  price: string;
  details: {
    courseDescription: string;
    elevation: string;
    services: string[];
    deadline: string;
    website: string;
    startTime: string;
    parking: string;
  };
}

interface MarathonCardProps {
  marathon: Marathon;
  onClick: () => void;
}

export function MarathonCard({ marathon, onClick }: MarathonCardProps) {
  // null/undefined 데이터에 대한 기본값 설정
  const safeMarathon = {
    id: marathon.id ?? 0,
    name: marathon.name ?? '이름 없음',
    date: marathon.date ?? '날짜 정보 없음',
    location: marathon.location ?? '위치 정보 없음',
    country: marathon.country ?? '국가 정보 없음',
    type: marathon.type ?? 'domestic',
    distances: marathon.distances ?? [],
    participants: marathon.participants ?? '정보 없음',
    difficulty: marathon.difficulty ?? 'medium',
    weather: marathon.weather ?? {
      condition: 'sunny' as const,
      temperature: '정보 없음',
      description: '날씨 정보 없음'
    },
    scenery: marathon.scenery ?? '풍경 정보 없음',
    price: marathon.price ?? '정보 없음',
    details: marathon.details ?? {
      courseDescription: '코스 설명 없음',
      elevation: '정보 없음',
      services: [],
      deadline: '정보 없음',
      website: '#',
      startTime: '정보 없음',
      parking: '정보 없음'
    }
  };

  const difficultyColors = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-red-100 text-red-700'
  };

  const difficultyText = {
    easy: '🌱 초급',
    medium: '🔥 중급',
    hard: '⚡ 고급'
  };

  const weatherIcons = {
    sunny: { icon: Sun, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    cloudy: { icon: Cloud, color: 'text-gray-500', bg: 'bg-gray-50' },
    rainy: { icon: CloudRain, color: 'text-blue-500', bg: 'bg-blue-50' },
    snowy: { icon: Snowflake, color: 'text-cyan-400', bg: 'bg-cyan-50' }
  };

  const weatherCondition = safeMarathon.weather.condition ?? 'sunny';
  const WeatherIcon = weatherIcons[weatherCondition]?.icon ?? Sun;
  const weatherColor = weatherIcons[weatherCondition]?.color ?? 'text-yellow-500';
  const weatherBg = weatherIcons[weatherCondition]?.bg ?? 'bg-yellow-50';

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-border hover:border-primary/40 hover:scale-[1.02] cursor-pointer group"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 flex-wrap">
            <div className={`px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm leading-5 flex items-center ${safeMarathon.type === 'international' ? 'bg-primary text-white' : 'bg-secondary text-secondary-foreground'}`}>
              {safeMarathon.type === 'international' ? '✈️ 해외' : '🇰🇷 국내'}
            </div>
            <div className={`px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${difficultyColors[safeMarathon.difficulty]}`}>
              {difficultyText[safeMarathon.difficulty]}
            </div>
          </div>
          <h3 className="text-card-foreground mb-1 text-base sm:text-lg leading-6">{safeMarathon.name}</h3>
          <p className="text-xs text-muted-foreground italic leading-5">{safeMarathon.scenery}</p>
        </div>
        <div className="bg-yellow-400 p-2 rounded-2xl shadow-md group-hover:rotate-12 transition-transform">
          <Trophy className="text-white w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>

      {/* Info Grid */}
      <div className="space-y-2 sm:space-y-2.5 mb-4">
        <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
          <span className="leading-6">{safeMarathon.date}</span>
        </div>
        
        <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
          <span className="leading-6">{safeMarathon.location}, {safeMarathon.country}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
            <span className="leading-6">{safeMarathon.participants} 참가</span>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium leading-5">{safeMarathon.price}</span>
          </div>
        </div>
      </div>

      {/* Weather Section */}
      <div className="mb-4">
        <div className={`${weatherBg} rounded-2xl p-4 border border-border/50 transition-all hover:scale-105`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-full">
                <WeatherIcon className={`w-5 h-5 ${weatherColor}`} />
              </div>
              <div>
                <p className="text-xs font-medium text-card-foreground mb-0.5 leading-5">예상 날씨</p>
                <p className={`text-sm font-bold ${weatherColor} leading-5`}>{safeMarathon.weather.temperature}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-right leading-5">{safeMarathon.weather.description}</p>
          </div>
        </div>
      </div>

      {/* Distance Tags */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
        {safeMarathon.distances && safeMarathon.distances.length > 0 ? (
          safeMarathon.distances.map((distance, index) => (
            <div key={index} className="flex items-center gap-1 bg-primary/10 border border-primary/20 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full hover:scale-110 transition-transform">
              <Flag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
              <span className="text-primary text-xs sm:text-sm font-medium leading-5">{distance}</span>
            </div>
          ))
        ) : (
          <span className="text-xs text-muted-foreground">종목 정보 없음</span>
        )}
      </div>
    </div>
  );
}
