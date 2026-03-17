import { useState, useCallback } from 'react';
import testService from '../../services/testService';
import SosModal from './SosModal';
import {
  Activity,
  Brain,
  Cloud,
  Wind,
  Zap,
  Flame,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  RefreshCw,
  Flower2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* ── GAD-7 Questions ── */
const QUESTIONS: { id: number; question: string; icon: LucideIcon }[] = [
  { id: 1, question: 'Cảm thấy lo lắng, bồn chồn hoặc căng thẳng?', icon: Activity },
  { id: 2, question: 'Không thể dừng lại hoặc kiểm soát việc lo lắng?', icon: Brain },
  { id: 3, question: 'Lo lắng quá nhiều về những việc khác nhau?', icon: Cloud },
  { id: 4, question: 'Gặp khó khăn trong việc thư giãn?', icon: Wind },
  { id: 5, question: "Bồn chồn đến mức khó có thể ngồi yên?", icon: Zap },
  { id: 6, question: 'Trở nên dễ nổi cáu hoặc cáu kỉnh?', icon: Flame },
  { id: 7, question: 'Cảm thấy sợ hãi như thể có điều gì đó khủng khiếp sắp xảy ra?', icon: AlertCircle },
];

const ANSWER_OPTIONS = [
  { value: 0, label: 'Không bao giờ', description: '0 ngày' },
  { value: 1, label: 'Vài ngày', description: '1-6 ngày' },
  { value: 2, label: 'Hơn một nửa số ngày', description: '7+ ngày' },
  { value: 3, label: 'Hầu như mỗi ngày', description: 'Hầu hết các ngày' },
];

/* ── Score visualization mapping ── */
function getVisualsForRiskLevel(score: number) {
  if (score <= 4) {
    return {
      description: 'Mức độ lo âu của bạn có vẻ ở trong phạm vi lành mạnh. Hãy tiếp tục thực hành chăm sóc bản thân và chánh niệm.',
      bgColor: 'bg-nature-fresh',
      ringColor: 'bg-nature-fresh/20',
      levelDisplay: 'Lo âu tối thiểu'
    };
  } else if (score <= 9) {
    return {
      description: 'Bạn có thể đang trải qua sự lo âu nhẹ. Hãy thử các bài tập thở của chúng tôi và cân nhắc việc viết nhật ký tâm tình.',
      bgColor: 'bg-nature-balance',
      ringColor: 'bg-nature-balance/20',
      levelDisplay: 'Lo âu nhẹ'
    };
  } else if (score <= 14) {
    return {
      description: 'Kết quả của bạn cho thấy mức độ lo âu trung bình. Chúng tôi khuyên bạn nên khám phá các bài thiền có hướng dẫn và cân nhắc việc trao đổi với chuyên gia.',
      bgColor: 'bg-warmth-gentle',
      ringColor: 'bg-warmth-gentle/20',
      levelDisplay: 'Lo âu trung bình'
    };
  } else {
    return {
      description: 'Kết quả của bạn cho thấy mức độ lo âu đáng kể. Vui lòng cân nhắc việc tìm kiếm sự hỗ trợ từ chuyên gia sức khỏe tâm thần.',
      bgColor: 'bg-warmth-relaxing',
      ringColor: 'bg-warmth-relaxing/20',
      levelDisplay: 'Lo âu nặng'
    };
  }
}

/**
 * Quick Anxiety Check-In (GAD-7) — fully declarative React component.
 *
 * State:
 * - currentQuestion: index of the active question
 * - answers: array of selected values per question (undefined = unanswered)
 * - showResults: whether to show the results screen
 *
 * Zero imperative DOM manipulation. Everything updates via setState.
 */
export default function StressQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | undefined)[]>(
    new Array(QUESTIONS.length).fill(undefined),
  );
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSosModal, setShowSosModal] = useState(false);
  const [backendResult, setBackendResult] = useState<{ totalScore: number, riskLevel: string } | null>(null);

  const question = QUESTIONS[currentQuestion];
  const QuestionIcon = question.icon;
  const progress = (currentQuestion / QUESTIONS.length) * 100;
  const hasAnswer = answers[currentQuestion] !== undefined;
  const isLastQuestion = currentQuestion === QUESTIONS.length - 1;

  const selectAnswer = useCallback(
    (value: number) => {
      setAnswers((prev) => {
        const next = [...prev];
        next[currentQuestion] = value;
        return next;
      });
    },
    [currentQuestion],
  );

  const goNext = useCallback(async () => {
    if (!hasAnswer) return;
    if (isLastQuestion) {
      // Submit to backend
      setIsLoading(true);
      try {
        const rawAnswers = answers.map(a => a ?? 0);
        // By default, GAD-7
        const result = await testService.submitTest({ testType: 'GAD-7', answers: rawAnswers });
        setBackendResult(result);
        if (result.isSosTriggered) {
          setShowSosModal(true);
        }
        setShowResults(true);
      } catch (error) {
        console.error('Submission failed', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  }, [hasAnswer, isLastQuestion, answers]);

  const goPrev = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion]);

  const retake = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers(new Array(QUESTIONS.length).fill(undefined));
    setShowResults(false);
  }, []);

  /* ── Results Screen ── */
  if (showResults && backendResult) {
    const visuals = getVisualsForRiskLevel(backendResult.totalScore);
    return (
      <section
        className="py-16 md:py-24"
        id="stress-test"
        style={{
          background: 'linear-gradient(180deg, #FEFDE0 0%, #FBE0DE 50%, #F4F1EA 100%)',
        }}
      >
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-peace-trust bg-peace-trust/10 px-3 py-1 rounded-full mb-3">
              <BarChart3 className="w-3 h-3" /> Tự đánh giá
            </span>
            <h2 className="text-2xl md:text-3xl font-heading text-[#1A1A2E] mb-3">
              Kiểm tra lo âu nhanh
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-8 text-center">
            {/* Score visualization */}
            <div className={`w-20 h-20 rounded-full ${visuals.ringColor} flex items-center justify-center mx-auto mb-6`}>
              <div className={`w-12 h-12 rounded-full ${visuals.bgColor} flex items-center justify-center`}>
                <Activity className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="mb-6">
              <div className="text-5xl font-heading text-[#1A1A2E] mb-2">{backendResult.totalScore}</div>
              <div className="text-sm text-[#9CA3AF]">trên 21</div>
            </div>

            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${visuals.ringColor} font-medium mb-6 text-[#1A1A2E]`}>
              {visuals.levelDisplay}
            </div>

            <p className="text-[#4A5568] mb-8 max-w-md mx-auto">{visuals.description}</p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={retake}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#F3F4F6] text-[#1A1A2E] font-medium hover:bg-[#E5E7EB] cursor-pointer transition-colors duration-base border-none"
              >
                <RefreshCw className="w-5 h-5" /> Làm lại bài kiểm tra
              </button>
              <button className="calm-cta-btn cursor-pointer">
                <Flower2 className="w-5 h-5" /> Thử thiền định
              </button>
            </div>

            <p className="text-xs text-[#9CA3AF] mt-8 max-w-sm mx-auto">
              Đây là một công cụ sàng lọc, không phải chẩn đoán y khoa. Nếu bạn lo lắng về
              sức khỏe tâm thần của mình, vui lòng tham khảo ý kiến chuyên gia y tế.
            </p>
          </div>
        </div>
        <SosModal isOpen={showSosModal} onClose={() => setShowSosModal(false)} />
      </section>
    );
  }

  /* ── Quiz Screen ── */
  return (
    <section
      className="py-16 md:py-24"
      id="stress-test"
      style={{
        background: 'linear-gradient(180deg, #FEFDE0 0%, #FBE0DE 50%, #F4F1EA 100%)',
      }}
    >
      <div className="max-w-2xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-peace-trust bg-peace-trust/10 px-3 py-1 rounded-full mb-3">
            <BarChart3 className="w-3 h-3" /> Tự đánh giá
          </span>
          <h2 className="text-2xl md:text-3xl font-heading text-[#1A1A2E] mb-3">
            Kiểm tra lo âu nhanh
          </h2>
          <p className="text-[#4A5568]">
            Dựa trên thang đo GAD-7. Hãy trả lời trung thực về tình trạng của bạn trong 2 tuần qua.
          </p>
        </div>

        {/* Quiz card */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-8">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-[#4A5568] mb-2">
              <span>
                Câu hỏi {currentQuestion + 1} trên {QUESTIONS.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(to right, #FEFDE0, #FBE0DE)',
                }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="text-center mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{
                background:
                  'linear-gradient(135deg, rgba(254,253,224,0.5), rgba(251,224,222,0.5))',
              }}
            >
              <QuestionIcon className="w-8 h-8 text-peace-trust" />
            </div>
            <p className="text-xs text-[#9CA3AF] uppercase tracking-wide mb-2">
              Trong 2 tuần qua, bạn có thường xuyên bị làm phiền bởi:
            </p>
            <h3 className="text-xl md:text-2xl font-heading text-[#1A1A2E]">
              {question.question}
            </h3>
          </div>

          {/* Answer options — large clickable cards */}
          <div className="space-y-3 mb-8">
            {ANSWER_OPTIONS.map((opt) => {
              const isSelected = answers[currentQuestion] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => selectAnswer(opt.value)}
                  className={`
                    block w-full p-4 rounded-xl border-2 text-left
                    cursor-pointer transition-all duration-base
                    ${
                      isSelected
                        ? 'border-peace-trust bg-peace-trust/5 hover:translate-x-1'
                        : 'border-[#E5E7EB] bg-[#F9FAFB] hover:border-peace-serene hover:bg-peace-serene/5 hover:translate-x-1'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    {/* Radio indicator */}
                    <div
                      className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                        transition-all duration-base
                        ${
                          isSelected
                            ? 'border-peace-trust bg-peace-trust'
                            : 'border-[#D1D5DB] bg-white'
                        }
                      `}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <div>
                      <div className="font-medium text-[#1A1A2E]">{opt.label}</div>
                      <div className="text-sm text-[#9CA3AF]">{opt.description}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={goPrev}
              disabled={currentQuestion === 0}
              className={`
                inline-flex items-center gap-2 px-4 py-3 rounded-xl font-medium
                bg-transparent border-none cursor-pointer transition-all duration-base
                text-peace-trust hover:bg-nature-peaceful/50
                ${currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <ArrowLeft className="w-5 h-5" /> Quay lại
            </button>

            <button
              onClick={goNext}
              disabled={!hasAnswer || isLoading}
              className={`calm-cta-btn text-sm ${isLoading ? 'opacity-70 cursor-wait' : 'cursor-pointer'}`}
            >
              {isLoading ? (
                <>
                  Đang phân tích... <RefreshCw className="w-5 h-5 animate-spin" />
                </>
              ) : isLastQuestion ? (
                <>
                  Xem kết quả <BarChart3 className="w-5 h-5" />
                </>
              ) : (
                <>
                  Tiếp theo <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
