/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  HelpCircle,
  FileText,
  Send,
  X,
} from 'lucide-react';
import { Question, VideoInfo } from '../types/assessment';

interface QuizScreenProps {
  questions: Question[];
  video: VideoInfo;
  userAnswers: Record<string, { selectedOption?: number; textResponse?: string }>;
  onAnswerChange: (questionId: string, answer: { selectedOption?: number; textResponse?: string }) => void;
  onSubmit: () => void;
  onQuit: () => void;
  onOpenVideoModal?: (timestamp: string, topic?: string) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  questions,
  video,
  userAnswers,
  onAnswerChange,
  onSubmit,
  onQuit,
  onOpenVideoModal,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [activeTimestampVideo, setActiveTimestampVideo] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Count answered questions
  const answeredCount = questions.filter((q) => {
    const ans = userAnswers[q.id];
    if (!ans) return false;
    if (q.type === 'mcq') return ans.selectedOption !== undefined;
    if (q.type === 'short_answer') return (ans.textResponse || '').trim().length > 0;
    return false;
  }).length;

  const currentAnswer = userAnswers[currentQuestion.id] || {};

  const handleSelectOption = (optionIndex: number) => {
    onAnswerChange(currentQuestion.id, {
      ...currentAnswer,
      selectedOption: optionIndex,
    });
  };

  const handleTextChange = (text: string) => {
    onAnswerChange(currentQuestion.id, {
      ...currentAnswer,
      textResponse: text,
    });
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowSubmitModal(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full flex flex-col justify-between">
      <div className="space-y-6">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onQuit}
              className="text-xs text-slate-500 hover:text-slate-800 font-medium py-1 px-2.5 rounded hover:bg-slate-100 transition-colors"
            >
              Exit Assessment
            </button>
            <span className="text-slate-300">|</span>
            <span className="text-xs text-slate-600 font-medium truncate max-w-[200px] sm:max-w-xs">
              {video.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700">
              Answered: {answeredCount}/{totalQuestions}
            </span>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Question {currentIndex + 1} of {totalQuestions}</span>
            <span className="font-mono text-indigo-600">{progressPercent}% Completed</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Question Metadata & Source Grounding */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                {currentQuestion.topic}
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500">
                {currentQuestion.type === 'mcq' ? 'Multiple Choice' : 'Short Answer Evaluation'}
              </span>
            </div>

            {/* Source Timestamp Grounding */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Source: Video {currentQuestion.sourceTimestamp}</span>
              </span>
              <button
                onClick={() => {
                  if (onOpenVideoModal) {
                    onOpenVideoModal(currentQuestion.sourceTimestamp, currentQuestion.topic);
                  } else {
                    setActiveTimestampVideo(
                      activeTimestampVideo === currentQuestion.sourceTimestamp
                        ? null
                        : currentQuestion.sourceTimestamp
                    );
                  }
                }}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline inline-flex items-center gap-1 cursor-pointer"
                title="View context note from video"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Watch Context</span>
              </button>
            </div>
          </div>

          {/* Timestamp Context Preview Tooltip */}
          {activeTimestampVideo && (
            <div className="p-3 bg-slate-900 text-slate-200 rounded-xl text-xs space-y-1 animate-fadeIn">
              <div className="flex items-center justify-between text-indigo-300 font-semibold">
                <span>Lecture Transcript Excerpt at {activeTimestampVideo}</span>
                <button
                  onClick={() => setActiveTimestampVideo(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-slate-300 leading-relaxed font-mono text-[11px]">
                "...in this segment, the instructor explains the mechanics of {currentQuestion.topic} and demonstrates how it executes in Python..."
              </p>
            </div>
          )}

          {/* Question Prompt */}
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Answer Input Section */}
          {currentQuestion.type === 'mcq' ? (
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((optionText, optIdx) => {
                const isSelected = currentAnswer.selectedOption === optIdx;

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/30 text-slate-900 shadow-2xs'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 text-slate-700'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'border border-slate-300 text-slate-600 bg-slate-50'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </div>
                    <span className="text-sm sm:text-base leading-relaxed flex-1">
                      {optionText}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Type your answer below (semantic AI evaluation):
              </label>
              <textarea
                rows={5}
                value={currentAnswer.textResponse || ''}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="Explain the concepts in your own words. The AI will evaluate core concepts, relationships, and technical accuracy..."
                className="w-full p-4 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none transition-all leading-relaxed"
              ></textarea>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>
                  Word count: {(currentAnswer.textResponse || '').trim().split(/\s+/).filter(Boolean).length} words
                </span>
                <span>Semantic evaluation against video curriculum</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Quick Jump Dots for Question Overview */}
          <div className="hidden sm:flex items-center gap-1.5">
            {questions.map((q, idx) => {
              const ans = userAnswers[q.id];
              const isFilled =
                q.type === 'mcq'
                  ? ans?.selectedOption !== undefined
                  : (ans?.textResponse || '').trim().length > 0;
              const isCurrent = idx === currentIndex;

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-indigo-600 text-white shadow-2xs ring-2 ring-indigo-200'
                      : isFilled
                      ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                      : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                  }`}
                  title={`Question ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {currentIndex === totalQuestions - 1 ? (
            <button
              type="button"
              onClick={() => setShowSubmitModal(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-sm shadow-indigo-200 transition-all cursor-pointer"
            >
              <span>Submit Assessment</span>
              <Send className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-sm shadow-indigo-200 transition-all cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal before Submission */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                Submit Assessment?
              </h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <p className="text-sm font-semibold text-slate-800">
                  You have answered {answeredCount} of {totalQuestions} questions.
                </p>
                {answeredCount < totalQuestions && (
                  <p className="text-xs text-amber-700 flex items-center gap-1.5 pt-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {totalQuestions - answeredCount} question(s) remain unanswered and will be marked as incorrect.
                    </span>
                  </p>
                )}
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Once submitted, the system will execute semantic evaluation, calculate concept-level mastery scores, and generate your diagnostic improvement plan.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Review Answers
              </button>
              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  onSubmit();
                }}
                className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200 transition-colors cursor-pointer"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
