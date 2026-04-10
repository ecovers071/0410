import React, { useState, useEffect } from 'react';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Volume2,
  Globe,
  ShieldCheck,
  User,
  Smartphone,
  Printer,
  ChevronRight,
  Eye,
  Search,
  MessageCircle,
  Clock,
  ExternalLink,
  ChevronDown,
  Info
} from 'lucide-react';

const App = () => {
  const [step, setStep] = useState('landing'); // landing, upload, processing, result
  const [isLargeText, setIsLargeText] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('ko');
  const [userProfile, setUserProfile] = useState('single'); // single, family, foreigner
  const [isMaskingEnabled, setIsMaskingEnabled] = useState(true);

  // 시뮬레이션용 데이터
  const mockAnalysis = {
    title: "전입신고 및 주소변경 안내문",
    purpose: "이사 후 14일 이내 의무 사항 안내",
    keyTasks: [
      { id: 1, task: "전입신고 완료", deadline: "이사 후 14일 이내", location: "정부24 또는 관할 동 주민센터" },
      { id: 2, task: "초등학교 배정 확인", deadline: "전입신고 시", location: "교육지원청 또는 동 주민센터" },
      { id: 3, task: "대형폐기물 스티커 부착", deadline: "배출 전", location: "지정 판매소 또는 온라인 신청" }
    ],
    documents: ["신분증", "임대차계약서(확정일자용)", "세대주 도장(방문 시)"],
    easyExplain: "새 집으로 이사 오셨으니, 2주 안에 나라에 알리고 아이들 학교와 쓰레기 배출 방법을 확인해야 한다는 안내입니다."
  };

  const languages = [
    { code: 'ko', label: '한국어' },
    { code: 'en', label: 'English' },
    { code: 'zh', label: '中文' },
    { code: 'vi', label: 'Tiếng Việt' }
  ];

  // 단계별 렌더링
  const renderStep = () => {
    switch (step) {
      case 'landing':
        return (
          <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-4">
              <div className="inline-block p-3 bg-blue-100 rounded-2xl mb-2">
                <FileText className="w-12 h-12 text-blue-600" />
              </div>
              <h1 className={`font-bold text-gray-900 ${isLargeText ? 'text-4xl' : 'text-3xl'}`}>
                GovFlow Easy Move
              </h1>
              <p className={`text-gray-600 ${isLargeText ? 'text-xl' : 'text-lg'}`}>
                전입·이사 안내문을 찍으면<br/>지금 할 일을 바로 알려드립니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
              <button
                onClick={() => setStep('upload')}
                className="flex flex-col items-center p-8 bg-white border-2 border-blue-200 rounded-3xl hover:border-blue-500 hover:shadow-xl transition-all group"
              >
                <Upload className="w-10 h-10 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                <span className={`font-bold ${isLargeText ? 'text-2xl' : 'text-xl'}`}>안내문 촬영/업로드</span>
                <span className="text-sm text-gray-500 mt-2">종이 문서나 이미지 파일</span>
              </button>
              <button className="flex flex-col items-center p-8 bg-gray-50 border-2 border-gray-100 rounded-3xl opacity-60 cursor-not-allowed">
                <Smartphone className="w-10 h-10 text-gray-400 mb-4" />
                <span className={`font-bold ${isLargeText ? 'text-2xl' : 'text-xl'}`}>모바일 고지서 연계</span>
                <span className="text-sm text-gray-500 mt-2">국민비서 알림함 연결</span>
              </button>
            </div>
          </div>
        );

      case 'upload':
        return (
          <div className="w-full max-w-md mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-8 border-2 border-dashed border-gray-300 rounded-3xl text-center">
              <div className="w-full h-64 bg-gray-100 rounded-2xl flex flex-col items-center justify-center overflow-hidden relative border border-gray-200">
                <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                   <div className="border-2 border-blue-500 w-48 h-48 rounded-lg animate-pulse"></div>
                </div>
                <p className="z-10 text-sm text-gray-500">문서 스캔 중...</p>
              </div>
              <button
                onClick={() => {
                  setStep('processing');
                  setTimeout(() => setStep('result'), 2000);
                }}
                className="mt-6 w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-lg"
              >
                AI 분석 시작하기
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <ShieldCheck className="w-4 h-4" />
              <span>개인정보 자동 마스킹 기술이 적용 중입니다</span>
            </div>
          </div>
        );

      case 'processing':
        return (
          <div className="flex flex-col items-center justify-center h-64 space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900">문서를 해석하고 있습니다</h2>
              <p className="text-gray-500 mt-2">어려운 행정 용어를 쉬운 말로 바꾸는 중...</p>
            </div>
          </div>
        );

      case 'result':
        return (
          <div className="space-y-6 animate-in fade-in duration-700 pb-20">
            {/* Header: Core Info */}
            <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-blue-500/50 text-xs px-3 py-1 rounded-full border border-blue-300">분석 완료</span>
                <Volume2 className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{mockAnalysis.title}</h2>
              <p className="opacity-90 leading-relaxed mb-4">
                "{mockAnalysis.easyExplain}"
              </p>
              <div className="flex gap-2">
                 <span className="bg-white/20 text-xs px-3 py-1 rounded-lg">기한: {mockAnalysis.keyTasks[0].deadline}</span>
                 <span className="bg-white/20 text-xs px-3 py-1 rounded-lg">난이도: 쉬움</span>
              </div>
            </div>

            {/* Profile Selection */}
            <div className="bg-gray-50 rounded-2xl p-4 flex gap-2 overflow-x-auto border border-gray-100">
              <button
                onClick={() => setUserProfile('single')}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${userProfile === 'single' ? 'bg-white shadow-sm text-blue-600 border border-blue-100' : 'text-gray-500'}`}
              >
                👤 1인 가구
              </button>
              <button
                onClick={() => setUserProfile('family')}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${userProfile === 'family' ? 'bg-white shadow-sm text-blue-600 border border-blue-100' : 'text-gray-500'}`}
              >
                👨‍👩‍👧‍👦 다인 가구
              </button>
              <button
                onClick={() => setUserProfile('foreigner')}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${userProfile === 'foreigner' ? 'bg-white shadow-sm text-blue-600 border border-blue-100' : 'text-gray-500'}`}
              >
                🌍 외국인
              </button>
            </div>

            {/* Action Checklist */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <CheckCircle2 className="text-green-500 w-5 h-5" />
                나의 맞춤형 행동 체크리스트
              </h3>
              {mockAnalysis.keyTasks.map((item) => (
                <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-900">{item.task}</h4>
                    <span className="text-xs text-red-500 font-semibold bg-red-50 px-2 py-1 rounded">D-14</span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" /> {item.deadline}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Info className="w-4 h-4" /> {item.location}
                    </div>
                  </div>
                  <button className="w-full py-3 bg-gray-50 text-blue-600 rounded-xl text-sm font-bold border border-blue-50 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                    신청 페이지로 바로가기 <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Required Documents */}
            <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100">
              <h3 className="text-orange-800 font-bold mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" /> 준비해야 할 서류
              </h3>
              <ul className="space-y-2">
                {mockAnalysis.documents.map((doc, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-orange-900">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Safety & Contact */}
            <div className="bg-gray-100 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <h4 className="font-bold text-sm text-gray-700">추가 확인이 필요한가요?</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    본 AI의 해설은 법적 효력이 없습니다. 불확실한 상황은 아래 버튼을 통해 담당 공무원에게 바로 문의하세요.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 py-2 bg-white border border-gray-300 rounded-lg text-xs font-bold flex items-center justify-center gap-2">
                      <MessageCircle className="w-4 h-4" /> 1:1 상담
                    </button>
                    <button className="flex-1 py-2 bg-white border border-gray-300 rounded-lg text-xs font-bold flex items-center justify-center gap-2">
                      <Smartphone className="w-4 h-4" /> 전화 연결
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-white text-gray-900 transition-all font-sans ${isLargeText ? 'text-lg' : 'text-base'}`}>
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setStep('landing')}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="text-white w-5 h-5" />
          </div>
          <span className="font-extrabold text-blue-600 tracking-tight">GovFlow</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLargeText(!isLargeText)}
            className={`p-2 rounded-full transition-colors ${isLargeText ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            title="큰 글씨 모드"
          >
            <span className="font-bold text-sm">가A</span>
          </button>
          <div className="relative group">
            <button className="p-2 bg-gray-100 rounded-full text-gray-600">
              <Globe className="w-5 h-5" />
            </button>
            <div className="absolute right-0 top-10 w-32 bg-white border border-gray-100 rounded-xl shadow-xl hidden group-hover:block overflow-hidden">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50"
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 pt-10 pb-24">
        {renderStep()}
      </main>

      {/* Bottom Floating Action (Context Specific) */}
      {step === 'result' && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent">
          <div className="max-w-4xl mx-auto flex gap-3">
            <button
              onClick={() => setStep('landing')}
              className="flex-1 py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2"
            >
              처음으로
            </button>
            <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2">
              <Printer className="w-5 h-5" /> 결과 저장
            </button>
          </div>
        </div>
      )}

      {/* Security Info Overlay (Optional) */}
      <footer className="fixed bottom-4 left-4 right-4 text-center pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full border border-gray-100">
           <div className={`w-2 h-2 rounded-full ${isMaskingEnabled ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></div>
           <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Privacy Secured: Session Encryption</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
