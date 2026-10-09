/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Sparkles,
  BookOpen,
  Code,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Play,
  HelpCircle,
} from 'lucide-react';
import { TopicExplanation } from '../types/assessment';

interface ConceptDeepDiveModalProps {
  explanation: TopicExplanation;
  onClose: () => void;
  onLaunchMiniQuiz: (topic: string) => void;
}

export const ConceptDeepDiveModal: React.FC<ConceptDeepDiveModalProps> = ({
  explanation,
  onClose,
  onLaunchMiniQuiz,
}) => {
  const [selectedPracticeOption, setSelectedPracticeOption] = useState<number | null>(null);
  const [practiceChecked, setPracticeChecked] = useState(false);

  const practice = explanation.quickPracticeQuestion;
  const isPracticeCorrect = selectedPracticeOption === practice.correctAnswer;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-scaleUp">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Pedagogical Tutor · Video Grounded</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">
              Understanding: {explanation.topic}
            </h2>
            <p className="text-xs text-slate-300 flex items-center gap-1.5 pt-0.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Timestamp Grounding: Video {explanation.sourceTimestamp}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* 1. Simple Explanation */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>1. Simple Explanation</span>
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {explanation.simpleExplanation}
            </p>
          </div>

          {/* 2. Important Points */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              2. Key Pedagogical Points
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {explanation.importantPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0"></span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Code Example */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-indigo-600" />
              <span>3. Code Demonstration (From Lecture)</span>
            </h3>
            <pre className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
              <code>{explanation.example}</code>
            </pre>
          </div>

          {/* 4. Common Mistake */}
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 space-y-1">
            <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>4. Common Student Mistake</span>
            </h4>
            <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
              {explanation.commonMistake}
            </p>
          </div>

          {/* 5. Quick Practice Question */}
          <div className="p-4 sm:p-5 rounded-xl bg-indigo-50/40 border border-indigo-200/60 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-indigo-900 flex items-center gap-1.5 uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                <span>5. Quick Check Question</span>
              </h4>
              <span className="text-[11px] text-slate-500 font-medium">Verify retention</span>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-900">
              {practice.question}
            </p>

            <div className="space-y-2 pt-1">
              {practice.options.map((opt, i) => {
                const isSelected = selectedPracticeOption === i;
                const isCorrectOption = i === practice.correctAnswer;

                let optClass = 'border-slate-200 bg-white hover:border-slate-300';
                if (practiceChecked) {
                  if (isCorrectOption) {
                    optClass = 'border-emerald-500 bg-emerald-50 text-emerald-900';
                  } else if (isSelected && !isCorrectOption) {
                    optClass = 'border-rose-500 bg-rose-50 text-rose-900';
                  }
                } else if (isSelected) {
                  optClass = 'border-indigo-600 bg-indigo-50/50';
                }

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      if (!practiceChecked) {
                        setSelectedPracticeOption(i);
                      }
                    }}
                    className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2.5 ${optClass}`}
                  >
                    <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-[10px] font-bold shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>

            {!practiceChecked ? (
              <button
                type="button"
                onClick={() => setPracticeChecked(true)}
                disabled={selectedPracticeOption === null}
                className="w-full mt-2 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 rounded-lg transition-colors cursor-pointer"
              >
                Check Practice Answer
              </button>
            ) : (
              <div
                className={`p-3 rounded-lg text-xs space-y-1 ${
                  isPracticeCorrect
                    ? 'bg-emerald-100/70 text-emerald-900 border border-emerald-300'
                    : 'bg-rose-100/70 text-rose-900 border border-rose-300'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  {isPracticeCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Correct Retention!</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-rose-700" />
                      <span>Incorrect Choice</span>
                    </>
                  )}
                </div>
                <p className="leading-relaxed">{practice.explanation}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            Ready to test your upgraded knowledge?
          </p>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onLaunchMiniQuiz(explanation.topic);
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Take Adaptive Mini Quiz</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
