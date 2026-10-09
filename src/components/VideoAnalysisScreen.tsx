/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Clock,
  Youtube,
  Layers,
  ArrowRight,
  RefreshCw,
  FileText,
  Sparkles,
} from 'lucide-react';
import { VideoInfo } from '../types/assessment';

interface VideoAnalysisScreenProps {
  video: VideoInfo;
  onProceedToConfig: () => void;
  onSelectDifferentVideo: () => void;
}

export const VideoAnalysisScreen: React.FC<VideoAnalysisScreenProps> = ({
  video,
  onProceedToConfig,
  onSelectDifferentVideo,
}) => {
  // Step simulation for realistic, professional loading progression
  const [currentStep, setCurrentStep] = useState(0);
  const [isDoneLoading, setIsDoneLoading] = useState(false);

  const steps = [
    'Video identified',
    'Extracting available transcript',
    'Processing educational content',
    'Identifying important concepts',
  ];

  useEffect(() => {
    // Progressive step execution
    const t1 = setTimeout(() => setCurrentStep(1), 600);
    const t2 = setTimeout(() => setCurrentStep(2), 1400);
    const t3 = setTimeout(() => setCurrentStep(3), 2200);
    const t4 = setTimeout(() => {
      setCurrentStep(4);
      setIsDoneLoading(true);
    }, 2900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [video.id]);

  if (!isDoneLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6 text-left">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600 animate-spin" style={{ animationDuration: '3s' }} />
              <span>Analyzing your video...</span>
            </h2>
            <p className="text-xs text-slate-500">
              Examining audio transcripts and structuring core pedagogical concepts.
            </p>
          </div>

          {/* Actual progressive steps */}
          <div className="space-y-3.5 pt-2">
            {steps.map((stepText, idx) => {
              const isFinished = currentStep > idx;
              const isCurrent = currentStep === idx;

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 transition-opacity duration-300 ${
                    currentStep >= idx ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  {isFinished ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : isCurrent ? (
                    <div className="w-5 h-5 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin shrink-0"></div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-slate-300 shrink-0"></div>
                  )}
                  <span
                    className={`text-sm ${
                      isFinished
                        ? 'font-medium text-slate-800'
                        : isCurrent
                        ? 'font-semibold text-indigo-600'
                        : 'text-slate-400'
                    }`}
                  >
                    {stepText}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Video: {video.title.slice(0, 32)}...</span>
            <span className="font-medium text-indigo-600">Almost ready...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <div className="space-y-8 animate-fadeIn">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Step 1 of 3</span>
            <span aria-hidden="true">·</span>
            <span className="text-indigo-600 font-semibold">Video Verified</span>
          </div>
          <button
            onClick={onSelectDifferentVideo}
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium py-1 px-2.5 rounded-md hover:bg-slate-100 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Change Video</span>
          </button>
        </div>

        {/* Video Information Card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Thumbnail Preview with duration overlay */}
            <div className="md:col-span-5 relative bg-slate-900">
              <img
                src={video.thumbnail}
                alt={video.title}
                referrerPolicy="no-referrer"
                className="w-full h-56 md:h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/20"></div>
              <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-[11px] font-mono text-white flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{video.duration}</span>
              </div>
            </div>

            {/* Video Metadata */}
            <div className="md:col-span-7 p-6 sm:p-7 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Youtube className="w-4 h-4 text-red-600 shrink-0" />
                  <span className="font-semibold text-slate-700">{video.channel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3 text-slate-400" />
                    <span>{video.transcriptSegmentCount} transcript segments</span>
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                  {video.title}
                </h1>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {video.summary}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-3 text-xs text-emerald-700 font-medium bg-emerald-50/70 border border-emerald-200/60 rounded-lg p-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Transcript successfully extracted and indexed for question generation.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detected Topics Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                <span>Detected Topics</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                The AI identified these core curricular concepts from the lecture transcript.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
              {video.detectedTopics.length} Concepts Isolated
            </span>
          </div>

          {/* Clean Topic Cards (Anti-slop, no garish candy pills) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {video.detectedTopics.map((topic, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-slate-200 bg-[#F8FAFC] hover:border-indigo-300 hover:bg-indigo-50/20 transition-all flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-0.5">
                    Concept #{i + 1}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">{topic}</h4>
                </div>
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              </div>
            ))}
          </div>

          {/* Bottom Action Strip */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              Next: Select your preferred assessment format and difficulty level.
            </p>
            <button
              onClick={onProceedToConfig}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-sm shadow-indigo-200 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600"
            >
              <span>Configure Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
