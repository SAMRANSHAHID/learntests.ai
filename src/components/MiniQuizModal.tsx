/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Clock,
} from 'lucide-react';
import { MiniQuiz } from '../types/assessment';

interface MiniQuizModalProps {
  quiz: MiniQuiz;
  previousMasteryScore: number;
  onClose: () => void;
  onApplyImprovement: (topic: string, newScore: number) => void;
}

export const MiniQuizModal: React.FC<MiniQuizModalProps> = ({
  quiz,
  previousMasteryScore,
  onClose,
  onApplyImprovement,
}) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const total = quiz.questions.length;
  const answeredCount = Object.keys(userAnswers).length;

  const handleSelectOption = (questionIdx: number, optIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionIdx]: optIdx,
    }));
  };

  // Calculate results on submission
  let correctCount = 0;
  if (isSubmitted) {
    quiz.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        correctCount += 1;
      }
    });
  }

  const newScore = Math.round((correctCount / total) * 100);
  const isImproved = newScore > previousMasteryScore;

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-scaleUp">
        {/* Header */}
        <div className="bg-indigo-900 text-white p-6 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Adaptive Remediation Mini-Quiz</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">
              Targeted Assessment: {quiz.topic}
            </h2>
            <p className="text-xs text-indigo-200">
              3 focused diagnostic questions to re-test your conceptual mastery.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-indigo-200 hover:text-white p-1 rounded-lg hover:bg-indigo-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Body */}
        <div className="p-6 space-y-6 max-h-[72vh] overflow-y-auto">
          {!isSubmitted ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
                <span>Current Mastery baseline: {previousMasteryScore}%</span>
                <span>Answered: {answeredCount}/{total}</span>
              </div>

              {quiz.questions.map((q, qIdx) => (
                <div
                  key={q.id}
                  className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                      Question {qIdx + 1} of {total}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      <span>Video {q.sourceTimestamp}</span>
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 leading-snug">
                    {q.question}
                  </p>

                  <div className="space-y-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userAnswers[qIdx] === optIdx;

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(qIdx, optIdx)}
                          className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2.5 ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/60 text-slate-900 font-medium'
                              : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                              isSelected
                                ? 'bg-indigo-600 text-white'
                                : 'border border-slate-300 text-slate-500'
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Submission Results View */
            <div className="space-y-6 animate-fadeIn">
              {/* Score Comparison Banner */}
              <div
                className={`p-5 rounded-2xl border space-y-2 text-center ${
                  isImproved
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-xs mb-1">
                  {isImproved ? (
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <RefreshCw className="w-5 h-5 text-slate-600" />
                  )}
                </div>

                <h3 className="text-lg font-bold">
                  {isImproved ? 'Improvement Detected!' : 'Mini-Quiz Completed'}
                </h3>

                <div className="flex items-center justify-center gap-6 text-sm pt-1">
                  <div>
                    <span className="text-xs text-slate-500 block">Previous mastery</span>
                    <span className="font-bold text-slate-700 text-base">{previousMasteryScore}%</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 self-center" />
                  <div>
                    <span className="text-xs text-slate-500 block">New mini-quiz performance</span>
                    <span className="font-extrabold text-indigo-700 text-lg">{newScore}%</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 max-w-md mx-auto pt-1 leading-relaxed">
                  {isImproved
                    ? `Great job! Your targeted review on ${quiz.topic} boosted your diagnostic understanding from ${previousMasteryScore}% to ${newScore}%.`
                    : `You answered ${correctCount} of ${total} correctly. Keep reviewing the video timestamped sections.`}
                </p>
              </div>

              {/* Review Question Explanations */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Question Breakdown & Explanations
                </h4>
                {quiz.questions.map((q, qIdx) => {
                  const userChoice = userAnswers[qIdx];
                  const isCorrect = userChoice === q.correctAnswer;

                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">Question {qIdx + 1}</span>
                        <span
                          className={`font-semibold flex items-center gap-1 ${
                            isCorrect ? 'text-emerald-600' : 'text-rose-600'
                          }`}
                        >
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Correct</span>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-3.5 h-3.5" />
                              <span>Incorrect</span>
                            </>
                          )}
                        </span>
                      </div>

                      <p className="font-medium text-slate-900">{q.question}</p>

                      <div className="p-2.5 rounded bg-slate-50 text-slate-600 space-y-1">
                        <p className="text-[11px]">
                          <strong className="text-slate-800">Correct Answer:</strong>{' '}
                          {q.options[q.correctAnswer]}
                        </p>
                        <p className="text-[11px] text-slate-500">{q.explanation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>

          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={answeredCount === 0}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <span>Submit Mini-Quiz ({answeredCount}/{total})</span>
            </button>
          ) : (
            <button
              onClick={() => {
                onApplyImprovement(quiz.topic, newScore);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Apply Updated Score to Report</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
