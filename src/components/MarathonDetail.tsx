import { X, Calendar, MapPin, Users, Coins, Clock, Mountain, Gift, Medal, Sun, Cloud, CloudRain, Snowflake, ChevronRight, MapPinned, TrendingUp } from 'lucide-react';
import type { Marathon } from './MarathonCard';

interface MarathonDetailProps {
  marathon: Marathon;
  onClose: () => void;
}

export function MarathonDetail({ marathon, onClose }: MarathonDetailProps) {
  const weatherMessages = {
    sunny: { emoji: '☀️', message: '완벽한 러닝 날씨예요! 맑은 하늘 아래에서 기분 좋게 달려보세요!' },
    cloudy: { emoji: '☁️', message: '햇볕 걱정 없이 시원하게 달릴 수 있어요! 구름이 여러분의 친구가 되어줄 거예요!' },
    rainy: { emoji: '🌧️', message: '빗속 러닝은 특별한 추억이 될 거예요! 물 튀기며 달리는 재미를 느껴보세요!' },
    snowy: { emoji: '❄️', message: '설경 속 러닝, 평생 기억에 남을 경험이에요! 동화 속 주인공이 되어보세요!' }
  };

  const weatherIcons = {
    sunny: Sun,
    cloudy: Cloud,
    rainy: CloudRain,
    snowy: Snowflake
  };

  const WeatherIcon = weatherIcons[marathon.weather.condition];
  const weatherMsg = weatherMessages[marathon.weather.condition];

  const difficultyInfo = {
    easy: { 
      label: '🌱 초급자 추천', 
      color: 'bg-green-100 text-green-700 border-green-300',
      tip: '평탄한 코스로 초보자도 완주하기 좋아요!'
    },
    medium: { 
      label: '🔥 중급자 추천', 
      color: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      tip: '적당한 난이도로 기록 단축에 도전해보세요!'
    },
    hard: { 
      label: '⚡ 고급자 추천', 
      color: 'bg-red-100 text-red-700 border-red-300',
      tip: '도전적인 코스! 자신의 한계를 뛰어넘어보세요!'
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary to-blue-600 text-white p-6 rounded-t-3xl">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
              {marathon.type === 'international' ? '✈️ 해외' : '🇰🇷 국내'}
            </div>
            <div className={`px-3 py-1 rounded-full text-sm border ${difficultyInfo[marathon.difficulty].color}`}>
              {difficultyInfo[marathon.difficulty].label}
            </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">{marathon.name}</h2>
          <p className="text-white/90 text-sm sm:text-base italic">{marathon.scenery}</p>
        </div>

        <div className="p-6 space-y-6">
          {/* 날씨 메시지 */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white p-2 rounded-full">
                <WeatherIcon className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="font-bold text-blue-900">예상 날씨: {marathon.weather.temperature}</p>
                <p className="text-sm text-blue-700">{marathon.weather.description}</p>
              </div>
            </div>
            <p className="text-blue-800 text-sm leading-relaxed">
              {weatherMsg.emoji} {weatherMsg.message}
            </p>
          </div>

          {/* 난이도 팁 */}
          <div className={`rounded-2xl p-4 border-2 ${difficultyInfo[marathon.difficulty].color}`}>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5" />
              <p className="font-bold">난이도 정보</p>
            </div>
            <p className="text-sm">{difficultyInfo[marathon.difficulty].tip}</p>
          </div>

          {/* 기본 정보 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
              <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">대회 날짜</p>
                <p className="font-medium">{marathon.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
              <Clock className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">출발 시간</p>
                <p className="font-medium">{marathon.details.startTime}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">위치</p>
                <p className="font-medium">{marathon.location}, {marathon.country}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
              <Users className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">참가자</p>
                <p className="font-medium">{marathon.participants}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
              <Coins className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">참가비</p>
                <p className="font-medium text-primary">{marathon.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
              <Calendar className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">접수 마감</p>
                <p className="font-medium text-red-600">{marathon.details.deadline}</p>
              </div>
            </div>
          </div>

          {/* 코스 설명 */}
          <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <MapPinned className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-blue-900">코스 소개</h3>
            </div>
            <p className="text-blue-800 leading-relaxed mb-3">{marathon.details.courseDescription}</p>
            
            <div className="flex items-center gap-2 bg-white/50 p-3 rounded-xl">
              <Mountain className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-xs text-blue-700">코스 고도</p>
                <p className="font-medium text-blue-900">{marathon.details.elevation}</p>
              </div>
            </div>
          </div>

          {/* 제공 서비스 */}
          <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200">
            <div className="flex items-center gap-2 mb-3">
              <Gift className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-purple-900">제공 항목</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {marathon.details.services.map((service, index) => (
                <div key={index} className="flex items-center gap-2 bg-white p-2 rounded-xl">
                  <ChevronRight className="w-4 h-4 text-purple-500 flex-shrink-0" />
                  <span className="text-sm text-purple-800">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 부가 정보 */}
          <div className="bg-green-50 rounded-2xl p-4 border-2 border-green-200">
            <div className="flex items-center gap-2 mb-1">
              <MapPinned className="w-5 h-5 text-green-600" />
              <p className="font-bold">주차 안내</p>
            </div>
            <p className="text-sm text-green-800">{marathon.details.parking}</p>
          </div>

          {/* 종목 */}
          <div>
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Medal className="w-5 h-5 text-yellow-600" />
              <span>참가 종목</span>
            </h3>
            <div className="flex gap-2 flex-wrap">
              {marathon.distances.map((distance, index) => (
                <div key={index} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full font-medium text-sm shadow-md">
                  {distance}
                </div>
              ))}
            </div>
          </div>

          {/* 참가하기 버튼 */}
          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
            <span>지금 바로 참가하기!</span>
            <ChevronRight className="w-5 h-5" />
          </button>

          <p className="text-center text-xs text-muted-foreground">
            공식 웹사이트: <a href={marathon.details.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{marathon.details.website}</a>
          </p>
        </div>
      </div>
    </div>
  );
}