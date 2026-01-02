import { useState } from "react";
import {
  Search,
  Globe,
  Footprints,
  Sparkles,
  Brain,
  Flag,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { MarathonCard, type Marathon } from "./components/MarathonCard";
import { MarathonDetail } from "./components/MarathonDetail";
import { AIRecommendation } from "./components/AIRecommendation";
import { CustomSelect } from "./components/CustomSelect";

const marathons: Marathon[] = [
  {
    id: 1,
    name: "서울 국제 마라톤",
    date: "2024년 3월 17일",
    location: "서울",
    country: "대한민국",
    type: "domestic",
    distances: ["풀코스", "하프", "10km"],
    participants: "30,000명",
    difficulty: "easy",
    weather: {
      condition: "cloudy",
      temperature: "12°C",
      description: "구름 많음",
    },
    scenery: "🌸 도심 속 봄꽃 러닝",
    price: "50,000원",
    details: {
      courseDescription:
        "한강을 따라 달리는 아름다운 코스로, 여의도와 반포 지역을 지나며 봄꽃을 감상할 수 있습니다. 평탄한 코스로 초보자도 부담 없이 도전할 수 있으며, 서울의 랜드마크를 구경하며 달리는 특별한 경험을 선사합니다.",
      elevation: "총 상승 50m (거의 평탄)",
      services: [
        "완주 메달",
        "기록증",
        "완주 티셔츠",
        "간식 박스",
        "물/이온음료",
        "의료 지원",
      ],
      deadline: "2024��� 3월 10일",
      website: "www.seoul-marathon.com",
      startTime: "오전 8:00",
      parking: "여의도공원 주차장 이용 가능 (선착순)",
    },
  },
  {
    id: 2,
    name: "도쿄 마라톤",
    date: "2024년 3월 3일",
    location: "도쿄",
    country: "일본",
    type: "international",
    distances: ["풀코스", "10km"],
    participants: "35,000명",
    difficulty: "medium",
    weather: {
      condition: "sunny",
      temperature: "10°C",
      description: "맑고 쾌적",
    },
    scenery: "🗼 도쿄타워 뷰 코스",
    price: "¥16,200",
    details: {
      courseDescription:
        "도쿄의 심장을 가로지르는 세계 6대 마라톤 중 하나! 신주쿠, 아사쿠사, 도쿄타워를 지나며 일본의 전통과 현대가 조화를 이룬 풍경을 만끽할 수 있습니다. 응원 인파가 많아 끝까지 힘을 낼 수 있어요!",
      elevation: "총 상승 120m (완만한 언덕)",
      services: [
        "완주 메달",
        "피니셔 타월",
        "온센 할인권",
        "도시락",
        "음료수",
        "구급 지원",
      ],
      deadline: "2024년 2월 20일",
      website: "www.marathon.tokyo",
      startTime: "오전 9:10",
      parking: "대중교통 이용 권장 (주차 불가)",
    },
  },
  {
    id: 3,
    name: "제주 벚꽃 마라톤",
    date: "2024년 4월 7일",
    location: "제주도",
    country: "대한민국",
    type: "domestic",
    distances: ["풀코", "하프", "10km", "5km"],
    participants: "15,000명",
    difficulty: "medium",
    weather: {
      condition: "sunny",
      temperature: "16°C",
      description: "완벽한 날씨",
    },
    scenery: "🌸 벚꽃 터널 질주",
    price: "45,000원",
    details: {
      courseDescription:
        "제주 전농로 벚꽃길을 따라 달리는 환상적인 코스! 만개한 벚꽃 아래를 달리며 봄의 정취를 만끽할 수 있습니다. 코스 중간중간 바다 뷰도 감상할 수 있어 지루할 틈이 없어요. 사진 찍기 좋은 포토존이 많아 인생샷 각!",
      elevation: "총 상승 180m (중간 난이도)",
      services: [
        "완주 메달",
        "기록증",
        "한라봉 간식",
        "제주 흑돼지 도시락",
        "음료",
        "셔틀버스",
      ],
      deadline: "2024년 3월 31일",
      website: "www.jeju-cherry-marathon.com",
      startTime: "오전 8:30",
      parking: "무료 주차장 제공 (충분함)",
    },
  },
  {
    id: 4,
    name: "보스톤 마라톤",
    date: "2024년 4월 15일",
    location: "보스톤",
    country: "미국",
    type: "international",
    distances: ["풀코스"],
    participants: "30,000명",
    difficulty: "hard",
    weather: {
      condition: "rainy",
      temperature: "8°C",
      description: "비 올 수도",
    },
    scenery: "🏛️ 역사적인 레이스",
    price: "$205",
    details: {
      courseDescription:
        "세계에서 가장 오래된 마라톤! 1897년부터 시작된 전통의 대회로, 하트브레이크 힐을 포함한 도전적인 코스가 특징입니다. 자격 기록이 필요한 엘리트 대회로, 완주하면 평생 자랑할 수 있어요! 역사를 느끼며 달리는 특별한 경험!",
      elevation: "총 상승 220m (고난이도 언덕)",
      services: [
        "완주 메달",
        "재킷",
        "기록증",
        "에너지바",
        "스포츠 음료",
        "의료팀",
      ],
      deadline: "2024년 3월 15일",
      website: "www.baa.org",
      startTime: "오전 10:00",
      parking: "대중교통 이용 필수 (주차 제한)",
    },
  },
  {
    id: 5,
    name: "부산 국제 마라톤",
    date: "2024년 5월 12일",
    location: "부산",
    country: "대한민국",
    type: "domestic",
    distances: ["풀코스", "하프"],
    participants: "20,000명",
    difficulty: "easy",
    weather: {
      condition: "sunny",
      temperature: "20°C",
      description: "화창한 봄날",
    },
    scenery: "🌊 해운대 바다 뷰",
    price: "40,000원",
    details: {
      courseDescription:
        "해운대 해변을 따라 달리는 최고의 오션 뷰 코스! 광안대교, 이기대, 송정해변을 지나며 시원한 바닷바람을 맞으며 달릴 수 있어요. 완주 후엔 해운대에서 회 한 접시 어때요? 평탄한 코스로 기록 단축에도 좋아요!",
      elevation: "총 상승 40m (매우 평탄)",
      services: [
        "완주 메달",
        "기록증",
        "티셔츠",
        "밀면 쿠폰",
        "음료",
        "온천 할인권",
      ],
      deadline: "2024년 5월 5일",
      website: "www.busan-marathon.com",
      startTime: "오전 7:30",
      parking: "해운대 공영주차장 (유료)",
    },
  },
  {
    id: 6,
    name: "런던 마라톤",
    date: "2024년 4월 21일",
    location: "런던",
    country: "영국",
    type: "international",
    distances: ["풀코스"],
    participants: "40,000명",
    difficulty: "medium",
    weather: {
      condition: "rainy",
      temperature: "11°C",
      description: "비 예상",
    },
    scenery: "🏰 빅벤 & 런던아이",
    price: "£49",
    details: {
      courseDescription:
        "템즈강을 따라 달리며 런던의 명소를 모두 볼 수 있는 환상적인 코스! 빅벤, 타워브릿지, 버킹엄 궁전을 지나며 영국의 역사와 문화를 온몸으로 느낄 수 있어요. 열정적인 응원과 함께 잊지 못할 추억을 만들어보세요!",
      elevation: "총 상승 60m (거의 평탄)",
      services: [
        "완주 메달",
        "기록증",
        "굿백",
        "에너지젤",
        "음료",
        "응급 처치",
      ],
      deadline: "2024년 4월 1일",
      website: "www.londonmarathon.com",
      startTime: "오전 10:00",
      parking: "지하철 이용 권장",
    },
  },
  {
    id: 7,
    name: "춘천 마라톤",
    date: "2024년 10월 20일",
    location: "춘천",
    country: "대한민국",
    type: "domestic",
    distances: ["풀코스", "하프", "10km"],
    participants: "12,000명",
    difficulty: "easy",
    weather: {
      condition: "cloudy",
      temperature: "14°C",
      description: "선선한 가을",
    },
    scenery: "🍂 단풍 물든 호반 길",
    price: "35,000원",
    details: {
      courseDescription:
        "의암호와 소양호를 따라 달리는 아름다운 호반 마라톤! 가을 단풍이 물든 풍경 속을 달리며 자연의 아름다움을 만끽할 수 있어요. 완주 후엔 춘천 닭갈비로 에너지 충전! 선선한 날씨로 기록 단축하기 좋은 대회입니다.",
      elevation: "총 상승 90m (완만함)",
      services: [
        "완주 메달",
        "기록증",
        "티셔츠",
        "막국수 쿠폰",
        "음료",
        "셔틀버스",
      ],
      deadline: "2024년 10월 13일",
      website: "www.chuncheon-marathon.com",
      startTime: "오전 9:00",
      parking: "무료 주차장 제공",
    },
  },
  {
    id: 8,
    name: "베를린 마라톤",
    date: "2024년 9월 29일",
    location: "베를린",
    country: "독일",
    type: "international",
    distances: ["풀코스"],
    participants: "45,000명",
    difficulty: "easy",
    weather: {
      condition: "sunny",
      temperature: "18°C",
      description: "완벽한 조건",
    },
    scenery: "🚪 브란덴부르크 문",
    price: "€150",
    details: {
      courseDescription:
        "세계 기록이 가장 많이 나온 고속 코스! 평탄하고 넓은 도로에서 자신의 한계에 도전해보세요. 브란덴부르크 문에서 피니시하는 감동적인 순간은 평생 잊지 못할 거예요. 완벽한 가을 날씨와 열정적인 응원이 함께합니다!",
      elevation: "총 상승 35m (초평탄 고속 코스)",
      services: ["완주 메달", "기록증", "타월", "프레첼", "맥주", "의료팀"],
      deadline: "2024년 9월 15일",
      website: "www.bmw-berlin-marathon.com",
      startTime: "오전 9:15",
      parking: "대중교통 이용 권장",
    },
  },
  {
    id: 9,
    name: "경주 벚꽃 마라톤",
    date: "2024년 4월 14일",
    location: "경주",
    country: "대한민국",
    type: "domestic",
    distances: ["풀코스", "하프", "10km", "5km"],
    participants: "18,000명",
    difficulty: "medium",
    weather: {
      condition: "sunny",
      temperature: "15°C",
      description: "벚꽃 만개",
    },
    scenery: "🏛️ 천년 고도의 향기",
    price: "40,000원",
    details: {
      courseDescription:
        "천년 고도 경주의 역사 유적지를 달리는 특별한 코스! 보문호, 첨성대, 불국사를 지나며 신라의 숨결을 느낄 수 있어요. 만개한 벚꽃과 역사 유적의 조화가 환상적이며, 타임머신을 타고 과거로 떠나는 듯한 기분을 느낄 수 있습니다.",
      elevation: "총 상승 150m (완만한 언덕)",
      services: [
        "완주 메달",
        "기록증",
        "티셔츠",
        "경주빵",
        "황남빵",
        "온천 할인권",
      ],
      deadline: "2024년 4월 7일",
      website: "www.gyeongju-marathon.com",
      startTime: "오전 8:00",
      parking: "보문단지 주차장 (무료)",
    },
  },
  {
    id: 10,
    name: "시카고 마라톤",
    date: "2024년 10월 13일",
    location: "시카고",
    country: "미국",
    type: "international",
    distances: ["풀코스"],
    participants: "45,000명",
    difficulty: "easy",
    weather: {
      condition: "cloudy",
      temperature: "13°C",
      description: "쾌적함",
    },
    scenery: "🏙️ 마천루 사이 달리기",
    price: "$230",
    details: {
      courseDescription:
        "시카고의 29개 지역을 관통하는 도심 투어 마라톤! 윌리스 타워를 비롯한 마천루 사이를 달리며 미국 대도시의 활력을 느낄 수 있어요. 평탄한 코스와 쾌적한 가 날씨로 자기 기록 경신하기 딱 좋습니다. 피자와 핫도그로 완주 축하!",
      elevation: "총 상승 45m (거의 평탄)",
      services: [
        "완주 메달",
        "기록증",
        "재킷",
        "피자 쿠폰",
        "음료",
        "의료 지원",
      ],
      deadline: "2024년 10월 1일",
      website: "www.chicagomarathon.com",
      startTime: "오전 7:30",
      parking: "대중교통 이용 권장",
    },
  },
  {
    id: 11,
    name: "대구 국제 마라톤",
    date: "2024년 4월 7일",
    location: "대구",
    country: "대한민국",
    type: "domestic",
    distances: ["풀코스", "하프", "10km"],
    participants: "25,000명",
    difficulty: "easy",
    weather: { condition: "sunny", temperature: "17°C", description: "화창" },
    scenery: "🌳 앞산 자락 러닝",
    price: "38,000원",
    details: {
      courseDescription:
        "앞산 자락을 따라 달리는 아름다운 녹색 코스! 두류공원을 출발해 대구의 주요 명소를 지나며 도시의 활력을 느낄 수 있어요. 봄꽃이 만개한 거리를 달리며 상쾌한 기분을 만끽하세요. 완주 후 동화사에서 힐링 타임!",
      elevation: "총 상승 70m (평탄)",
      services: [
        "완주 메달",
        "기록증",
        "티셔츠",
        "막창 쿠폰",
        "음료",
        "찜질방 할인권",
      ],
      deadline: "2024년 3월 31일",
      website: "www.daegu-marathon.com",
      startTime: "오전 8:00",
      parking: "두류공원 주차장 (무료)",
    },
  },
  {
    id: 12,
    name: "뉴욕 마라톤",
    date: "2024년 11월 3일",
    location: "뉴욕",
    country: "미국",
    type: "international",
    distances: ["풀코스"],
    participants: "50,000명",
    difficulty: "medium",
    weather: {
      condition: "cloudy",
      temperature: "10°C",
      description: "선선함",
    },
    scenery: "🗽 센트럴파크 피니시",
    price: "$295",
    details: {
      courseDescription:
        "세계 최대 규모의 마라톤! 5개 자치구를 모두 관통하며 뉴욕의 다양한 문화를 체험할 수 있어요. 베라자노 브릿지에서 시작해 센트럴파크에서 피니시하는 드라마틱한 코스! 200만 명의 응원 인파가 여러분을 환호합니다. 꿈의 대회!",
      elevation: "총 상승 150m (브릿지 구간)",
      services: ["완주 메달", "기록증", "폰초", "베이글", "음료", "의료팀"],
      deadline: "2024년 10월 20일",
      website: "www.nycmarathon.org",
      startTime: "오전 8:00",
      parking: "대중교통 필수",
    },
  },
];

// 날짜에서 월 추출 함수
function getMonth(dateStr: string): number {
  const match = dateStr.match(/(\d+)월/);
  return match ? parseInt(match[1]) : 0;
}

export default function App() {
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "domestic" | "international"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [distanceFilter, setDistanceFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [monthFilter, setMonthFilter] = useState<string>("all");
  const [selectedMarathon, setSelectedMarathon] = useState<Marathon | null>(
    null
  );
  const [showAIRecommendation, setShowAIRecommendation] = useState(false);

  const filteredMarathons = marathons.filter((marathon) => {
    const matchesFilter =
      selectedFilter === "all" || marathon.type === selectedFilter;
    const matchesSearch =
      marathon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      marathon.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      marathon.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistance =
      distanceFilter === "all" || marathon.distances.includes(distanceFilter);
    const matchesDifficulty =
      difficultyFilter === "all" || marathon.difficulty === difficultyFilter;
    const matchesMonth =
      monthFilter === "all" ||
      getMonth(marathon.date).toString() === monthFilter;

    return (
      matchesFilter &&
      matchesSearch &&
      matchesDistance &&
      matchesDifficulty &&
      matchesMonth
    );
  });

  const filterButtons = [
    { id: "all" as const, label: "전체", icon: Footprints },
    {
      id: "domestic" as const,
      label: "국내",
      icon: () => <span className="text-base">🇰🇷</span>,
    },
    { id: "international" as const, label: "해외", icon: Globe },
  ];

  const distanceButtons = [
    { id: "all", label: "전체" },
    { id: "풀코스", label: "풀코스" },
    { id: "하프", label: "하프" },
    { id: "10km", label: "10km" },
    { id: "5km", label: "5km" },
  ];

  const difficultyButtons = [
    { id: "all", label: "전체" },
    { id: "easy", label: "🌱 초급" },
    { id: "medium", label: "🔥 중급" },
    { id: "hard", label: "⚡ 고급" },
  ];

  const monthButtons = [
    { id: "all", label: "전체" },
    { id: "3", label: "3월" },
    { id: "4", label: "4월" },
    { id: "5", label: "5월" },
    { id: "9", label: "9월" },
    { id: "10", label: "10월" },
    { id: "11", label: "11월" },
  ];

  return (
    <div className="min-h-screen bg-blue-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
            <div className="bg-primary p-3 sm:p-4 rounded-3xl shadow-lg">
              <Footprints className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
          <h1 className="text-primary mb-2">마라톤 일정</h1>
          <p className="text-muted-foreground text-sm sm:text-base flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>전 세계 마라톤 대회를 찾아보세요</span>
            <Sparkles className="w-4 h-4" />
          </p>
        </div>

        {/* AI 추천 버튼 */}
        <div className="mb-4 sm:mb-6 flex justify-center">
          <button
            onClick={() => setShowAIRecommendation(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Brain className="w-5 h-5" />
            <span>AI가 추천하는 나만의 마라톤</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </div>

        {/* 통합 검색 & 필터 */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-4 sm:p-6 shadow-lg border-2 border-primary/10 mb-6">
          <div className="space-y-4">
            {/* 검색창 */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
              <input
                type="text"
                placeholder="어디로 달려볼까요? 🏃‍♂️"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 sm:pl-12 pr-4 py-3 sm:py-3.5 bg-white/80 border-2 border-primary/20 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm hover:shadow-md hover:bg-white"
              />
            </div>

            {/* 구분선 */}
            <div className="border-t border-primary/10"></div>

            {/* 지역 필터 */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs text-primary/70 min-w-[50px] font-medium">
                <Globe className="w-4 h-4" />
                <span>지역</span>
              </div>
              <div className="flex gap-2 flex-wrap flex-1">
                {filterButtons.map((button) => {
                  const Icon = button.icon;
                  return (
                    <button
                      key={button.id}
                      onClick={() => setSelectedFilter(button.id)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-300 text-xs font-medium shadow-sm ${
                        selectedFilter === button.id
                          ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-md scale-105"
                          : "bg-white/80 text-card-foreground hover:bg-white hover:shadow-md hover:scale-105"
                      }`}
                    >
                      {typeof Icon === "function" && Icon.name === undefined ? (
                        <Icon />
                      ) : typeof Icon === "function" ? (
                        <Icon className="w-3.5 h-3.5" />
                      ) : null}
                      <span>{button.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 코스, 난이도, 월 필터 */}
            <div className="flex items-start gap-2 sm:gap-3 flex-wrap text-xs">
              {/* 코스 */}
              <CustomSelect
                value={distanceFilter}
                onChange={setDistanceFilter}
                options={distanceButtons.map((button) => ({
                  value: button.id,
                  label: button.label,
                }))}
                icon={Flag}
                iconColor="text-cyan-500"
                placeholder="전체 코스"
              />

              {/* 난이도 */}
              <CustomSelect
                value={difficultyFilter}
                onChange={setDifficultyFilter}
                options={difficultyButtons.map((button) => ({
                  value: button.id,
                  label: button.label,
                }))}
                icon={TrendingUp}
                iconColor="text-purple-500"
                placeholder="전체 난이도"
              />

              {/* 월 */}
              <CustomSelect
                value={monthFilter}
                onChange={setMonthFilter}
                options={monthButtons.map((button) => ({
                  value: button.id,
                  label: button.label,
                }))}
                icon={Calendar}
                iconColor="text-orange-500"
                placeholder="전체 월"
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 sm:mb-6 text-center">
          <div className="inline-block bg-white px-6 py-2 rounded-full shadow-md border border-border">
            <p className="text-muted-foreground text-sm sm:text-base">
              총{" "}
              <span className="text-primary font-bold">
                {filteredMarathons.length}
              </span>
              개의 대회가 있습니다
            </p>
          </div>
        </div>

        {/* Marathon Grid */}
        {filteredMarathons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredMarathons.map((marathon) => (
              <MarathonCard
                key={marathon.id}
                marathon={marathon}
                onClick={() => setSelectedMarathon(marathon)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <div className="bg-white p-8 rounded-3xl inline-block mb-4 shadow-xl border-2 border-border">
              <Search className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto" />
            </div>
            <h3 className="text-muted-foreground mb-2">검색 결과가 없습니다</h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              다른 조건으로 시도해보세요 🔍
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center pb-8">
          <p className="text-muted-foreground text-xs sm:text-sm">
            🏃‍♀️ 완주를 향해 달려가세요! 🏃‍♂️
          </p>
        </div>
      </div>

      {/* Modals */}
      {selectedMarathon && (
        <MarathonDetail
          marathon={selectedMarathon}
          onClose={() => setSelectedMarathon(null)}
        />
      )}

      {showAIRecommendation && (
        <AIRecommendation
          marathons={marathons}
          onClose={() => setShowAIRecommendation(false)}
          onSelectMarathon={(marathon) => {
            setSelectedMarathon(marathon);
            setShowAIRecommendation(false);
          }}
        />
      )}
    </div>
  );
}
