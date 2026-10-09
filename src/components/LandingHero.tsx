/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Play,
  ArrowRight,
  Sparkles,
  Layers,
  Target,
  FileCheck2,
  AlertCircle,
  Clock,
  Compass,
} from 'lucide-react';
import { SAMPLE_VIDEOS } from '../data/mockData';
import { VideoInfo } from '../types/assessment';

interface LandingHeroProps {
  onAnalyze: (url: string) => void;
  onSelectSample: (video: VideoInfo) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onAnalyze,
  onSelectSample,
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateAndSubmit = (urlToTest: string) => {
    const trimmed = urlToTest.trim();
    if (!trimmed) {
      setErrorMessage('Please enter a YouTube video URL.');
      return;
    }

    // Basic YouTube URL regex check
    const isYouTube =
      trimmed.includes('youtube.com/watch') ||
      trimmed.includes('youtu.be/') ||
      trimmed.includes('youtube.com/embed');

    if (!isYouTube) {
      setErrorMessage(
        'Please enter a valid YouTube video URL (e.g., https://www.youtube.com/watch?v=...).'
      );
      return;
    }

    setErrorMessage('');
    onAnalyze(trimmed);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateAndSubmit(urlInput);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Main Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200 bg-gradient-to-b from-indigo-50/40 via-white to-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Headline, Input, Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-semibold tracking-wider uppercase text-indigo-700 bg-indigo-50 border border-indigo-200/60 rounded px-2.5 py-1">
                  Automated Video Knowledge Assessment
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                  Learn. Test. Master.
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
                  Turn educational YouTube videos into intelligent assessments and discover what you actually understand.
                </p>
              </div>

              {/* Main Input Form */}
              <div className="pt-2">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-3"
                  noValidate
                >
                  <div className="relative flex flex-col sm:flex-row items-stretch gap-2.5 p-1.5 bg-white rounded-xl border border-slate-300 shadow-sm focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                    <div className="relative flex-1 flex items-center min-w-0 pl-3">
                      <Play className="w-5 h-5 text-indigo-600 shrink-0 mr-2.5" />
                      <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => {
                          setUrlInput(e.target.value);
                          if (errorMessage) setErrorMessage('');
                        }}
                        placeholder="Paste an educational YouTube video URL"
                        className="w-full text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none truncate py-2"
                        aria-label="YouTube video URL"
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600 shrink-0"
                    >
                      <span>Analyze Video</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Supporting text + Error message */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
                      <span className="text-indigo-600">●</span>
                      <span>No signup • No account required</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span>Immediate diagnostic report</span>
                    </p>

                    {errorMessage && (
                      <p className="text-xs font-medium text-rose-600 flex items-center gap-1.5 animate-fadeIn">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errorMessage}</span>
                      </p>
                    )}
                  </div>
                </form>
              </div>

              {/* Sample Videos Instant Launch Strip */}
              <div className="pt-4 border-t border-slate-200/80">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                  Or test with verified lecture samples:
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {SAMPLE_VIDEOS.map((video) => (
                    <button
                      key={video.id}
                      onClick={() => onSelectSample(video)}
                      className="group inline-flex items-center gap-2 text-left px-3.5 py-2 rounded-lg bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 shadow-2xs transition-all text-xs text-slate-700 cursor-pointer"
                    >
                      <span className="w-2 h-2 rounded-full bg-indigo-600 group-hover:scale-110 transition-transform"></span>
                      <span className="font-semibold text-slate-900 group-hover:text-indigo-700 truncate max-w-[200px] sm:max-w-none">
                        {video.title.split(':')[0]}
                      </span>
                      <span className="text-slate-400 font-normal">
                        ({video.duration})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Clean Academic Educational Visual Element */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xl">
                <img
                  src="/src/assets/images/hero_concept_map_1791545764115.jpg"
                  alt="Knowledge graph concept mastery visualization"
                  referrerPolicy="no-referrer"
                  className="w-full h-72 sm:h-80 lg:h-96 object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none"></div>

                <div className="absolute bottom-0 inset-x-0 p-5 space-y-2 text-white">
                  <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Real-time Semantic Knowledge Extraction</span>
                  </div>
                  <p className="text-sm text-slate-200 leading-snug">
                    Transcripts are parsed into topic nodes and mapped directly to source timestamps.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                    <span>184 Transcript Segments</span>
                    <span aria-hidden="true">·</span>
                    <span>6 Core OOP Topics</span>
                    <span aria-hidden="true">·</span>
                    <span>Timestamped</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Core User Journey Section */}
      <section id="how-it-works" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              The 3-Step Assessment Pipeline
            </h2>
            <p className="text-sm sm:text-base text-slate-500">
              From lecture link to concept diagnosis in under sixty seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Transcript & Topic Extraction
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The engine ingests the educational video, isolates timestamped transcript segments, and extracts key conceptual topics taught by the instructor.
              </p>
              <div className="pt-2 text-xs text-slate-400 font-mono">
                Input: YouTube URL → Output: Topics & Timestamp Index
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Grounded Test Generation
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Choose between pure MCQs or MCQs with short explanations. Questions test actual lecture concepts with zero irrelevant hallucination.
              </p>
              <div className="pt-2 text-xs text-slate-400 font-mono">
                Formats: 5–20 Questions · 4 Difficulty Profiles
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Mastery Diagnosis & Adaptive Tutor
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Evaluates responses semantically, flags specific weak concepts with source timestamps, and generates targeted 3-question mini quizzes.
              </p>
              <div className="pt-2 text-xs text-slate-400 font-mono">
                Outputs: Concept Mastery % · Gap Explanations
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mastery Framework Reference Section */}
      <section id="mastery-framework" className="py-16 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                Mastery Rubric
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Beyond Pass/Fail: Granular Concept Analytics
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Standard quizzes give you a single percentage score. LearnTest AI breaks performance down across every topic covered in the video, isolating where conceptual gaps actually exist.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Mastered</p>
                      <p className="text-xs text-slate-500">Consistent accurate recall and application</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-700">90% – 100%</span>
                </div>

                <div className="p-3.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Strong</p>
                      <p className="text-xs text-slate-500">Good comprehension with minor nuance gaps</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-700">75% – 89%</span>
                </div>

                <div className="p-3.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Needs Review</p>
                      <p className="text-xs text-slate-500">Partial understanding; review timestamped video</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-700">50% – 74%</span>
                </div>

                <div className="p-3.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Weak</p>
                      <p className="text-xs text-slate-500">Fundamental misconceptions detected</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-700">0% – 49%</span>
                </div>
              </div>
            </div>

            <div id="fyp-architecture" className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  BS Information Technology FYP Architecture
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Designed and structured as a full-stack academic Final Year Project applying modern NLP, Large Language Models, and adaptive learning pedagogy:
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-semibold text-slate-900 block mb-1">Frontend Layer</span>
                  <span className="text-slate-500">React 19, TypeScript, Tailwind CSS, WCAG AA compliance</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-semibold text-slate-900 block mb-1">Backend Service</span>
                  <span className="text-slate-500">Python FastAPI, Pydantic schemas, modular services</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-semibold text-slate-900 block mb-1">AI & Evaluation</span>
                  <span className="text-slate-500">Structured JSON outputs, semantic short-answer scoring</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-semibold text-slate-900 block mb-1">Data Pipeline</span>
                  <span className="text-slate-500">YouTube transcript extraction, chunking, and timestamping</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Phase 1: Full-Flow Interactive UI</span>
                <span className="font-semibold text-indigo-600">Ready for Examination</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
