import { useState, useEffect } from 'react';
import { Brain, ChevronRight, X } from 'lucide-react';
import type { Marathon } from './MarathonCard';

interface AIRecommendationProps {
  marathons: Marathon[];
  onClose: () => void;
  onSelectMarathon: (marathon: Marathon) => void;
}

export function AIRecommendation({ marathons, onClose, onSelectMarathon }: AIRecommendationProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{
    experience: string;
    location: string;
    weather: string;
  }>({
    experience: '',
    location: '',
    weather: ''
  });
  const [recommendations, setRecommendations] = useState<Marathon[]>([]);

  const questions = [
    {
      id: 'experience',
      question: '마라톤 경험이 어느 정도인가요?',
      options: [
        { value: 'beginner', label: '🌱 처음이에요!', emoji: '🌱' },
        { value: 'intermediate', label: '🔥 몇 번 완주했어요', emoji: '🔥' },
        { value: 'advanced', label: '⚡ 경력자입니다', emoji: '⚡' }
      ]
    },
    {
      id: 'location',
      question: '어디로 떠나고 싶으세요?',
      options: [
        { value: 'domestic', label: '🇰🇷 국내가 좋아요', emoji: '🇰🇷' },
        { value: 'international', label: '✈️ 해외로 가고 싶어요', emoji: '✈️' },
        { value: 'both', label: '🌏 상관없어요', emoji: '🌏' }
      ]
    },
    {
      id: 'weather',
      question: '선호하는 날씨가 있나요?',
      options: [
        { value: 'sunny', label: '☀️ 맑은 날씨', emoji: '☀️' },
        { value: 'cool', label: '☁️ 시원한 날씨', emoji: '☁️' },
        { value: 'any', label: '🌈 날씨는 상관없어요', emoji: '🌈' }
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      // AI 추천 로직
      setTimeout(() => {
        const filtered = marathons.filter((marathon) => {
          // 경험 레벨 매칭
          if (newAnswers.experience === 'beginner' && marathon.difficulty !== 'easy') return false;
          if (newAnswers.experience === 'advanced' && marathon.difficulty === 'easy') return false;
          
          // 위치 매칭
          if (newAnswers.location === 'domestic' && marathon.type !== 'domestic') return false;
          if (newAnswers.location === 'international' && marathon.type !== 'international') return false;
          
          // 날씨 매칭
          if (newAnswers.weather === 'sunny' && marathon.weather.condition !== 'sunny') return false;
          if (newAnswers.weather === 'cool' && (marathon.weather.condition === 'sunny')) return false;

          return true;
        });

        setRecommendations(filtered.slice(0, 3));
        setStep(questions.length);
      }, 500);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({
      experience: '',
      location: '',
      weather: ''
    });
    setRecommendations([]);
  };

  // 팝업이 열릴 때 body 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-shrink-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-t-3xl relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              <Brain className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold leading-7">AI 마라톤 추천</h2>
              <p className="text-white/90 text-sm leading-5">당신에게 딱 맞는 대회를 찾아드려요!</p>
            </div>
          </div>

          {/* Progress Bar */}
          {step < questions.length && (
            <div className="mt-4">
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-500"
                  style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-white/80 mt-1">{step + 1} / {questions.length}</p>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
          {step < questions.length ? (
            // 질문 단계
            <div className="space-y-4 animate-slideIn">
              <div className="text-center mb-6">
                <p className="text-2xl mb-2 leading-7">{questions[step].options[0].emoji}</p>
                <h3 className="text-xl font-bold text-gray-800 leading-7">{questions[step].question}</h3>
              </div>

              <div className="space-y-3">
                {questions[step].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(questions[step].id, option.value)}
                    className="w-full p-4 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-2 border-border hover:border-primary rounded-2xl transition-all duration-300 hover:scale-105 text-left font-medium flex items-center gap-3 group"
                  >
                    <span className="text-2xl group-hover:scale-125 transition-transform leading-7">{option.emoji}</span>
                    <span className="text-gray-800 leading-6">{option.label}</span>
                    <ChevronRight className="w-5 h-5 ml-auto text-gray-400 group-hover:text-primary" />
                  </button>
                ))}
              </div>
            </div>
          ) : recommendations.length > 0 ? (
            // 추천 결과
            <div className="space-y-4 animate-slideIn">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2 leading-7">당신을 위한 추천 대회</h3>
                <p className="text-muted-foreground text-sm leading-5">총 {recommendations.length}개의 대회를 찾았어요!</p>
              </div>

              <div className="space-y-3">
                {recommendations.map((marathon, index) => (
                  <div
                    key={marathon.id}
                    onClick={() => {
                      onSelectMarathon(marathon);
                      onClose();
                    }}
                    className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-primary/30 rounded-2xl hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02] group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors leading-6">{marathon.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2 leading-5">{marathon.scenery}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs bg-white px-2 py-1 rounded-full border border-border leading-5">
                            {marathon.date}
                          </span>
                          <span className="text-xs bg-white px-2 py-1 rounded-full border border-border leading-5">
                            {marathon.location}
                          </span>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium leading-5">
                            {marathon.price}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={resetQuiz}
                className="w-full mt-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-2xl font-medium text-gray-700 transition-colors"
              >
                다시 추천받기
              </button>
            </div>
          ) : (
            // 결과 없음
            <div className="text-center py-8 animate-slideIn">
              <div className="text-6xl mb-4 leading-none">😢</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 leading-7">조건에 맞는 대회가 없어요</h3>
              <p className="text-muted-foreground mb-6 leading-6">다른 조건으로 다시 시도해보세요!</p>
              <button
                onClick={resetQuiz}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-medium hover:shadow-lg transition-all"
              >
                다시 시작하기
              </button>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
