import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Search,
  Eye,
  EyeOff,
  Award,
  BookOpen,
  MessageSquare,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Flame,
  HelpCircle,
  Layers,
  GraduationCap,
  Info,
} from 'lucide-react';
import {
  EXAM_1_INFO,
  EXAM_1_PARTE_1,
  EXAM_1_PARTE_2,
  EXAM_1_PARTE_3,
  EXAM_1_PARTE_4,
  EXAM_1_PARTE_5,
  EXAM_1_PARTE_6,
  FRASES_EMERGENCIA,
  EXAM_2_INFO,
  EXAM_2_PARTE_1,
  EXAM_2_PARTE_2,
  EXAM_2_PARTE_3,
  EXAM_2_PARTE_4,
  EXAM_2_PARTE_5,
  BONUS_EXPRESIONES,
  ExamItem,
  getEvaluationFeedback,
} from './examData.ts';
import {
  isSoundMuted,
  toggleGlobalMute,
  subscribeSoundMuted,
  speakSpanish,
  stopSpeaking,
  playClickSound,
  playSuccessSound,
  playErrorSound,
} from './soundUtil.ts';

type TabType = 'exam1' | 'exam2' | 'phrases' | 'flashcards' | 'eval';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('exam1');
  const [soundMuted, setSoundMutedState] = useState(isSoundMuted());
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [currentlySpeakingText, setCurrentlySpeakingText] = useState<string | null>(null);

  // Global & Individual Armenian translation reveals
  const [revealedItems, setRevealedItems] = useState<Record<string, boolean>>({});
  const [showAllTranslations, setShowAllTranslations] = useState(false);
  const [revealedModels, setRevealedModels] = useState<Record<string, boolean>>({});

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Exam 2 Parte 3 Interactive Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  // Surprise situations carousel
  const [surpriseStep, setSurpriseStep] = useState(0);

  // Flashcards mode state
  const [cardIndex, setCardIndex] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [cardSource, setCardSource] = useState<'all' | 'exam1' | 'exam2' | 'phrases'>('all');

  // Interactive evaluation state for Exam 1 and Exam 2
  const [evalExam1, setEvalExam1] = useState({
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
    p5: 0,
    p6: 0,
  });

  const [evalExam2, setEvalExam2] = useState({
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
    p5: 0,
  });

  const [fontScale, setFontScale] = useState<'normal' | 'large' | 'xlarge'>(() => {
    try {
      const saved = localStorage.getItem('examen_font_scale');
      if (saved === 'normal' || saved === 'large' || saved === 'xlarge') return saved;
    } catch {
      // ignore
    }
    return 'large'; // Default to a larger font as requested by user
  });

  // Apply font scale to document root
  useEffect(() => {
    try {
      localStorage.setItem('examen_font_scale', fontScale);
    } catch {
      // ignore
    }
    document.documentElement.classList.remove('font-scale-normal', 'font-scale-large', 'font-scale-xlarge');
    document.documentElement.classList.add(`font-scale-${fontScale}`);
  }, [fontScale]);

  // Subscribe to audio mute changes
  useEffect(() => {
    const unsub = subscribeSoundMuted((muted) => {
      setSoundMutedState(muted);
    });
    return () => unsub();
  }, []);

  // Handle TTS playback
  const handleSpeak = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (currentlySpeakingText === text) {
      stopSpeaking();
      setCurrentlySpeakingText(null);
      return;
    }
    stopSpeaking();
    setCurrentlySpeakingText(text);
    speakSpanish(
      text,
      speechRate,
      () => setCurrentlySpeakingText(text),
      () => setCurrentlySpeakingText(null)
    );
  };

  // Toggle single item's Armenian translation
  const toggleTranslation = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playClickSound();
    setRevealedItems((prev) => ({
      ...prev,
      [id]: prev[id] === undefined ? !showAllTranslations : !prev[id],
    }));
  };

  // Toggle model answer visibility
  const toggleModelAnswer = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playClickSound();
    setRevealedModels((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Check if item Armenian translation is visible
  const isItemRevealed = (id: string) => {
    if (revealedItems[id] !== undefined) {
      return revealedItems[id];
    }
    return showAllTranslations;
  };

  // Global toggle all translations
  const toggleAllTranslations = () => {
    playClickSound();
    const nextState = !showAllTranslations;
    setShowAllTranslations(nextState);
    setRevealedItems({});
  };

  // Global sound toggle
  const handleToggleSound = () => {
    const newMuted = toggleGlobalMute();
    setSoundMutedState(newMuted);
  };

  // Quiz answering handler
  const handleQuizSelect = (itemId: string, optionIndex: number, isCorrect: boolean) => {
    if (quizAnswers[itemId] !== undefined) return;
    setQuizAnswers((prev) => ({ ...prev, [itemId]: optionIndex }));
    if (isCorrect) {
      playSuccessSound();
    } else {
      playErrorSound();
    }
  };

  // Reset quiz
  const resetQuiz = () => {
    playClickSound();
    setQuizAnswers({});
  };

  // Filter items matching search
  const matchesSearch = (textEs: string, textHy = '', extra = '') => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      textEs.toLowerCase().includes(q) ||
      textHy.toLowerCase().includes(q) ||
      extra.toLowerCase().includes(q)
    );
  };

  // Flashcards collection
  const flashcardDeck = useMemo(() => {
    const list: { id: string; spanish: string; armenian: string; tag: string }[] = [];
    if (cardSource === 'all' || cardSource === 'phrases') {
      FRASES_EMERGENCIA.forEach((p) =>
        list.push({ id: p.id, spanish: p.spanish, armenian: p.armenian, tag: 'Frase de emergencia' })
      );
      BONUS_EXPRESIONES.forEach((p) =>
        list.push({ id: p.id, spanish: p.spanish, armenian: p.armenian, tag: 'Expresión natural' })
      );
    }
    if (cardSource === 'all' || cardSource === 'exam1') {
      EXAM_1_PARTE_1.forEach((p) =>
        list.push({ id: p.id, spanish: p.spanish, armenian: p.armenian, tag: 'Examen 1 · Reacción' })
      );
      EXAM_1_PARTE_3.forEach((p) =>
        list.push({ id: p.id, spanish: p.spanish, armenian: p.armenian, tag: 'Examen 1 · Fútbol' })
      );
    }
    if (cardSource === 'all' || cardSource === 'exam2') {
      EXAM_2_PARTE_1.forEach((p) =>
        list.push({ id: p.id, spanish: p.spanish, armenian: p.armenian, tag: 'Examen 2 · Colegio' })
      );
      EXAM_2_PARTE_2.forEach((p) =>
        list.push({ id: p.id, spanish: p.spanish, armenian: p.armenian, tag: 'Examen 2 · Fútbol' })
      );
    }
    return list;
  }, [cardSource]);

  const currentFlashcard = flashcardDeck[cardIndex] || flashcardDeck[0];

  const handleNextCard = () => {
    playClickSound();
    setCardFlipped(false);
    setCardIndex((prev) => (prev + 1) % flashcardDeck.length);
  };

  const handlePrevCard = () => {
    playClickSound();
    setCardFlipped(false);
    setCardIndex((prev) => (prev - 1 + flashcardDeck.length) % flashcardDeck.length);
  };

  // Exam 1 score calculation
  const totalScoreExam1 =
    evalExam1.p1 + evalExam1.p2 + evalExam1.p3 + evalExam1.p4 + evalExam1.p5 + evalExam1.p6;
  const feedbackExam1 = getEvaluationFeedback(totalScoreExam1);

  // Exam 2 score calculation
  const totalScoreExam2 =
    evalExam2.p1 + evalExam2.p2 + evalExam2.p3 + evalExam2.p4 + evalExam2.p5;
  const feedbackExam2 = getEvaluationFeedback(totalScoreExam2);

  // Correct count in quiz
  const quizCorrectCount = useMemo(() => {
    return EXAM_2_PARTE_3.reduce((acc, q) => {
      const selected = quizAnswers[q.id];
      if (selected !== undefined && q.options && q.options[selected]?.isCorrect) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }, [quizAnswers]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Logo and Titles */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 via-red-500 to-indigo-600 flex items-center justify-center shadow-md shadow-red-500/10 text-white shrink-0 font-bold text-xl">
                🇪🇸
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 leading-tight">
                    EXAMEN ORAL DE ESPAÑOL
                  </h1>
                  <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                    7.º CURSO
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">
                    A2–B1
                  </span>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  <span>🇦🇲 Իսպաներենի խոսակցական քննություն</span>
                  <span className="hidden sm:inline text-slate-300">•</span>
                  <span className="hidden sm:inline text-indigo-600 font-semibold">
                    Սեղմեք իսպաներենի վրա՝ հայերեն թարգմանությունը տեսնելու համար
                  </span>
                </p>
              </div>
            </div>

            {/* Global Controls: Global Sound Button, Speed, Show All */}
            <div className="flex items-center flex-wrap gap-2 w-full md:w-auto justify-end">
              {/* GLOBAL SOUND MUTE / UNMUTE BUTTON (Required by user) */}
              <button
                type="button"
                onClick={handleToggleSound}
                aria-label={soundMuted ? 'Միացնել ձայնը (Sound ON)' : 'Անջատել ձայնը (Sound OFF)'}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-xs border ${
                  soundMuted
                    ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-300 ring-2 ring-rose-200'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300 shadow-emerald-500/10'
                }`}
                title={soundMuted ? 'Ձայնը անջատված է։ Սեղմեք՝ միացնելու համար' : 'Ձայնը միացված է։ Սեղմեք՝ անջատելու համար'}
              >
                {soundMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-rose-600" />
                    <span>🔇 Ձայնն անջատված է</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-600 animate-pulse" />
                    <span>🔊 Ձայնը միացված է</span>
                  </>
                )}
              </button>

              {/* Font Size Selector */}
              <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200 text-xs font-bold text-slate-600">
                <span className="px-1.5 text-[11px] text-slate-400 font-bold" title="Տառաչափ / Размер шрифта">Aa</span>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setFontScale('normal');
                  }}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    fontScale === 'normal'
                      ? 'bg-white text-indigo-700 shadow-xs font-extrabold'
                      : 'hover:text-slate-900 text-slate-500'
                  }`}
                  title="Ստանդարտ տառաչափ (Normal font)"
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setFontScale('large');
                  }}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    fontScale === 'large'
                      ? 'bg-white text-indigo-700 shadow-xs font-extrabold'
                      : 'hover:text-slate-900 text-slate-500'
                  }`}
                  title="Մեծ տառաչափ (Large font)"
                >
                  A+
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setFontScale('xlarge');
                  }}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    fontScale === 'xlarge'
                      ? 'bg-white text-indigo-700 shadow-xs font-extrabold'
                      : 'hover:text-slate-900 text-slate-500'
                  }`}
                  title="Առավել մեծ տառաչափ (Extra Large font)"
                >
                  A++
                </button>
              </div>

              {/* Speed Controller */}
              <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200 text-xs font-medium text-slate-600">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setSpeechRate(0.8);
                  }}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    speechRate === 0.8
                      ? 'bg-white text-indigo-700 shadow-xs font-bold'
                      : 'hover:text-slate-900'
                  }`}
                  title="Դանդաղ արտասանություն (0.8x)"
                >
                  0.8x
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setSpeechRate(1.0);
                  }}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    speechRate === 1.0
                      ? 'bg-white text-indigo-700 shadow-xs font-bold'
                      : 'hover:text-slate-900'
                  }`}
                  title="Նորմալ արտասանություն (1.0x)"
                >
                  1.0x
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setSpeechRate(1.2);
                  }}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    speechRate === 1.2
                      ? 'bg-white text-indigo-700 shadow-xs font-bold'
                      : 'hover:text-slate-900'
                  }`}
                  title="Արագ արտասանություն (1.2x)"
                >
                  1.2x
                </button>
              </div>

              {/* Global Show/Hide All Translations */}
              <button
                type="button"
                onClick={toggleAllTranslations}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold transition-all"
                title="Բացել կամ թաքցնել բոլոր թարգմանությունները"
              >
                {showAllTranslations ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                    <span className="hidden sm:inline">Թաքցնել թարգմանությունները</span>
                    <span className="sm:hidden">Թաքցնել</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="hidden sm:inline">Ցույց տալ բոլոր թարգմանությունները</span>
                    <span className="sm:hidden">Բոլորը</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 border-t border-slate-100 mt-2 scrollbar-none">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setActiveTab('exam1');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'exam1'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>🎓 Examen 1</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeTab === 'exam1' ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-200 text-slate-600'
              }`}>
                42 act. · 100 pts
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setActiveTab('exam2');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'exam2'
                  ? 'bg-amber-600 text-white shadow-sm shadow-amber-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>⚽ Examen 2 — ¡Habla como en España!</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeTab === 'exam2' ? 'bg-amber-700 text-amber-100' : 'bg-slate-200 text-slate-600'
              }`}>
                50 act. · 100 pts
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setActiveTab('phrases');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'phrases'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Արտահայտություններ & Bonus</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeTab === 'phrases' ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-200 text-slate-600'
              }`}>
                27 արտահայտություն
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setActiveTab('flashcards');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'flashcards'
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Ինտերակտիվ Քարտեր</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setActiveTab('eval');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'eval'
                  ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Գնահատականների թերթիկ</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner & Live Search */}
      <section className="bg-gradient-to-b from-indigo-50/70 via-slate-50 to-slate-50 border-b border-slate-200/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-800 text-xs font-semibold mb-2">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span>Ինտերակտիվ ուսումնական համակարգ</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {activeTab === 'exam1' && 'Examen 1 · Իսպաներենի խոսակցական քննություն'}
                {activeTab === 'exam2' && 'Examen 2 · ¡Habla como en España!'}
                {activeTab === 'phrases' && 'Արտահայտություններ · Frases de Emergencia & Expresiones'}
                {activeTab === 'flashcards' && 'Ինտերակտիվ ֆլեշ-քարտեր (Flashcards)'}
                {activeTab === 'eval' && 'Քննության պաշտոնական գնահատում և հաշվիչ'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1">
                {activeTab === 'exam1' && EXAM_1_INFO.subtitleHy}
                {activeTab === 'exam2' && EXAM_2_INFO.descriptionHy}
                {activeTab === 'phrases' &&
                  'Այս արտահայտությունները փրկություն են քննության ընթացքում, երբ հասկանում ես իսպաներենը, բայց պետք է ժամանակ շահել կամ բնական արտահայտվել։'}
                {activeTab === 'flashcards' &&
                  'Մարզի՛ր հիշողությունդ. շրջի՛ր քարտը, լսի՛ր իսպաներեն արտասանությունը և ստուգի՛ր քո գիտելիքները։'}
                {activeTab === 'eval' &&
                  'Ուսուցչի կամ աշակերտի ինքնագնահատման համակարգ՝ ըստ բաժինների հավաքած միավորների (առավելագույնը 100)։'}
              </p>
            </div>

            {/* Quick Search */}
            <div className="w-full md:w-80 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Որոնել բառ կամ արտահայտություն..."
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-xs sm:text-sm shadow-xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs p-1"
                  >
                    ✕
                  </button>
                )}
              </div>
              {searchQuery && (
                <p className="text-[11px] text-indigo-700 mt-1 font-medium">
                  Ֆիլտրված է որոնման արդյունքներով:
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* ================= TAB: EXAMEN 1 ================= */}
        {activeTab === 'exam1' && (
          <div className="space-y-10">
            {/* Exam 1 Intro Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-100/50 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none" />
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold">
                  100 PUNTOS
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  ⏱️ 45–60 MINUTOS
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                  6 PARTES · 42 ACTIVIDADES
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                Instrucciones — Հրահանգներ
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
                {EXAM_1_INFO.instructionsHy}
              </p>
              <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Ինչպե՞ս օգտվել.</strong> Սեղմեք ցանկացած իսպաներեն արտահայտության վրա՝ բացելու հայերեն թարգմանությունը։ Օգտագործեք բարձրախոսի կոճակը (🔊)՝ բնական իսպաներեն արտասանությունը լսելու համար։
                </p>
              </div>
            </div>

            {/* Parte 1: Reacciona rápidamente */}
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">
                      1
                    </span>
                    Parte 1. Reacciona rápidamente — Արագ արձագանքիր
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    10 situaciones · 20 puntos — Դու դպրոցում ես, դասընկերներդ քեզ դիմում են։ Պատասխանիր անմիջապես։
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EXAM_1_PARTE_1.filter((item) =>
                  matchesSearch(item.spanish, item.armenian, item.modelAnswerSpanish || '')
                ).map((item) => (
                  <ExamInteractiveCard
                    key={item.id}
                    item={item}
                    isRevealed={isItemRevealed(item.id)}
                    isModelRevealed={revealedModels[item.id] || false}
                    onToggleTranslation={(e) => toggleTranslation(item.id, e)}
                    onToggleModel={(e) => toggleModelAnswer(item.id, e)}
                    onSpeak={(text, e) => handleSpeak(text, e)}
                    isSpeaking={currentlySpeakingText === item.spanish}
                    soundMuted={soundMuted}
                  />
                ))}
              </div>
            </section>

            {/* Parte 2: Problemas reales con compañeros */}
            <section className="space-y-4 pt-6 border-t border-slate-200">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-amber-600 text-white text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  Parte 2. Problemas reales con compañeros — Իրական իրավիճակներ դասընկերների հետ
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  8 situaciones · 16 puntos — Ուսուցիչը նկարագրում է իրավիճակը։ Աշակերտը ձևակերպում է ամբողջական նախադասությամբ։
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EXAM_1_PARTE_2.filter((item) =>
                  matchesSearch(item.spanish, item.armenian, item.modelAnswerSpanish || '')
                ).map((item) => (
                  <ExamInteractiveCard
                    key={item.id}
                    item={item}
                    isRevealed={isItemRevealed(item.id)}
                    isModelRevealed={revealedModels[item.id] || false}
                    onToggleTranslation={(e) => toggleTranslation(item.id, e)}
                    onToggleModel={(e) => toggleModelAnswer(item.id, e)}
                    onSpeak={(text, e) => handleSpeak(text, e)}
                    isSpeaking={currentlySpeakingText === item.spanish}
                    soundMuted={soundMuted}
                  />
                ))}
              </div>
            </section>

            {/* Parte 3: ¡Estamos jugando! — Ֆուտբոլային խաղի ընթացքում */}
            <section className="space-y-4 pt-6 border-t border-slate-200">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  Parte 3. ¡Estamos jugando! — Ֆուտբոլային խաղի ընթացքում
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  8 situaciones · 16 puntos — Մարզիչը և թիմակիցները։ Պատասխանիր արագ, ինչպես իրական խաղի ժամանակ։
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EXAM_1_PARTE_3.filter((item) =>
                  matchesSearch(item.spanish, item.armenian, item.modelAnswerSpanish || '')
                ).map((item) => (
                  <ExamInteractiveCard
                    key={item.id}
                    item={item}
                    isRevealed={isItemRevealed(item.id)}
                    isModelRevealed={revealedModels[item.id] || false}
                    onToggleTranslation={(e) => toggleTranslation(item.id, e)}
                    onToggleModel={(e) => toggleModelAnswer(item.id, e)}
                    onSpeak={(text, e) => handleSpeak(text, e)}
                    isSpeaking={currentlySpeakingText === item.spanish}
                    soundMuted={soundMuted}
                  />
                ))}
              </div>
            </section>

            {/* Parte 4: Role-play */}
            <section className="space-y-4 pt-6 border-t border-slate-200">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-purple-600 text-white text-xs flex items-center justify-center font-bold">
                    4
                  </span>
                  Parte 4. Role-play — Քննության կենդանի երկխոսություններ
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  4 conversaciones · 20 puntos — Ուսուցիչը կատարում է A դերը, աշակերտը՝ B։ Սեղմեք B պատասխանը բացելու համար։
                </p>
              </div>

              <div className="space-y-6">
                {EXAM_1_PARTE_4.map((dialogue) => (
                  <RolePlayInteractiveView
                    key={dialogue.id}
                    dialogue={dialogue}
                    onSpeak={(text, e) => handleSpeak(text, e)}
                    isItemRevealed={isItemRevealed}
                    toggleTranslation={toggleTranslation}
                    soundMuted={soundMuted}
                  />
                ))}
              </div>
            </section>

            {/* Parte 5: Cambia de tiempo */}
            <section className="space-y-4 pt-6 border-t border-slate-200">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                    5
                  </span>
                  Parte 5. Cambia de tiempo sin dejar de hablar — Փոխի՛ր ժամանակը
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  8 ejercicios · 16 puntos — Ավարտիր պատասխանը՝ օգտագործելով պահանջվող քերականական ժամանակը։
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EXAM_1_PARTE_5.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleTranslation(item.id)}
                    className="cursor-pointer bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                        {item.number}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[11px] font-semibold border border-blue-200">
                        {item.grammarTense}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleSpeak(item.spanish, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all ml-auto"
                        title="Լսել իսպաներեն"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-sm font-semibold text-slate-900 whitespace-pre-line leading-relaxed">
                      {item.spanish}
                    </div>

                    {item.notes && (
                      <p className="text-xs text-amber-700 bg-amber-50/80 px-2.5 py-1.5 rounded-xl border border-amber-200/60 font-medium">
                        💡 Կիրառվող բայը՝ {item.notes}
                      </p>
                    )}

                    {/* Armenian translation */}
                    {isItemRevealed(item.id) ? (
                      <div className="pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-700 bg-slate-50/80 p-3 rounded-xl border border-slate-200/50">
                        <span className="font-semibold text-indigo-700 block mb-0.5">🇦🇲 Հայերեն թարգմանություն՝</span>
                        {item.armenian}
                      </div>
                    ) : (
                      <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 pt-1">
                        <span>🇦🇲 Սեղմեք՝ հայերեն թարգմանությունը տեսնելու համար</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Parte 6: Situaciones sorpresa */}
            <section className="space-y-4 pt-6 border-t border-slate-200">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-rose-600 text-white text-xs flex items-center justify-center font-bold">
                    6
                  </span>
                  Parte 6. Situaciones sorpresa — Անսպասելի իրավիճակներ
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  4 situaciones · 12 puntos — Իմպրովիզացիա. պատասխանիր 2-3 նախադասությամբ և տուր մեկ հարց։
                </p>
              </div>

              {/* Step Carousel */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                    Improvisa en español · {surpriseStep + 1} / {EXAM_1_PARTE_6.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={surpriseStep === 0}
                      onClick={() => {
                        playClickSound();
                        setSurpriseStep((prev) => Math.max(0, prev - 1));
                      }}
                      className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={surpriseStep === EXAM_1_PARTE_6.length - 1}
                      onClick={() => {
                        playClickSound();
                        setSurpriseStep((prev) => Math.min(EXAM_1_PARTE_6.length - 1, prev + 1));
                      }}
                      className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {(() => {
                  const currentSit = EXAM_1_PARTE_6[surpriseStep];
                  const isOpen = isItemRevealed(currentSit.id);
                  return (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xl font-black text-slate-900 mb-1">
                          {currentSit.titleEs}
                        </h4>
                        <p className="text-sm font-semibold text-slate-700">
                          {currentSit.titleHy}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-500 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                          📋 {currentSit.instructionsHy}
                        </p>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => toggleTranslation(currentSit.id)}
                          className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all flex items-center gap-2"
                        >
                          {isOpen ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          <span>{isOpen ? 'Թաքցնել օրինակը' : 'Ver respuesta modelo — Տեսնել օրինակը'}</span>
                        </button>
                      </div>

                      {isOpen && (
                        <div className="space-y-4 pt-4 border-t border-slate-100 animate-fadeIn">
                          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-indigo-700">Խոսքի օրինակ (Monólogo modelo)</span>
                              <button
                                type="button"
                                onClick={(e) => handleSpeak(currentSit.modelSpeechEs, e)}
                                className="p-1 rounded text-slate-400 hover:text-indigo-600"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-sm font-semibold text-slate-900">
                              «{currentSit.modelSpeechEs}»
                            </p>
                            <p className="text-xs text-slate-600 border-t border-slate-200/60 pt-1.5">
                              🇦🇲 {currentSit.modelSpeechHy}
                            </p>
                          </div>

                          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-amber-800">Հարցի օրինակ (Pregunta de seguimiento)</span>
                              <button
                                type="button"
                                onClick={(e) => handleSpeak(currentSit.modelQuestionEs, e)}
                                className="p-1 rounded text-slate-400 hover:text-amber-700"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-sm font-semibold text-slate-900">
                              «{currentSit.modelQuestionEs}»
                            </p>
                            <p className="text-xs text-slate-600 border-t border-amber-200/60 pt-1.5">
                              🇦🇲 {currentSit.modelQuestionHy}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </section>
          </div>
        )}

        {/* ================= TAB: EXAMEN 2 ================= */}
        {activeTab === 'exam2' && (
          <div className="space-y-10">
            {/* Exam 2 Header Banner */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs relative overflow-hidden">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                  50 ACTIVIDADES
                </span>
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold">
                  100 PUNTOS
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                  A2–B1 · 7.º CURSO
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                EXAMEN ORAL 2 — ¡Habla como en España!
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
                {EXAM_2_INFO.instructionsHy}
              </p>
              <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Ինչպե՞ս օգտվել.</strong> Սեղմեք յուրաքանչյուր իրավիճակի կամ պատասխանի վրա՝ հայերեն թարգմանությունն ու բնական արտասանությունը տեսնելու համար։
                </p>
              </div>
            </div>

            {/* Parte 1: En el colegio */}
            <section className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  Parte 1. En el colegio — Դասընկերների հետ
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  10 situaciones · 20 puntos — Դպրոցական առօրյա հարցեր և բնական պատասխաններ։
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EXAM_2_PARTE_1.filter((item) =>
                  matchesSearch(item.spanish, item.armenian, item.modelAnswerSpanish || '')
                ).map((item) => (
                  <ExamInteractiveCard
                    key={item.id}
                    item={item}
                    isRevealed={isItemRevealed(item.id)}
                    isModelRevealed={revealedModels[item.id] || false}
                    onToggleTranslation={(e) => toggleTranslation(item.id, e)}
                    onToggleModel={(e) => toggleModelAnswer(item.id, e)}
                    onSpeak={(text, e) => handleSpeak(text, e)}
                    isSpeaking={currentlySpeakingText === item.spanish}
                    soundMuted={soundMuted}
                  />
                ))}
              </div>
            </section>

            {/* Parte 2: ¡Partido en directo! */}
            <section className="space-y-4 pt-6 border-t border-slate-200">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  Parte 2. ¡Partido en directo! — Ֆուտբոլային խաղի ընթացքում
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  10 situaciones · 20 puntos — Պատասխանիր արագ, ինչպես իրական խաղի ժամանակ։
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EXAM_2_PARTE_2.filter((item) =>
                  matchesSearch(item.spanish, item.armenian, item.modelAnswerSpanish || '')
                ).map((item) => (
                  <ExamInteractiveCard
                    key={item.id}
                    item={item}
                    isRevealed={isItemRevealed(item.id)}
                    isModelRevealed={revealedModels[item.id] || false}
                    onToggleTranslation={(e) => toggleTranslation(item.id, e)}
                    onToggleModel={(e) => toggleModelAnswer(item.id, e)}
                    onSpeak={(text, e) => handleSpeak(text, e)}
                    isSpeaking={currentlySpeakingText === item.spanish}
                    soundMuted={soundMuted}
                  />
                ))}
              </div>
            </section>

            {/* Parte 3: ¿Qué contestas? (Interactive Quiz) */}
            <section className="space-y-4 pt-6 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-amber-600 text-white text-xs flex items-center justify-center font-bold">
                      3
                    </span>
                    Parte 3. ¿Qué contestas? — Ընտրի՛ր ճիշտ արձագանքը
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    10 preguntas · 20 puntos — Ընտրիր ամենաբնական պատասխանը իսպաներենով։
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                    🎯 {quizCorrectCount} / 10 correctas
                  </div>
                  <button
                    type="button"
                    onClick={resetQuiz}
                    className="p-1.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-xs flex items-center gap-1 font-medium"
                    title="Կրկնել վարժությունը"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Կրկնել</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EXAM_2_PARTE_3.map((q) => {
                  const selectedIdx = quizAnswers[q.id];
                  const hasAnswered = selectedIdx !== undefined;

                  return (
                    <div
                      key={q.id}
                      className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center">
                          {q.number}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleSpeak(q.spanish, e)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-700 hover:bg-amber-50 transition-all"
                          title="Լսել հարցը"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Question prompt in Spanish */}
                      <div
                        onClick={() => toggleTranslation(q.id)}
                        className="cursor-pointer group"
                      >
                        <p className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {q.spanish}
                        </p>
                        {isItemRevealed(q.id) ? (
                          <p className="text-xs text-indigo-700 mt-1 font-medium bg-indigo-50/70 p-2 rounded-lg border border-indigo-100">
                            🇦🇲 {q.armenian}
                          </p>
                        ) : (
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            🇦🇲 Սեղմեք՝ հայերեն թարգմանության համար
                          </p>
                        )}
                      </div>

                      {/* Options */}
                      <div className="space-y-2">
                        {q.options?.map((opt, optIdx) => {
                          const isSelected = selectedIdx === optIdx;
                          let btnStyle =
                            'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100';

                          if (hasAnswered) {
                            if (opt.isCorrect) {
                              btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-1 ring-emerald-300';
                            } else if (isSelected && !opt.isCorrect) {
                              btnStyle = 'bg-rose-50 border-rose-400 text-rose-900 ring-1 ring-rose-300';
                            } else {
                              btnStyle = 'opacity-50 bg-slate-50 border-slate-200 text-slate-400';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              disabled={hasAnswered}
                              onClick={() => handleQuizSelect(q.id, optIdx, opt.isCorrect)}
                              className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start justify-between gap-2 ${btnStyle}`}
                            >
                              <div>
                                <span className="font-semibold block">{opt.text}</span>
                                {hasAnswered && (
                                  <span className="text-[11px] text-slate-500 block mt-0.5">
                                    🇦🇲 {opt.armenian}
                                  </span>
                                )}
                              </div>
                              {hasAnswered && opt.isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              )}
                              {hasAnswered && isSelected && !opt.isCorrect && (
                                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      {hasAnswered && q.explanation && (
                        <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs border border-slate-200/80">
                          <strong>💡 Պարզաբանում՝</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Parte 4: Continúa el diálogo */}
            <section className="space-y-4 pt-6 border-t border-slate-200">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-purple-600 text-white text-xs flex items-center justify-center font-bold">
                    4
                  </span>
                  Parte 4. Continúa el diálogo — Շարունակի՛ր երկխոսությունը
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  4 diálogos · 20 puntos — Աշակերտը խաղում է B դերը։ Սեղմեք B պատասխանը բացելու համար։
                </p>
              </div>

              <div className="space-y-6">
                {EXAM_2_PARTE_4.map((dialogue) => (
                  <RolePlayInteractiveView
                    key={dialogue.id}
                    dialogue={dialogue}
                    onSpeak={(text, e) => handleSpeak(text, e)}
                    isItemRevealed={isItemRevealed}
                    toggleTranslation={toggleTranslation}
                    soundMuted={soundMuted}
                  />
                ))}
              </div>
            </section>

            {/* Parte 5: Responde y cambia el tiempo */}
            <section className="space-y-4 pt-6 border-t border-slate-200">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                    5
                  </span>
                  Parte 5. Responde y cambia el tiempo — Տարբեր ժամանակներով պատասխանի՛ր
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  10 preguntas · 20 puntos — Փորձիր պատասխանել՝ օգտագործելով հարցի քերականական ժամանակը։
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EXAM_2_PARTE_5.map((item) => (
                  <ExamInteractiveCard
                    key={item.id}
                    item={item}
                    isRevealed={isItemRevealed(item.id)}
                    isModelRevealed={revealedModels[item.id] || false}
                    onToggleTranslation={(e) => toggleTranslation(item.id, e)}
                    onToggleModel={(e) => toggleModelAnswer(item.id, e)}
                    onSpeak={(text, e) => handleSpeak(text, e)}
                    isSpeaking={currentlySpeakingText === item.spanish}
                    soundMuted={soundMuted}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ================= TAB: PHRASES & BONUS ================= */}
        {activeTab === 'phrases' && (
          <div className="space-y-10">
            {/* 12 Emergency Phrases */}
            <section className="space-y-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                    🚨 12 Frases de emergencia
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Անհրաժեշտ քննության ժամանակ</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                  Արտահայտություններ, որոնք աշակերտը պետք է իմանա
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Սրանք հատկապես օգտակար են քննության ժամանակ, երբ հասկանում ես իսպաներենը, բայց չես կարողանում անմիջապես պատասխանել կամ պետք է ժամանակ շահել մտածելու համար։
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {FRASES_EMERGENCIA.filter((p) =>
                  matchesSearch(p.spanish, p.armenian, p.usageContext)
                ).map((phrase) => (
                  <div
                    key={phrase.id}
                    onClick={() => toggleTranslation(phrase.id)}
                    className="cursor-pointer bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                          🇪🇸 Español
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleSpeak(phrase.spanish, e)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                          title="Լսել արտասանությունը"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-base font-extrabold text-slate-900">
                        {phrase.spanish}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      {isItemRevealed(phrase.id) ? (
                        <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs sm:text-sm text-amber-950 font-semibold animate-fadeIn">
                          🇦🇲 {phrase.armenian}
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-400 font-medium">
                          🇦🇲 Սեղմեք՝ հայերեն թարգմանության համար
                        </div>
                      )}
                      <p className="text-[11px] text-slate-500 italic">
                        💡 {phrase.usageContext}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 15 Bonus Expressions */}
            <section className="space-y-4 pt-6 border-t border-slate-200">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    ✨ Bonus · 15 Expresiones
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Խոսիր ինչպես տեղացի</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                  15 expresiones para sonar más natural — Իսպանական կենդանի խոսք
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Օգտագործիր այս արտահայտությունները, որպեսզի քո իսպաներենը հնչի բնական, կենդանի և ճիշտ այնպես, ինչպես խոսում են Իսպանիայի դպրոցներում։
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {BONUS_EXPRESIONES.filter((p) =>
                  matchesSearch(p.spanish, p.armenian, p.usageContext)
                ).map((phrase) => (
                  <div
                    key={phrase.id}
                    onClick={() => toggleTranslation(phrase.id)}
                    className="cursor-pointer bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          🇪🇸 Español
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleSpeak(phrase.spanish, e)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                          title="Լսել արտասանությունը"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-base font-extrabold text-slate-900">
                        {phrase.spanish}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      {isItemRevealed(phrase.id) ? (
                        <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/70 text-xs sm:text-sm text-emerald-950 font-semibold animate-fadeIn">
                          🇦🇲 {phrase.armenian}
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-400 font-medium">
                          🇦🇲 Սեղմեք՝ հայերեն թարգմանության համար
                        </div>
                      )}
                      <p className="text-[11px] text-slate-500 italic">
                        💡 {phrase.usageContext}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ================= TAB: FLASHCARDS MODE ================= */}
        {activeTab === 'flashcards' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-black text-slate-900">
                Ինտերակտիվ Ֆլեշ-Քարտեր
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Սեղմեք քարտի վրա՝ այն շրջելու և հայերեն թարգմանությունը տեսնելու համար։
              </p>

              {/* Source Filters */}
              <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setCardSource('all');
                    setCardIndex(0);
                    setCardFlipped(false);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    cardSource === 'all'
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Բոլորը ({flashcardDeck.length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setCardSource('phrases');
                    setCardIndex(0);
                    setCardFlipped(false);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    cardSource === 'phrases'
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Արտահայտություններ
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setCardSource('exam1');
                    setCardIndex(0);
                    setCardFlipped(false);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    cardSource === 'exam1'
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Examen 1
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setCardSource('exam2');
                    setCardIndex(0);
                    setCardFlipped(false);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    cardSource === 'exam2'
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Examen 2
                </button>
              </div>
            </div>

            {/* Flashcard Component */}
            {currentFlashcard && (
              <div
                onClick={() => {
                  playClickSound();
                  setCardFlipped(!cardFlipped);
                }}
                className="cursor-pointer min-h-[300px] sm:min-h-[340px] bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-lg hover:shadow-xl hover:border-purple-300 transition-all flex flex-col justify-between text-center relative select-none"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
                    {currentFlashcard.tag}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">
                      {cardIndex + 1} / {flashcardDeck.length}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleSpeak(currentFlashcard.spanish, e)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-purple-100 hover:text-purple-700 transition-all text-slate-600"
                      title="Լսել իսպաներեն"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="my-auto py-6">
                  {!cardFlipped ? (
                    <div className="space-y-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        🇪🇸 Իսպաներեն (սեղմեք շրջելու համար)
                      </span>
                      <p className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                        {currentFlashcard.spanish}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 animate-fadeIn">
                      <span className="text-xs font-semibold uppercase tracking-wider text-purple-600">
                        🇦🇲 Հայերեն թարգմանություն
                      </span>
                      <p className="text-2xl sm:text-3xl font-black text-purple-900 leading-snug">
                        {currentFlashcard.armenian}
                      </p>
                      <p className="text-xs text-slate-500">
                        (Իսպաներեն՝ {currentFlashcard.spanish})
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
                  <span>🔄 Քարտը շրջելու համար սեղմեք վրան</span>
                </div>
              </div>
            )}

            {/* Carousel Controls */}
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrevCard}
                className="flex-1 py-3 px-4 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Նախորդը</span>
              </button>
              <button
                type="button"
                onClick={handleNextCard}
                className="flex-1 py-3 px-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md shadow-purple-600/20 flex items-center justify-center gap-2 transition-all"
              >
                <span>Հաջորդը</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB: EVALUACIÓN / SCORE SHEET ================= */}
        {activeTab === 'eval' && (
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Exam 1 Score Calculator */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div>
                  <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
                    Examen 1 Rubric
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    Resultado del examen 1 — Քննության գնահատում
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Ուսուցիչը կարող է գնահատել յուրաքանչյուր բաժինը։
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setEvalExam1({ p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, p6: 0 });
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 self-start"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Զրոյացնել միավորները</span>
                </button>
              </div>

              {/* Sliders / Number inputs for each of the 6 parts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <ScoreInputCard
                  label="1. Reacciones rápidas"
                  sublabel="Արագ արձագանքներ"
                  max={20}
                  value={evalExam1.p1}
                  onChange={(val) => setEvalExam1((prev) => ({ ...prev, p1: val }))}
                />
                <ScoreInputCard
                  label="2. Problemas con compañeros"
                  sublabel="Իրավիճակներ դասընկերների հետ"
                  max={16}
                  value={evalExam1.p2}
                  onChange={(val) => setEvalExam1((prev) => ({ ...prev, p2: val }))}
                />
                <ScoreInputCard
                  label="3. Fútbol y entrenador"
                  sublabel="Ֆուտբոլ և մարզիչ"
                  max={16}
                  value={evalExam1.p3}
                  onChange={(val) => setEvalExam1((prev) => ({ ...prev, p3: val }))}
                />
                <ScoreInputCard
                  label="4. Role-play"
                  sublabel="Երկխոսություններ"
                  max={20}
                  value={evalExam1.p4}
                  onChange={(val) => setEvalExam1((prev) => ({ ...prev, p4: val }))}
                />
                <ScoreInputCard
                  label="5. Cambios de tiempo"
                  sublabel="Ժամանակների փոփոխություն"
                  max={16}
                  value={evalExam1.p5}
                  onChange={(val) => setEvalExam1((prev) => ({ ...prev, p5: val }))}
                />
                <ScoreInputCard
                  label="6. Situaciones sorpresa"
                  sublabel="Անսպասելի իրավիճակներ"
                  max={12}
                  value={evalExam1.p6}
                  onChange={(val) => setEvalExam1((prev) => ({ ...prev, p6: val }))}
                />
              </div>

              {/* Score Display Card */}
              <div className={`p-6 rounded-2xl border text-center space-y-2 transition-all ${feedbackExam1.color}`}>
                <span className="text-xs font-bold uppercase tracking-wider">
                  Puntuación final Examen 1
                </span>
                <div className="text-4xl sm:text-5xl font-black">
                  {totalScoreExam1} / 100
                </div>
                <p className="text-sm font-bold">
                  {feedbackExam1.textEs}
                </p>
                <p className="text-xs">
                  {feedbackExam1.textHy}
                </p>
              </div>
            </div>

            {/* Exam 2 Score Calculator */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div>
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                    Examen 2 Rubric
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    Evaluación Examen 2 — Գնահատման թերթիկ
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    5 բաժիններ՝ յուրաքանչյուրը 20 միավոր։
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setEvalExam2({ p1: 0, p2: 0, p3: 0, p4: 0, p5: 0 });
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 self-start"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Զրոյացնել միավորները</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <ScoreInputCard
                  label="1. En el colegio"
                  sublabel="Դասընկերների հետ"
                  max={20}
                  value={evalExam2.p1}
                  onChange={(val) => setEvalExam2((prev) => ({ ...prev, p1: val }))}
                />
                <ScoreInputCard
                  label="2. Fútbol en directo"
                  sublabel="Ֆուտբոլային խաղ"
                  max={20}
                  value={evalExam2.p2}
                  onChange={(val) => setEvalExam2((prev) => ({ ...prev, p2: val }))}
                />
                <ScoreInputCard
                  label="3. Respuestas naturales"
                  sublabel="Բնական պատասխաններ (Quiz)"
                  max={20}
                  value={evalExam2.p3}
                  onChange={(val) => setEvalExam2((prev) => ({ ...prev, p3: val }))}
                />
                <ScoreInputCard
                  label="4. Role-play"
                  sublabel="Շարունակիր երկխոսությունը"
                  max={20}
                  value={evalExam2.p4}
                  onChange={(val) => setEvalExam2((prev) => ({ ...prev, p4: val }))}
                />
                <ScoreInputCard
                  label="5. Diferentes tiempos"
                  sublabel="Տարբեր ժամանակներով"
                  max={20}
                  value={evalExam2.p5}
                  onChange={(val) => setEvalExam2((prev) => ({ ...prev, p5: val }))}
                />
              </div>

              {/* Score Display Card */}
              <div className={`p-6 rounded-2xl border text-center space-y-2 transition-all ${feedbackExam2.color}`}>
                <span className="text-xs font-bold uppercase tracking-wider">
                  Nota final Examen 2
                </span>
                <div className="text-4xl sm:text-5xl font-black">
                  {totalScoreExam2} / 100
                </div>
                <p className="text-sm font-bold">
                  {feedbackExam2.textEs}
                </p>
                <p className="text-xs">
                  {feedbackExam2.textHy}
                </p>
              </div>
            </div>

            {/* Pedagogical recommendations */}
            <div className="p-6 rounded-3xl bg-indigo-50/80 border border-indigo-200/80 text-xs sm:text-sm text-indigo-950 space-y-3">
              <h4 className="font-extrabold text-base text-indigo-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-700" />
                Առաջարկություն ուսուցչին և ծնողին
              </h4>
              <p className="leading-relaxed">
                Մի՛ պահանջիր, որ աշակերտը պատասխանի ճիշտ այնպես, ինչպես գրված է։ Եթե կարողանում է միտքը փոխանցել բնական իսպաներենով, ընդունի՛ր պատասխանը։ Այնուհետև հարցրու <em>«¿Y por qué?»</em>, <em>«¿Qué pasó después?»</em>, <em>«¿Y tú qué harías?»</em> կամ <em>«¿Cómo se lo dirías a tu compañero?»</em>։ Հենց այս հավելյալ հարցերն են զարգացնում իրական խոսակցական հմտությունը։
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            🇪🇸 <strong>EXAMEN ORAL DE ESPAÑOL</strong> — 7.º CURSO · A2–B1
          </div>
          <div className="text-center sm:text-right">
            <span>🇦🇲 Իսպաներեն և հայերեն խոսակցական համակարգ</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ---------------- Helper Components ----------------

interface ExamInteractiveCardProps {
  item: ExamItem;
  isRevealed: boolean;
  isModelRevealed: boolean;
  onToggleTranslation: (e: React.MouseEvent) => void;
  onToggleModel: (e: React.MouseEvent) => void;
  onSpeak: (text: string, e: React.MouseEvent) => void;
  isSpeaking: boolean;
  soundMuted: boolean;
}

function ExamInteractiveCard({
  item,
  isRevealed,
  isModelRevealed,
  onToggleTranslation,
  onToggleModel,
  onSpeak,
  isSpeaking,
  soundMuted,
}: ExamInteractiveCardProps) {
  return (
    <div
      onClick={onToggleTranslation}
      className={`cursor-pointer group relative bg-white rounded-2xl p-5 border transition-all space-y-3 flex flex-col justify-between ${
        isRevealed
          ? 'border-indigo-400 shadow-md ring-1 ring-indigo-200/50'
          : 'border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
      }`}
    >
      <div>
        {/* Top Badges & Speaker */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
              {item.number}
            </span>
            {item.speaker && (
              <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                {item.speaker}
              </span>
            )}
            {item.notes && (
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/50">
                {item.notes}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => onSpeak(item.spanish, e)}
            className={`p-1.5 rounded-xl border transition-all ${
              isSpeaking
                ? 'bg-indigo-600 text-white border-indigo-600 animate-pulse'
                : 'text-slate-400 border-slate-200 hover:text-indigo-600 hover:bg-indigo-50'
            }`}
            title="Լսել իսպաներեն արտասանությունը"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Spanish Text (Target to Click) */}
        <div className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
          {item.spanish}
        </div>
      </div>

      {/* Armenian Translation Box */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        {isRevealed ? (
          <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200/60 text-sm sm:text-base text-indigo-950 font-semibold leading-relaxed animate-fadeIn">
            <span className="text-xs font-bold text-indigo-700 block mb-1">
              🇦🇲 Հայերեն թարգմանություն՝
            </span>
            {item.armenian}
          </div>
        ) : (
          <div className="text-xs sm:text-sm text-slate-400 font-medium flex items-center gap-1.5 py-0.5">
            <span>🇦🇲 Սեղմեք՝ հայերեն թարգմանությունը տեսնելու համար</span>
          </div>
        )}

        {/* Model Answer Toggle if available */}
        {item.modelAnswerSpanish && (
          <div>
            <button
              type="button"
              onClick={onToggleModel}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 py-1 flex items-center gap-1"
            >
              <span>{isModelRevealed ? '▲ Թաքցնել պատասխանը' : '▼ Ver respuesta modelo — Տես պատասխանի օրինակը'}</span>
            </button>

            {isModelRevealed && (
              <div className="mt-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm sm:text-base space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-800 text-xs">
                    🇪🇸 Respuesta modelo:
                  </span>
                  <button
                    type="button"
                    onClick={(e) => onSpeak(item.modelAnswerSpanish || '', e)}
                    className="p-1 rounded text-slate-400 hover:text-emerald-700"
                    title="Լսել պատասխանը"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-bold text-slate-900 leading-relaxed">
                  {item.modelAnswerSpanish}
                </p>
                {item.modelAnswerArmenian && (
                  <p className="text-xs sm:text-sm text-slate-700 font-medium pt-1.5 border-t border-slate-200/60 leading-relaxed">
                    🇦🇲 {item.modelAnswerArmenian}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface RolePlayInteractiveViewProps {
  dialogue: {
    id: string;
    titleEs: string;
    titleHy: string;
    turns: {
      speaker: 'A' | 'B';
      roleTitleEs?: string;
      roleTitleHy?: string;
      textEs: string;
      textHy: string;
      promptHy?: string;
      modelAnswerEs?: string;
      modelAnswerHy?: string;
    }[];
  };
  onSpeak: (text: string, e: React.MouseEvent) => void;
  isItemRevealed: (id: string) => boolean;
  toggleTranslation: (id: string, e?: React.MouseEvent) => void;
  soundMuted: boolean;
}

function RolePlayInteractiveView({
  dialogue,
  onSpeak,
  isItemRevealed,
  toggleTranslation,
}: RolePlayInteractiveViewProps) {
  const [showModels, setShowModels] = useState(false);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h4 className="text-base sm:text-lg font-black text-slate-900">
            {dialogue.titleEs}
          </h4>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {dialogue.titleHy}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowModels(!showModels)}
          className="text-xs font-bold px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 self-start transition-all"
        >
          {showModels ? 'Թաքցնել B մոդելները' : 'Ver diálogo modelo — Տեսնել B-ի պատասխանները'}
        </button>
      </div>

      <div className="space-y-4">
        {dialogue.turns.map((turn, tIdx) => {
          const turnId = `${dialogue.id}-t-${tIdx}`;
          const isOpen = isItemRevealed(turnId);

          if (turn.speaker === 'A') {
            return (
              <div
                key={tIdx}
                onClick={(e) => toggleTranslation(turnId, e)}
                className="cursor-pointer flex items-start gap-3 p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 hover:border-indigo-300 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                  A
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-900">
                      {turn.roleTitleEs || 'A'}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => onSpeak(turn.textEs, e)}
                      className="p-1 rounded text-slate-400 hover:text-indigo-600"
                      title="Լսել իսպաներեն"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {turn.textEs}
                  </p>
                  {isOpen ? (
                    <p className="text-sm sm:text-base text-indigo-900 font-medium pt-1 border-t border-indigo-200/50 leading-relaxed">
                      🇦🇲 {turn.textHy}
                    </p>
                  ) : (
                    <p className="text-xs sm:text-sm text-indigo-500/80 font-medium">
                      🇦🇲 Սեղմեք՝ հայերեն թարգմանության համար
                    </p>
                  )}
                </div>
              </div>
            );
          }

          // Speaker B (Student)
          return (
            <div
              key={tIdx}
              className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 ml-4 sm:ml-8"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                B
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800">
                    B (Աշակերտ)
                  </span>
                  {showModels && turn.modelAnswerEs && (
                    <button
                      type="button"
                      onClick={(e) => onSpeak(turn.modelAnswerEs || '', e)}
                      className="p-1 rounded text-slate-400 hover:text-emerald-700"
                      title="Լսել B պատասխանը"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {turn.promptHy && (
                  <p className="text-xs sm:text-sm text-slate-700 font-medium bg-white p-3 rounded-xl border border-slate-200/70 leading-relaxed">
                    📝 <strong>Քո առաջադրանքը՝</strong> {turn.promptHy}
                  </p>
                )}

                {showModels && turn.modelAnswerEs ? (
                  <div className="space-y-1.5 bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200 animate-fadeIn">
                    <span className="text-xs font-bold text-emerald-800 block">
                      🇪🇸 Պատասխանի օրինակ՝
                    </span>
                    <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {turn.modelAnswerEs}
                    </p>
                    {turn.modelAnswerHy && (
                      <p className="text-sm sm:text-base text-slate-700 font-medium pt-1.5 border-t border-emerald-200/60 leading-relaxed">
                        🇦🇲 {turn.modelAnswerHy}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm text-slate-400 italic">
                    Փորձի՛ր ինքդ պատասխանել իսպաներեն։
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface ScoreInputCardProps {
  label: string;
  sublabel: string;
  max: number;
  value: number;
  onChange: (val: number) => void;
}

function ScoreInputCard({ label, sublabel, max, value, onChange }: ScoreInputCardProps) {
  return (
    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between space-y-3">
      <div>
        <div className="text-xs font-bold text-slate-800 leading-tight">{label}</div>
        <div className="text-[11px] text-slate-500 mt-0.5">{sublabel}</div>
      </div>

      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200/70">
        <span className="text-xs font-semibold text-slate-400">
          0 – {max} pts
        </span>
        <div className="flex items-center gap-1.5">
          <input
            type="number"
            min={0}
            max={max}
            value={value}
            onChange={(e) => {
              const num = parseInt(e.target.value, 10);
              onChange(isNaN(num) ? 0 : Math.max(0, Math.min(max, num)));
            }}
            className="w-16 px-2 py-1 bg-white border border-slate-300 rounded-lg text-center font-bold text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <span className="text-xs font-bold text-slate-600">/{max}</span>
        </div>
      </div>
    </div>
  );
}
