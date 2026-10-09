/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CheckCircle,
  HelpCircle,
  FileCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Sliders,
  Check,
} from 'lucide-react';
import {
  AssessmentConfig,
  AssessmentMode,
  DifficultyLevel,
  VideoInfo,
} from '../types/assessment';

interface AssessmentConfigScreenProps {
  video: VideoInfo;
  onGenerateTest: (config: AssessmentConfig) => void;
  onBack: () => void;
}

export const AssessmentConfigScreen: React.FC<AssessmentConfigScreenProps> = ({
  video,
  onGenerateTest,
  onBack,
}) => {
  const [mode, setMode] = useState<AssessmentMode>('mcq_only');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('balanced');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const questionCountOptions = [5, 10, 15, 20];

  const difficultyOptions: { id: DifficultyLevel; label: string; desc: string }[] = [
    {
      id: 'easy',
      label: 'Easy',
      desc: 'Direct recall of definitions, terminology, and key statements from the video.',
    },
    {
      id: 'medium',
      label: 'Medium',
      desc: 'Conceptual application and understanding relationships between topics.',
    },
    {
      id: 'hard',
      label: 'Hard',
      desc: 'Edge cases, code syntax nuances, and deep architectural reasoning.',
    },
    {
      id: 'balanced',
      label: 'AI Balanced',
      desc: 'Recommended: Progressive mix from foundational recall to synthesis.',
    },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation latency (realistic NLP assessment compilation)
    setTimeout(() => {
      onGenerateTest({
        mode,
        questionCount,
        difficulty,
      });
    }, 900);
  };

  return (
    <div className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <div className="space-y-8 animate-fadeIn">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Step 2 of 3</span>
            <span aria-hidden="true">·</span>
            <span className="text-indigo-600 font-semibold">Configure Assessment</span>
          </div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium py-1 px-2.5 rounded-md hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Video Summary</span>
          </button>
        </div>

        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How would you like to be tested?
          </h1>
          <p className="text-sm text-slate-600">
            Tailor the assessment to your current study goals. Grounded exclusively in: <span className="font-semibold text-slate-800">{video.title}</span>
          </p>
        </div>

        {/* Section 1: Assessment Mode Cards */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Assessment Format
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: MCQs Only */}
            <div
              onClick={() => setMode('mcq_only')}
              className={`p-6 rounded-2xl border-2 transition-all cursor-pointer relative ${
                mode === 'mcq_only'
                  ? 'border-indigo-600 bg-indigo-50/20 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">MCQs Only</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Test your knowledge using multiple-choice questions. Fast, objective verification of key concepts and code syntax.
                  </p>
                </div>
                {mode === 'mcq_only' && (
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>

            {/* Card 2: MCQs + Short Questions */}
            <div
              onClick={() => setMode('mcq_and_short')}
              className={`p-6 rounded-2xl border-2 transition-all cursor-pointer relative ${
                mode === 'mcq_and_short'
                  ? 'border-indigo-600 bg-indigo-50/20 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">MCQs + Short Questions</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Test both recall and deeper understanding with multiple-choice and short-answer questions. Semantic AI evaluations provide written feedback.
                  </p>
                </div>
                {mode === 'mcq_and_short' && (
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Number of Questions */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              Number of Questions
            </h2>
            <span className="text-xs text-slate-500">
              Estimated test time: ~{questionCount * 1.5} minutes
            </span>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {questionCountOptions.map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setQuestionCount(count)}
                className={`py-3 px-4 rounded-xl text-center font-bold text-sm transition-all cursor-pointer ${
                  questionCount === count
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {count} Questions
              </button>
            ))}
          </div>
        </div>

        {/* Section 3: Difficulty */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              <span>Difficulty Level</span>
            </h2>
            <span className="text-xs text-indigo-700 font-medium bg-indigo-50 px-2 py-0.5 rounded">
              Default: AI Balanced
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {difficultyOptions.map((opt) => (
              <div
                key={opt.id}
                onClick={() => setDifficulty(opt.id)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  difficulty === opt.id
                    ? 'border-indigo-600 bg-indigo-50/20 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-slate-900">{opt.label}</span>
                    {difficulty === opt.id && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-snug">{opt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            Questions are generated strictly from the {video.transcriptSegmentCount} video transcript chunks.
          </p>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 rounded-xl shadow-sm shadow-indigo-200 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                <span>Compiling Assessment...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Test</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
