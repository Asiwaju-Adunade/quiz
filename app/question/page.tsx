"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/ui/navbar";
import Button from "@/components/ui/button";

// ─── Topic → API category mapping ────────────────────────────────────────────
const TOPIC_CATEGORY_MAP: Record<string, string> = {
  Mathematics: "mathematics",
  Physics: "science",
  Chemistry: "science",
  Biology: "science",
  "Computer Science": "science",
  English: "language",
  History: "history",
  Geography: "geography",
  Art: "arts_and_literature",
  Music: "music",
  Literature: "arts_and_literature",
  "Agricultural Science": "science",
  "Health Education": "science",
  "Home Economics": "food_and_drink",
  "Current Affairs": "society_and_culture",
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface TriviaApiQuestion {
  id: string;
  category: string;
  question: { text: string };
  correctAnswer: string;
  incorrectAnswers: string[];
  difficulty: string;
}

interface Question {
  id: string;
  topic: string;
  text: string;
  options: { A: string; B: string; C: string; D: string };
  answer: "A" | "B" | "C" | "D";
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function mapApiQuestion(raw: TriviaApiQuestion, topic: string): Question {
  const allOptions = shuffleArray([
    raw.correctAnswer,
    ...raw.incorrectAnswers.slice(0, 3),
  ]);
  const keys = ["A", "B", "C", "D"] as const;
  const options = Object.fromEntries(
    keys.map((k, i) => [k, allOptions[i] ?? "—"])
  ) as { A: string; B: string; C: string; D: string };
  const correctKey = keys[allOptions.indexOf(raw.correctAnswer)] ?? "A";
  return { id: raw.id, topic, text: raw.question.text, options, answer: correctKey };
}

async function fetchQuestionsForTopics(topics: string[]): Promise<Question[]> {
  const fetched: Question[] = [];
  for (const topic of topics) {
    const category = TOPIC_CATEGORY_MAP[topic] ?? "general_knowledge";
    const url = `https://the-trivia-api.com/v2/questions?categories=${category}&limit=2`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: TriviaApiQuestion[] = await res.json();
      data.forEach((q) => fetched.push(mapApiQuestion(q, topic)));
    } catch (err) {
      console.error(`Failed to fetch questions for "${topic}":`, err);
    }
  }
  return fetched;
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function Page() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | null>>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [loadError, setLoadError] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const questionsRef = useRef<Question[]>([]);
  const answersRef = useRef<Record<number, string | null>>({});

  useEffect(() => { questionsRef.current = questions; }, [questions]);
  useEffect(() => { answersRef.current = answers; }, [answers]);

  // ── Finish quiz ───────────────────────────────────────────────────────────
  const handleFinish = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsFinished(true);
    let totalScore = 0;
    questionsRef.current.forEach((q, idx) => {
      if (answersRef.current[idx] === q.answer) totalScore += 1;
    });
    setScore(totalScore);
  }, []);

  // ── Fetch questions on mount ──────────────────────────────────────────────
  useEffect(() => {
    const storedTopics = localStorage.getItem("selectedTopics");
    if (!storedTopics) { router.push("/starttask"); return; }
    const topics: string[] = JSON.parse(storedTopics);
    if (topics.length < 5) { router.push("/starttask"); return; }

    fetchQuestionsForTopics(topics)
      .then((qs) => {
        if (qs.length === 0) {
          setLoadError("Could not load questions. Please check your connection.");
          return;
        }
        setQuestions(qs);
        // Global timer = 30 s × total questions
        setTimeLeft(qs.length * 30);
      })
      .catch(() => setLoadError("Failed to load questions. Please try again."));
  }, [router]);

  // ── Countdown timer ───────────────────────────────────────────────────────
  useEffect(() => {
    if (timeLeft === null || isFinished) return;
    if (timeLeft <= 0) { handleFinish(); return; }
    timerRef.current = setTimeout(() => {
      setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [timeLeft, isFinished, handleFinish]);

  // ── Navigation ────────────────────────────────────────────────────────────
  const handleOptionSelect = (option: string) =>
    setAnswers((prev) => ({ ...prev, [currentIndex]: option }));

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex((p) => p + 1);
    else handleFinish();
  };

  const handleSkip = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex((p) => p + 1);
    else handleFinish();
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((p) => p - 1);
  };

  // ── Helpers ───────────────────────────────────────────────────────────────
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const timerPercent =
    timeLeft !== null && questions.length > 0
      ? (timeLeft / (questions.length * 30)) * 100
      : 100;

  const timerColor =
    timerPercent > 50 ? "#22c55e" : timerPercent > 25 ? "#f59e0b" : "#ef4444";

  // ── Error state ───────────────────────────────────────────────────────────
  if (loadError) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex flex-col justify-center items-center h-[70vh] gap-5 px-6 text-center">
          <p className="text-2xl font-bold text-red-500">Oops!</p>
          <p className="text-gray-600 max-w-sm">{loadError}</p>
          <Button variant="primary" label="Go Back" onClick={() => router.push("/starttask")} />
        </div>
      </div>
    );
  }

  // ── Still loading or no questions yet ─────────────────────────────────────
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex flex-col justify-center items-center h-[70vh] gap-5">
          <div className="w-14 h-14 rounded-full border-4 border-quiz-yellow border-t-transparent animate-spin" />
          <p className="text-xl font-semibold text-gray-700">Loading…</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-white relative">
      <Navbar />

      {/* ── Quiz Container ─────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-5 py-10">

        {/* ── Stepper (display-only, non-clickable) ────────────────────────── */}
        <div className="flex flex-wrap items-center justify-center gap-0 mb-8 overflow-x-auto pb-1">
          {questions.map((_, idx) => {
            const isCurrentStep = idx === currentIndex;
            const isPast = idx < currentIndex;
            return (
              <div key={idx} className="flex items-center">
                {/* Step circle */}
                <div
                  className={`w-9 h-9 rounded-lg text-sm font-bold flex items-center justify-center shrink-0 border-2 select-none transition-all duration-300
                    ${isCurrentStep
                      ? "bg-quiz-yellow border-quiz-yellow text-black scale-110 shadow-md shadow-quiz-yellow/30"
                      : isPast
                        ? "bg-quiz-yellow border-quiz-yellow text-black"
                        : "bg-white border-gray-200 text-gray-400"
                    }`}
                >
                  {idx + 1}
                </div>
                {/* Connector line between steps */}
                {idx < questions.length - 1 && (
                  <div
                    className={`h-0.5 w-6 shrink-0 transition-all duration-300 ${
                      isPast ? "bg-quiz-yellow" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* ── Question text ─────────────────────────────────────────────────── */}
        <div className="mb-8 min-h-[80px]">
          <h3 className="text-2xl font-semibold text-gray-900 leading-snug">
            {currentQuestion.text}
          </h3>
        </div>

        {/* ── Options ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-5 mb-14">
          {(["A", "B", "C", "D"] as const).map((key) => {
            const isSelected = answers[currentIndex] === key;
            const optionText = currentQuestion.options[key];
            return (
              <button
                key={key}
                onClick={() => handleOptionSelect(key)}
                className={`relative text-left cursor-pointer py-5 px-5 font-bold text-3xl flex justify-between  items-center 
                  ${isSelected
                    ? " bg-quiz-yellow text-white"
                    : " bg-quiz-dark-gray text-black"
                  }`}
              >
                {/* Option letter — top-left corner, small square badge */}
                <span
                  className={`absolute top-2 left-2 flex items-center justify-center text-sm font-bold 
                    ${isSelected ? " text-white" : "text-black"}`}
                >
                  {key}
                </span>
                <span className={`font-medium text-base ${isSelected ? "text-gray-900" : "text-gray-700"}`}>
                  {optionText}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Navigation Buttons + centred timer ───────────────────────────── */}
        <div className="flex justify-between items-center">
          <Button
            label="← Previous"
            disabled={currentIndex === 0}
            onClick={handlePrevious}
            className=" bg-quiz-dark-gray px-8!"
          />

          {/* Timer — centred between Previous and Skip/Next */}
          <div
            className="flex items-center gap-2 px-4 py-2  transition-all"
            style={{ background: `${timerColor}15` }}
          >
            <Image src="/svgs/Time.svg" alt="Timer" width={22} height={22} />
            <span
              className="font-bold text-base tracking-widest tabular-nums"
              style={{ color: timerColor }}
            >
              {timeLeft !== null ? formatTime(timeLeft) : "00:00"}
            </span>
          </div>

          <div className="flex gap-3">
            <Button
              label="Skip"
              onClick={handleSkip}
              className=" px-8!  text-quiz-yellow!"
            />
            {currentIndex < questions.length - 1 ? (
              <Button
                variant="primary"
                label="Next →"
                onClick={handleNext}
                disabled={!answers[currentIndex]}
                className={` text-white px-10! transition-opacity ${
                  !answers[currentIndex] ? "opacity-40 cursor-not-allowed" : ""
                }`}
              />
            ) : (
              <Button
                variant="primary"
                label="Submit"
                onClick={handleFinish}
                disabled={!answers[currentIndex]}
                className={` text-white px-10! transition-opacity ${
                  !answers[currentIndex] ? "opacity-40 cursor-not-allowed" : ""
                }`}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Result Modal ──────────────────────────────────────────────────────── */}
      {isFinished && (
        <div className="fixed inset-1 bg-black/50  flex justify-center items-center ">
          <div className="bg-white max-w-4xl  p-8 w-full  ">

            {/* modal.svg with score overlaid on its circular area */}
            <div className="relative w-full flex items-center justify-center">
              <Image
                src="/svgs/modal.svg"
                alt="Quiz Result"
                width={450}
                height={350}
                priority
              />
              {/* Score overlaid on the circular graphic in the SVG */}
              <div className="absolute inset-0  flex flex-col  items-center justify-center">
                <p className="text-3xl font-bold text-white"> Your Score</p>
                <span className="text-9xl font-bold text-white">
                  {score}
                </span>
                
              </div>
            </div>

            
            {/* complete button part */}
            <div className="flex justify-end">
                <Button
                      variant="primary"
                      label="Complete"
                      onClick={() => router.push("/")}
                />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}