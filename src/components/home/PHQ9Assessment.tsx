import { useState, useCallback } from 'react';
import { 
  Activity, 
  Brain, 
  Cloud, 
  Zap, 
  Flame, 
  AlertCircle, 
  AlertTriangle,
  ArrowLeft, 
  ArrowRight, 
  BarChart3, 
  Check, 
  RefreshCw,
  Heart,
  User,
  Search,
  Users
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* ── PHQ-9 Questions ── */
const QUESTIONS: { id: number; question: string; icon: LucideIcon }[] = [
  { id: 1, question: "Ít quan tâm hoặc niềm vui khi làm mọi việc?", icon: Heart },
  { id: 2, question: "Cảm thấy chán nản, chán nản hay vô vọng?", icon: Cloud },
  { id: 3, question: "Rắc rối khi rơi vào giấc ngủ, hoặc ngủ quá nhiều?", icon: Zap },
  { id: 4, question: "Cảm thấy mệt mỏi hay có ít năng lượng?", icon: Activity },
  { id: 5, question: "Ăn kém hoặc ăn quá nhiều?", icon: Flame },
  { id: 6, question: "Cảm thấy tồi tệ về bản thân - hoặc rằng bạn là một thất bại hoặc đã làm bản thân hoặc gia đình thất vọng?", icon: User },
  { id: 7, question: "Rắc rối khi tập trung vào mọi thứ, chẳng hạn như đọc báo hoặc xem tivi?", icon: Search },
  { id: 8, question: "Di chuyển hoặc nói chậm đến mức người khác có thể nhận ra? Hoặc bồn chồn đến mức bạn phải di chuyển nhiều hơn bình thường?", icon: Brain },
  { id: 9, question: "Những suy nghĩ rằng tốt hơn hết bạn nên chết, hay những suy nghĩ làm tổn thương bản thân theo một cách nào đó?", icon: AlertCircle },
];

const ANSWER_OPTIONS = [
  { value: 0, label: "Không bao giờ", description: "0 ngày" },
  { value: 1, label: "Vài ngày 1 lần", description: "1-6 ngày" },
  { value: 2, label: "Khoảng 2 ngày 1 lần", description: "7+ ngày" },
  { value: 3, label: "Gần như mỗi ngày", description: "Hầu hết các ngày" },
];

const EXTRA_QUESTION = {
  text: "Những vấn đề này đã khiến việc làm việc, chăm sóc mọi thứ ở nhà hoặc hòa hợp với người khác khó khăn như thế nào?",
  options: ["Không hề khó", "Hơi khó", "Rất khó", "Cực kỳ khó khăn"],
};

export default function PHQ9Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | undefined)[]>(
    new Array(QUESTIONS.length).fill(undefined),
  );
  const [extraAnswer, setExtraAnswer] = useState<number | undefined>(undefined);
  const [showResults, setShowResults] = useState(false);

  const question = currentQuestion < QUESTIONS.length ? QUESTIONS[currentQuestion] : null;
  const QuestionIcon = question?.icon;
  const progress = (currentQuestion / (QUESTIONS.length + 1)) * 100;
  const hasAnswer = currentQuestion < QUESTIONS.length ? answers[currentQuestion] !== undefined : extraAnswer !== undefined;
  const isLastStep = currentQuestion === QUESTIONS.length; // Including the extra question

  const selectAnswer = useCallback((value: number) => {
    if (currentQuestion < QUESTIONS.length) {
      setAnswers((prev) => {
        const next = [...prev];
        next[currentQuestion] = value;
        return next;
      });
    } else {
      setExtraAnswer(value);
    }
  }, [currentQuestion]);

  const goNext = useCallback(() => {
    if (!hasAnswer) return;
    if (isLastStep) {
      setShowResults(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  }, [hasAnswer, isLastStep]);

  const goPrev = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion]);

  const retake = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers(new Array(QUESTIONS.length).fill(undefined));
    setExtraAnswer(undefined);
    setShowResults(false);
  }, []);

  const score = answers.reduce((acc: number, val) => acc + (val ?? 0), 0);
  const hasSuicidalThoughts = answers[8] !== undefined && answers[8] > 0;

  const getResultVisuals = (totalScore: number) => {
    if (totalScore <= 4) return { text: "Trầm cảm mức độ tối thiểu. Có thể không cần điều trị.", color: "text-green-600", bg: "bg-green-50", ring: "bg-green-100" };
    if (totalScore <= 9) return { text: "Trầm cảm nhẹ. Có thể chỉ cần chờ đợi theo dõi và tái khám sau.", color: "text-yellow-600", bg: "bg-yellow-50", ring: "bg-yellow-100" };
    if (totalScore <= 14) return { text: "Trầm cảm vừa. Cần có kế hoạch điều trị từ tư vấn chuyên khoa, theo dõi sát sao.", color: "text-orange-600", bg: "bg-orange-50", ring: "bg-orange-100" };
    if (totalScore <= 19) return { text: "Trầm cảm tương đối nặng. Nên bắt đầu liệu pháp tâm lý hoặc dùng thuốc ngay.", color: "text-red-700", bg: "bg-red-50", ring: "bg-red-100" };
    return { text: "Trầm cảm nặng. Cần can thiệp y tế khẩn cấp và chuyển tuyến bác sĩ chuyên khoa.", color: "text-rose-700", bg: "bg-rose-50", ring: "bg-rose-100" };
  };

  if (showResults) {
    const visuals = getResultVisuals(score);
    return (
      <section className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-3">
              <BarChart3 className="w-3 h-3" /> Kết Quả Đánh Giá
            </span>
            <h2 className="text-2xl md:text-3xl font-heading text-[#1A1A2E] mb-3">Sức Khỏe Tâm Thần Của Bạn</h2>
          </div>

          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-8 md:p-10 text-center">
             <div className={`w-20 h-20 rounded-full ${visuals.ring} flex items-center justify-center mx-auto mb-6`}>
               <div className={`w-12 h-12 rounded-full ${score > 14 ? 'bg-red-500' : 'bg-indigo-500'} flex items-center justify-center`}>
                 <Activity className="w-6 h-6 text-white" />
               </div>
             </div>

             <div className="mb-6">
               <div className="text-6xl font-black text-[#1A1A2E] mb-2">{score}</div>
               <div className="text-sm text-[#9CA3AF] uppercase tracking-widest font-bold">Tổng điểm / 27</div>
             </div>

             <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full ${visuals.bg} font-bold mb-8 ${visuals.color} border border-current/10`}>
               {score <= 4 ? "Mức độ tối thiểu" : score <= 9 ? "Mức độ nhẹ" : score <= 14 ? "Mức độ trung bình" : score <= 19 ? "Trung bình nặng" : "Mức độ nặng"}
             </div>

             <p className="text-[#4A5568] mb-10 text-lg leading-relaxed">{visuals.text}</p>

             {hasSuicidalThoughts && (
               <div className="mb-10 p-6 bg-red-50 border border-red-200 rounded-2xl text-left">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    <h4 className="text-lg font-bold text-red-800 uppercase">Cảnh Báo Nguy Cấp</h4>
                  </div>
                  <p className="text-red-700 text-sm mb-4 leading-relaxed">
                    Bạn đang có những suy nghĩ gây tổn thương bản thân. Làm ơn, hãy kết nối với sự trợ giúp ngay lập tức.
                  </p>
                  <div className="bg-white p-4 rounded-xl border border-red-100 space-y-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Hotline hỗ trợ 24/7:</p>
                    <div className="flex justify-between items-center text-red-600 bg-red-50 p-3 rounded-lg">
                      <span className="font-bold flex items-center gap-2"><Users className="w-4 h-4" /> Ngày Mai:</span>
                      <a href="tel:0963061414" className="font-black text-lg">096 306 1414</a>
                    </div>
                    <div className="flex justify-between items-center text-indigo-600 bg-indigo-50 p-3 rounded-lg">
                      <span className="font-bold">Tổng đài 111:</span>
                      <a href="tel:111" className="font-black text-lg">111</a>
                    </div>
                  </div>
               </div>
             )}

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <button
                 onClick={retake}
                 className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gray-100 text-[#1A1A2E] font-bold hover:bg-gray-200 transition-all border-none"
               >
                 <RefreshCw className="w-5 h-5" /> Làm Lại Bài Test
               </button>
               <button className="calm-cta-btn font-bold py-4 rounded-2xl shadow-lg">
                 Liên Hệ Chuyên Gia
               </button>
             </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-3">
            <BarChart3 className="w-3 h-3" /> Bài Tự Đánh Giá
          </span>
          <h2 className="text-2xl md:text-3xl font-heading text-[#1A1A2E] mb-3">Chẩn Đoán Trầm Cảm (PHQ-9)</h2>
          <p className="text-[#4A5568]">Dựa trên thang đo PHQ-9. Hãy trả lời trung thực về tình trạng của bạn trong 2 tuần qua.</p>
        </div>

        {/* Quiz Card */}
        <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-8 md:p-10">
          {/* Progress bar */}
          <div className="mb-10">
            <div className="flex items-center justify-between text-sm text-[#4A5568] mb-3 font-medium">
              <span>Câu hỏi {currentQuestion + 1} / {QUESTIONS.length + 1}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out bg-indigo-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Content */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-indigo-50 text-indigo-600">
              {currentQuestion < QUESTIONS.length ? (
                QuestionIcon && <QuestionIcon className="w-8 h-8" />
              ) : (
                <Brain className="w-8 h-8" />
              )}
            </div>
            <p className="text-xs text-indigo-400 uppercase tracking-[0.2em] font-black mb-3 px-4">
              BẠN CÓ THƯỜNG XUYÊN BỊ LÀM PHIỀN BỞI NHỮNG VẤN ĐỀ SAU ĐÂY TRONG SUỐT 2 TUẦN QUA KHÔNG?
            </p>
            <h3 className="text-xl md:text-2xl font-bold text-[#1A1A2E] leading-tight px-4">
              {currentQuestion < QUESTIONS.length ? question?.question : EXTRA_QUESTION.text}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-10">
            {(currentQuestion < QUESTIONS.length ? ANSWER_OPTIONS : EXTRA_QUESTION.options.map((opt, i) => ({ value: i, label: opt, description: "" }))).map((opt) => {
              const selectedValue = currentQuestion < QUESTIONS.length ? answers[currentQuestion] : extraAnswer;
              const isSelected = selectedValue === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => selectAnswer(opt.value)}
                  className={`
                    block w-full p-5 rounded-2xl border-2 text-left
                    cursor-pointer transition-all duration-300
                    ${isSelected
                      ? 'border-indigo-600 bg-indigo-50/50 ring-4 ring-indigo-50'
                      : 'border-gray-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/10'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                      ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300 bg-white'}
                    `}>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <div>
                      <div className="font-bold text-[#1A1A2E] text-base">{opt.label}</div>
                      {opt.description && <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">{opt.description}</div>}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-50">
            <button
              onClick={goPrev}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-gray-400 transition-all
                ${currentQuestion === 0 ? 'opacity-0' : 'hover:text-indigo-600 hover:bg-indigo-50'}
              `}
            >
              <ArrowLeft className="w-5 h-5" /> Quay lại
            </button>

            <button
              onClick={goNext}
              disabled={!hasAnswer}
              className={`
                flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-white shadow-lg transition-all
                ${hasAnswer 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 shadow-indigo-200' 
                  : 'bg-gray-200 shadow-none cursor-not-allowed'}
              `}
            >
              {isLastStep ? 'Xem Kết Quả' : 'Tiếp theo'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
