import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Heart, Activity, ArrowRight, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { psychologicalTests } from '../data/psychologicalTests';

export default function PsychologicalTestPage() {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  
  const test = useMemo(() => psychologicalTests.find(t => t.id === testId), [testId]);
  
  const [currentStep, setCurrentStep] = useState(0); // 0 to test.questions.length - 1
  const [answers, setAnswers] = useState<any[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  // Reset state when testId changes
  useEffect(() => {
    setCurrentStep(0);
    setAnswers([]);
    setIsFinished(false);
    setShowAnswers(false);
  }, [testId]);

  // If test not found, show error or redirect
  if (!test) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen bg-[#FDFBF7]">
        <h2 className="text-2xl font-bold text-[#1A1A2E]">Không tìm thấy bài test</h2>
        <button onClick={() => navigate('/')} className="mt-4 px-6 py-2 bg-[#667eea] text-white rounded-full">Về trang chủ</button>
      </div>
    );
  }

  const handleSelectOption = (index: number) => {
    const question = test.questions[currentStep];
    const newAnswers = [...answers];

    if (question.multipleChoice) {
      const current = Array.isArray(newAnswers[currentStep]) ? newAnswers[currentStep] : [];
      if (current.includes(index)) {
        newAnswers[currentStep] = current.filter(i => i !== index);
      } else {
        newAnswers[currentStep] = [...current, index];
      }
    } else {
      newAnswers[currentStep] = index;
    }
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    const question = test.questions[currentStep];
    const isAnswered = question.multipleChoice ? true : answers[currentStep] !== undefined;
    if (!isAnswered) return;
    if (currentStep < test.questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsFinished(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const calculateResult = () => {
    const totalScore = answers.reduce((sum, answer, qIdx) => {
      const q = test.questions[qIdx];
      if (answer === undefined) return sum;
      if (q.multipleChoice) {
        if (Array.isArray(answer)) {
          return sum + answer.reduce((s, i) => s + (q.options[i]?.score || 0), 0);
        }
        return sum;
      }
      return sum + (q.options[answer as number]?.score || 0);
    }, 0);
    const maxScore = test.questions.reduce((sum, q) => {
      const maxOption = Math.max(...q.options.map(o => o.score));
      return sum + maxOption;
    }, 0);
    
    const scale = test.scales.find(s => totalScore >= s.min && totalScore <= s.max) || test.scales[test.scales.length - 1];
    
    return { totalScore, maxScore, scale };
  };

  // --- RENDERING ---

  // 1. View: Taking the Test
  if (!isFinished) {
    const question = test.questions[currentStep];
    const progressPercent = Math.round(((currentStep) / test.questions.length) * 100);
    const isAnswered = question.multipleChoice ? true : answers[currentStep] !== undefined;

    return (
      <div className="pt-28 pb-20 min-h-screen bg-[#FDFBF7] font-sans">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-[#1A1A2E] mb-4">{test.title}</h1>
            <p className="text-[#4A5568] text-lg">{test.subtitle}</p>
          </div>

          <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-12 relative">
            {/* Progress */}
            <div className="flex justify-between text-sm text-gray-500 font-medium mb-3">
              <span>Câu hỏi {currentStep + 1} / {test.questions.length}</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mb-10">
              <div 
                className="bg-gray-300 h-1.5 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Icon & Question */}
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-16 h-16 bg-[#F4F6FF] text-[#667eea] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                {test.id === 'lo-au' ? <Activity className="w-8 h-8" /> : <Heart className="w-8 h-8" />}
              </div>
              <p className="text-sm md:text-base font-medium text-[#667eea] uppercase mb-4 px-4 leading-relaxed">
                {test.description}
              </p>
              <h2 className="text-2xl md:text-[28px] font-medium text-[#1A1A2E] leading-snug">
                {question.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-12">
              {question.options.map((opt, idx) => {
                const isSelected = question.multipleChoice 
                  ? (answers[currentStep] || []).includes(idx)
                  : answers[currentStep] === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`
                      w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 cursor-pointer
                      ${isSelected 
                        ? 'border-[#667eea] bg-[#F4F6FF] text-[#1A1A2E]' 
                        : 'border-gray-100 bg-white hover:border-gray-200 text-gray-700 hover:bg-gray-50'}
                    `}
                  >
                    <div className={`flex items-center justify-center shrink-0 transition-colors
                      ${question.multipleChoice ? 'w-5 h-5 rounded-md border-2' : 'w-6 h-6 rounded-full border-2'}
                      ${isSelected ? 'border-[#667eea]' : 'border-gray-300'}`}
                    >
                      {isSelected && (question.multipleChoice 
                        ? <svg className="w-3.5 h-3.5 text-[#667eea]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        : <div className="w-3 h-3 rounded-full bg-[#667eea]" />
                      )}
                    </div>
                    <div>
                      <div className={`text-[17px] font-medium ${isSelected ? 'text-[#1A1A2E]' : 'text-[#1A1A2E]'}`}>
                        {opt.text}
                      </div>
                      {/* Only showing score interpretation if it's PHQ-9 or standard */}
                      {(opt.score !== undefined && test.id === 'tram-cam') && (
                        <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide font-semibold">
                          {opt.score === 0 ? '0 NGÀY' : opt.score === 1 ? '1-6 NGÀY' : opt.score === 2 ? '7+ NGÀY' : 'HẦU HẾT CÁC NGÀY'}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              {currentStep > 0 ? (
                <button 
                  onClick={handleBack}
                  className="flex items-center gap-2 text-[#64748b] hover:text-[#1A1A2E] font-medium transition-colors bg-transparent border-none cursor-pointer p-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Quay lại
                </button>
              ) : <div></div>}

              <button
                onClick={handleNext}
                disabled={!isAnswered}
                className={`
                  flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 border-none cursor-pointer
                  ${isAnswered 
                    ? 'bg-[#B19DF7] hover:bg-[#A084E8] text-white shadow-md' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                `}
              >
                Tiếp theo
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. View: Result Page
  const { totalScore, maxScore, scale } = calculateResult();

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white font-sans">
      <div className="max-w-[800px] mx-auto px-6">
        
        {/* Title & Stepper */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-[#1A365D] mb-8">{test.title}</h1>
          <div className="flex items-center justify-center max-w-sm mx-auto">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#4FD1C5] text-white flex items-center justify-center font-bold text-sm">1</div>
              <span className="text-xs text-[#4FD1C5] font-medium">Câu hỏi</span>
            </div>
            <div className="h-0.5 w-16 bg-[#4FD1C5] mb-6 mx-2"></div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#4FD1C5] text-white flex items-center justify-center font-bold text-sm">2</div>
              <span className="text-xs text-[#4FD1C5] font-medium">Thông tin</span>
            </div>
            <div className="h-0.5 w-16 bg-[#4FD1C5] mb-6 mx-2"></div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#4FD1C5] text-white flex items-center justify-center font-bold text-sm">3</div>
              <span className="text-xs text-[#4FD1C5] font-medium">Kết quả</span>
            </div>
          </div>
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#3B5998] rounded-xl p-8 text-white flex flex-col justify-center">
            <div className="text-white/80 font-medium mb-1">Kết quả test của bạn là</div>
            <div className="text-3xl font-bold">{scale.label}</div>
          </div>
          <div className="bg-[#4267B2] rounded-xl p-8 text-white flex flex-col justify-center items-center">
            <div className="text-white/80 font-medium mb-1 border-b border-white/30 pb-1">Điểm của bạn</div>
            <div className="text-4xl font-bold mt-2">{totalScore} / {maxScore}</div>
          </div>
        </div>

        {/* Answers Accordion */}
        <div className="mb-10">
          <button 
            onClick={() => setShowAnswers(!showAnswers)}
            className="w-full flex items-center justify-between p-5 bg-white border border-[#E2E8F0] rounded-xl text-left cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-[#4A5568]">Câu trả lời của bạn</span>
            {showAnswers ? <ChevronUp className="w-5 h-5 text-[#4FD1C5]" /> : <ChevronDown className="w-5 h-5 text-[#4FD1C5]" />}
          </button>
          
          {showAnswers && (
            <div className="mt-2 p-5 border border-[#E2E8F0] rounded-xl bg-gray-50 space-y-4">
              {test.questions.map((q, idx) => {
                const answer = answers[idx];
                let displayAnswer = 'Chưa trả lời';
                if (answer !== undefined) {
                  if (q.multipleChoice) {
                    const arr = Array.isArray(answer) ? answer : [];
                    displayAnswer = arr.length > 0 ? arr.map(i => q.options[i]?.text).join(', ') : 'Không có';
                  } else {
                    displayAnswer = q.options[answer as number]?.text || 'Chưa trả lời';
                  }
                }
                return (
                  <div key={idx} className="pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                    <div className="text-sm text-gray-500 mb-1">Câu {idx + 1}: {q.question}</div>
                    <div className="font-medium text-[#1A365D]">{displayAnswer}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Assessment Details */}
        <div className="prose prose-blue max-w-none text-[#4A5568] leading-relaxed mb-16 space-y-4">
          <p className="whitespace-pre-wrap">{scale.description}</p>
        </div>

        {/* CTA Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#FEF6E4] to-[#FFF3E2] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between mb-12 border border-[#FDE3CD]">
          <div className="z-10 max-w-sm mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-[#1A365D] mb-2">Bước tiếp theo?</h3>
            <p className="text-[#4A5568] mb-6">Bạn muốn tìm một chuyên gia tâm lý? UniCare đem đến giải pháp kết nối chuyên gia tâm lý, bác sĩ tâm thần giỏi nhất một cách nhanh chóng và thuận tiện.</p>
            <Link to="/calm-health" className="inline-block px-8 py-3 bg-[#E87B35] hover:bg-[#D46B28] text-white font-bold rounded shadow-md transition-colors no-underline">
              Kết nối ngay
            </Link>
          </div>
          {/* Doctor Image Mock (using Unsplash or illustration placeholder if no local image) */}
          <div className="relative z-10 w-48 h-48 md:absolute md:right-8 md:bottom-0 md:w-64 md:h-[110%] flex items-end">
            <img 
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80" 
              alt="Doctor" 
              className="object-cover w-full h-full rounded-t-full md:rounded-none mask-image-bottom"
              style={{ maskImage: 'linear-gradient(to top, transparent 0%, black 20%)', WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 20%)' }}
            />
          </div>
        </div>

        {/* Retry Button */}
        <div className="text-center">
          <button 
            onClick={() => {
              setCurrentStep(0);
              setAnswers([]);
              setIsFinished(false);
              setShowAnswers(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#4FD1C5] hover:bg-[#38B2AC] text-white font-semibold rounded shadow-md transition-colors cursor-pointer border-none"
          >
            Làm một bài test khác
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
