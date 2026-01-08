import { useState } from "react";
import {
  Search,
  Globe,
  Footprints,
  Sparkles,
  Brain,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { MarathonCard } from "./components/MarathonCard";
import { MarathonDetail } from "./components/MarathonDetail";
import { AIRecommendation } from "./components/AIRecommendation";
import { CustomSelect } from "./components/CustomSelect";
import { useMarathons, useMarathon } from "./hooks/useMarathons";

export default function App() {
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "domestic" | "international"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [distanceFilter, setDistanceFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [monthFilter, setMonthFilter] = useState<string>("all");
  const [selectedMarathonId, setSelectedMarathonId] = useState<number | null>(
    null
  );
  const [showAIRecommendation, setShowAIRecommendation] = useState(false);

  // API로 마라톤 목록 조회 (필터링 포함)
  const {
    data: filteredMarathons = [],
    isLoading,
    error,
  } = useMarathons({
    type: selectedFilter,
    distance: distanceFilter !== "all" ? distanceFilter : undefined,
    difficulty: difficultyFilter !== "all" ? difficultyFilter : undefined,
    month: monthFilter !== "all" ? monthFilter : undefined,
    search: searchQuery || undefined,
  });

  // 선택된 마라톤 상세 조회
  const { data: selectedMarathon } = useMarathon(selectedMarathonId || 0);

  const filterButtons = [
    { id: "all" as const, label: "전체", icon: Footprints },
    {
      id: "domestic" as const,
      label: "국내",
      icon: () => <span className="text-base leading-5">🇰🇷</span>,
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
          <h1 className="text-primary mb-2 leading-7">마라톤 일정</h1>
          <p className="text-muted-foreground text-sm sm:text-base flex items-center justify-center gap-2 leading-6">
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
            <span className="leading-6">AI가 추천하는 나만의 마라톤</span>
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
                icon={Footprints}
                iconColor="text-primary"
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
                iconColor="text-yellow-500"
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
                iconColor="text-blue-500"
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
        {isLoading ? (
          <div className="text-center py-12 sm:py-16">
            <div className="bg-white p-8 rounded-3xl inline-block mb-4 shadow-xl border-2 border-border">
              <Footprints className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto animate-pulse" />
            </div>
            <h3 className="text-muted-foreground mb-2 leading-6">
              마라톤 정보를 불러오는 중...
            </h3>
          </div>
        ) : error ? (
          <div className="text-center py-12 sm:py-16">
            <div className="bg-white p-8 rounded-3xl inline-block mb-4 shadow-xl border-2 border-red-200">
              <Search className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto" />
            </div>
            <h3 className="text-red-600 mb-2 leading-6">
              데이터를 불러오는 중 오류가 발생했습니다
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-6">
              잠시 후 다시 시도해주세요
            </p>
          </div>
        ) : filteredMarathons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredMarathons.map((marathon) => (
              <MarathonCard
                key={marathon.id}
                marathon={marathon}
                onClick={() => setSelectedMarathonId(marathon.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <div className="bg-white p-8 rounded-3xl inline-block mb-4 shadow-xl border-2 border-border">
              <Search className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto" />
            </div>
            <h3 className="text-muted-foreground mb-2 leading-6">
              검색 결과가 없습니다
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-6">
              다른 조건으로 시도해보세요 🔍
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center pb-8">
          <p className="text-muted-foreground text-xs sm:text-sm leading-5">
            🏃‍♀️ 완주를 향해 달려가세요! 🏃‍♂️
          </p>
        </div>
      </div>

      {/* Modals */}
      {selectedMarathon && (
        <MarathonDetail
          marathon={selectedMarathon}
          onClose={() => setSelectedMarathonId(null)}
        />
      )}

      {showAIRecommendation && (
        <AIRecommendation
          marathons={filteredMarathons}
          onClose={() => setShowAIRecommendation(false)}
          onSelectMarathon={(marathon) => {
            setSelectedMarathonId(marathon.id);
            setShowAIRecommendation(false);
          }}
        />
      )}
    </div>
  );
}
