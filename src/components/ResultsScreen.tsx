/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  Sparkles,
  RefreshCw,
  BookOpen,
  ArrowRight,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react';
import {
  AssessmentResult,
  VideoInfo,
  Question,
  ConceptMastery,
  TopicExplanation,
  MiniQuiz,
} from '../types/assessment';
import { ConceptDeepDiveModal } from './ConceptDeepDiveModal';
import { MiniQuizModal } from './MiniQuizModal';
import {
  MOCK_TOPIC_EXPLANATIONS,
  MOCK_MINI_QUIZZES,
} from '../data/mockData';

interface ResultsScreenProps {
  result: AssessmentResult;
  video: VideoInfo;
  questions: Question[];
  userAnswers: Record<string, { selectedOption?: number; textResponse?: string }>;
  onRetake: () => void;
  onNewVideo: () => void;
  onUpdateTopicMastery: (topic: string, newScore: number) => void;
  onOpenVideoModal?: (timestamp: string, topic?: string) => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  result,
  video,
  questions,
  userAnswers,
  onRetake,
  onNewVideo,
  onUpdateTopicMastery,
  onOpenVideoModal,
}) => {
  const [activeModalExplanation, setActiveModalExplanation] =
    useState<TopicExplanation | null>(null);
  const [activeMiniQuiz, setActiveMiniQuiz] = useState<MiniQuiz | null>(null);
  const [activeTopicForMiniQuiz, setActiveTopicForMiniQuiz] = useState<string | null>(null);
  const [showDetailedReview, setShowDetailedReview] = useState(true);
  const [videoTimestampNote, setVideoTimestampNote] = useState<string | null>(null);

  const handleExplain = (topic: string) => {
    const exp = MOCK_TOPIC_EXPLANATIONS[topic] || {
      topic,
      simpleExplanation: `In-depth breakdown of ${topic} as presented in the lecture.`,
      importantPoints: [
        `Fundamental definitions and usage in ${video.title}`,
        'Core syntax and algorithmic flow',
        'Standard best practices and edge cases',
      ],
      example: `# Example code illustrating ${topic}\nprint("Understanding ${topic}")`,
      commonMistake: `Misinterpreting how ${topic} interacts with surrounding program state.`,
      sourceTimestamp: '12:00',
      quickPracticeQuestion: {
        question: `Which statement best reflects proper usage of ${topic}?`,
        options: ['Direct implementation', 'Syntactic sugar', 'Library abstraction', 'Hardware register'],
        correctAnswer: 0,
        explanation: `${topic} provides explicit structural control over application logic.`,
      },
    };
    setActiveModalExplanation(exp);
  };

  const handleLaunchMiniQuiz = (topic: string) => {
    const quiz = MOCK_MINI_QUIZZES[topic] || {
      topic,
      questions: [
        {
          id: `mq_${topic}_1`,
          question: `What is the primary architectural advantage of ${topic}?`,
          options: [
            'Direct memory compression',
            'Code modularity and clear abstraction',
            'Bypassing CPU cycle limits',
            'Static variable indexing',
          ],
          correctAnswer: 1,
          explanation: `${topic} enhances maintainability and modular system design.`,
          sourceTimestamp: '10:00',
        },
        {
          id: `mq_${topic}_2`,
          question: `How is ${topic} typically tested in unit test suites?`,
          options: [
            'By verifying expected behavior and state changes',
            'By measuring monitor refresh rate',
            'By counting lines of raw bytes',
            'By deleting configuration files',
          ],
          correctAnswer: 0,
          explanation: 'Unit tests inspect behavior, return values, and state preservation.',
          sourceTimestamp: '14:20',
        },
      ],
    };
    setActiveMiniQuiz(quiz);
    setActiveTopicForMiniQuiz(topic);
  };

  // Status color styles
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Mastered':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Strong':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Needs Review':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Weak':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const getProgressColorClass = (category: string) => {
    switch (category) {
      case 'Mastered':
        return 'bg-emerald-500';
      case 'Strong':
        return 'bg-blue-500';
      case 'Needs Review':
        return 'bg-amber-500';
      case 'Weak':
        return 'bg-rose-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-10 animate-fadeIn">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700">
            <Trophy className="w-4 h-4 text-indigo-600" />
            <span>Diagnostic Learning Report</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Assessment Results & Concept Mastery
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 truncate max-w-xl">
            Evaluated against: {video.title} ({video.channel})
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onRetake}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>
          <button
            onClick={onNewVideo}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <span>Analyze New Video</span>
          </button>
        </div>
      </div>

      {/* Section 10: Overall Score Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Overall Score Dial */}
        <div className="md:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Estimated Overall Mastery
          </span>

          <div className="py-6 flex flex-col items-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-slate-100"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className={`transition-all duration-1000 ease-out ${
                    result.percentage >= 75
                      ? 'stroke-indigo-600'
                      : result.percentage >= 50
                      ? 'stroke-amber-500'
                      : 'stroke-rose-500'
                  }`}
                  strokeWidth="8"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * result.percentage) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">
                  {result.percentage}%
                </span>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Score
                </span>
              </div>
            </div>

            <div className="mt-4">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  result.percentage >= 75
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : result.percentage >= 50
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
              >
                {result.status}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Correct</span>
              <span className="font-bold text-emerald-600 font-mono text-sm">
                {result.correctCount}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Incorrect</span>
              <span className="font-bold text-rose-600 font-mono text-sm">
                {result.incorrectCount}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Total</span>
              <span className="font-bold text-slate-800 font-mono text-sm">
                {result.correctCount + result.incorrectCount}
              </span>
            </div>
          </div>
        </div>

        {/* Section 11: Concept-Level Mastery Analysis */}
        <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>Concept-Level Mastery</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Granular performance indexed across lecture concepts.
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Rubric: 90% Mastered / 75% Strong / 50% Review / &lt;50% Weak
              </span>
            </div>

            {/* List of Concepts with Progress Bars */}
            <div className="space-y-4 pt-1">
              {result.conceptMasteries.map((cm) => (
                <div key={cm.topic} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{cm.topic}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-700">
                        {cm.percentage}%
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${getCategoryBadgeClass(
                          cm.category
                        )}`}
                      >
                        {cm.category}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${getProgressColorClass(
                        cm.category
                      )}`}
                      style={{ width: `${cm.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-6 flex items-center justify-between text-xs text-slate-400">
            <span>Diagnosed from video-grounded questions</span>
            <span className="text-indigo-600 font-medium">Adaptive Gap Detection Active</span>
          </div>
        </div>
      </div>

      {/* Section 12: Knowledge Gap Detection (Areas to Improve) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Areas to Improve</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Targeted concepts scoring below 75% that require reinforced practice.
            </p>
          </div>
          <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded">
            {result.weakConcepts.length} Topics Requiring Attention
          </span>
        </div>

        {result.weakConcepts.length === 0 ? (
          <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-emerald-900">
              Outstanding Comprehension!
            </h3>
            <p className="text-xs text-emerald-700 max-w-md mx-auto">
              All tested concepts achieved Strong or Mastered thresholds. You have demonstrated firm grasp of this lecture material.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {result.weakConcepts.map((weak) => (
              <div
                key={weak.topic}
                className="p-5 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-4 hover:border-slate-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <h3 className="text-base font-bold text-slate-900">
                      {weak.topic}
                    </h3>
                    <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                      Score: {weak.percentage}%
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Relevant video section: {weak.sourceTimestamp}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-white p-3.5 rounded-lg border border-slate-200">
                  {weak.diagnostics}
                </p>

                {/* 3 Actionable Buttons from User Brief */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  {/* Button 1: Review This Section */}
                  <button
                    onClick={() => {
                      if (onOpenVideoModal) {
                        onOpenVideoModal(weak.sourceTimestamp, weak.topic);
                      } else {
                        setVideoTimestampNote(
                          videoTimestampNote === weak.topic ? null : weak.topic
                        );
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
                    <span>Review Video ({weak.sourceTimestamp})</span>
                  </button>

                  {/* Button 2: Explain This Concept (AI Tutor) */}
                  <button
                    onClick={() => handleExplain(weak.topic)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Explain This Concept</span>
                  </button>

                  {/* Button 3: Take Mini Quiz */}
                  <button
                    onClick={() => handleLaunchMiniQuiz(weak.topic)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-2xs transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>Take Mini Quiz</span>
                  </button>
                </div>

                {/* Timestamp details popover */}
                {videoTimestampNote === weak.topic && (
                  <div className="p-3 bg-slate-900 text-slate-200 rounded-lg text-xs space-y-1 animate-fadeIn">
                    <p className="font-semibold text-indigo-300">
                      YouTube Timestamp Jump Reference:
                    </p>
                    <p className="text-slate-300">
                      Open <strong className="text-white">{video.title}</strong> at interval{' '}
                      <span className="font-mono text-amber-300">{weak.sourceTimestamp}</span>{' '}
                      to re-watch the instructor's direct explanation of {weak.topic}.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detailed Question Review Section */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <button
          onClick={() => setShowDetailedReview(!showDetailedReview)}
          className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50/50 transition-colors cursor-pointer"
        >
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-slate-900">
              Detailed Question Review & Semantic Feedback
            </h3>
            <p className="text-xs text-slate-500">
              Inspect your answers, correct answers, and AI semantic evaluation reports.
            </p>
          </div>
          {showDetailedReview ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {showDetailedReview && (
          <div className="p-6 pt-0 space-y-6 border-t border-slate-100">
            {questions.map((q, idx) => {
              const ans = userAnswers[q.id] || {};
              const isMCQ = q.type === 'mcq';
              const isCorrectMCQ = isMCQ && ans.selectedOption === q.correctAnswer;
              const shortEval = result.shortAnswerEvaluations[q.id];

              return (
                <div
                  key={q.id}
                  className="p-5 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-slate-700">Question {idx + 1}</span>
                      <span className="text-slate-300">·</span>
                      <span className="font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                        {q.topic}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-slate-400 font-mono">Video {q.sourceTimestamp}</span>
                      {isMCQ ? (
                        <span
                          className={`font-bold flex items-center gap-1 ${
                            isCorrectMCQ ? 'text-emerald-600' : 'text-rose-600'
                          }`}
                        >
                          {isCorrectMCQ ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Correct</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4" />
                              <span>Incorrect</span>
                            </>
                          )}
                        </span>
                      ) : (
                        shortEval && (
                          <span
                            className={`font-bold flex items-center gap-1 ${
                              shortEval.isCorrect ? 'text-emerald-600' : 'text-amber-600'
                            }`}
                          >
                            <span>
                              Semantic Score: {shortEval.score}/{shortEval.maxScore}
                            </span>
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 leading-snug">
                    {q.question}
                  </p>

                  {isMCQ ? (
                    <div className="space-y-1.5 pt-1 text-xs">
                      {q.options.map((opt, optIdx) => {
                        const isStudentChoice = ans.selectedOption === optIdx;
                        const isCorrectOption = q.correctAnswer === optIdx;

                        let optClass = 'bg-white border-slate-200 text-slate-700';
                        if (isCorrectOption) {
                          optClass = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold';
                        } else if (isStudentChoice && !isCorrectOption) {
                          optClass = 'bg-rose-50 border-rose-300 text-rose-900 line-through';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-2.5 rounded-lg border flex items-center justify-between ${optClass}`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold">
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              <span>{opt}</span>
                            </div>
                            {isStudentChoice && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                                Your Choice
                              </span>
                            )}
                          </div>
                        );
                      })}

                      <p className="text-xs text-slate-500 pt-1 leading-relaxed">
                        <strong className="text-slate-700">Explanation:</strong> {q.explanation}
                      </p>
                    </div>
                  ) : (
                    /* Short Answer Evaluation Details */
                    <div className="space-y-3 pt-1 text-xs">
                      <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
                        <span className="text-slate-400 font-semibold block text-[11px] uppercase">
                          Your Submitted Answer:
                        </span>
                        <p className="text-slate-800 italic">
                          "{ans.textResponse || '(No answer provided)'}"
                        </p>
                      </div>

                      {shortEval && (
                        <div className="p-3.5 rounded-lg bg-indigo-50/60 border border-indigo-200/60 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-indigo-900">
                              Semantic Evaluation Feedback:
                            </span>
                            <span className="font-mono font-bold text-indigo-700">
                              {shortEval.score}/10
                            </span>
                          </div>
                          <p className="text-indigo-950 leading-relaxed">
                            {shortEval.feedback}
                          </p>

                          {shortEval.missingConcepts.length > 0 && (
                            <div className="pt-1">
                              <span className="font-semibold text-indigo-900 block mb-1">
                                Missing Key Concepts:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {shortEval.missingConcepts.map((mc, mci) => (
                                  <span
                                    key={mci}
                                    className="px-2 py-0.5 rounded bg-white text-indigo-800 border border-indigo-200 font-mono text-[11px]"
                                  >
                                    {mc}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* AI Tutor Explanation Modal */}
      {activeModalExplanation && (
        <ConceptDeepDiveModal
          explanation={activeModalExplanation}
          onClose={() => setActiveModalExplanation(null)}
          onLaunchMiniQuiz={(topic) => handleLaunchMiniQuiz(topic)}
        />
      )}

      {/* Adaptive Mini-Quiz Modal */}
      {activeMiniQuiz && (
        <MiniQuizModal
          quiz={activeMiniQuiz}
          previousMasteryScore={
            result.conceptMasteries.find((c) => c.topic === activeTopicForMiniQuiz)?.percentage || 40
          }
          onClose={() => {
            setActiveMiniQuiz(null);
            setActiveTopicForMiniQuiz(null);
          }}
          onApplyImprovement={(topic, newScore) => {
            onUpdateTopicMastery(topic, newScore);
          }}
        />
      )}
    </div>
  );
};
