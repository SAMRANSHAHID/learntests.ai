/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Sparkles, RefreshCw } from 'lucide-react';
import { AppScreen } from '../types/assessment';

interface NavbarProps {
  currentScreen: AppScreen;
  onReset: () => void;
  onTrySample: () => void;
  onNavigateSection?: (sectionId: string) => void;
  onOpenQAAudit?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onReset,
  onTrySample,
  onNavigateSection,
  onOpenQAAudit,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single Brand Wordmark */}
          <button
            onClick={onReset}
            className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-md py-1"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="leading-none">
              <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
                LearnTest AI
              </span>
              <span className="block text-[11px] font-medium text-slate-400">
                Video Mastery Engine
              </span>
            </div>
          </button>

          {/* Zone 2: Single-line Text Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => onNavigateSection?.('how-it-works')}
              className="hover:text-indigo-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => onNavigateSection?.('mastery-framework')}
              className="hover:text-indigo-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              Mastery Framework
            </button>
            <button
              onClick={() => onOpenQAAudit?.()}
              className="hover:text-indigo-600 transition-colors whitespace-nowrap cursor-pointer text-indigo-700 font-semibold"
            >
              QA Test Matrix (230 Tests)
            </button>
            <button
              onClick={() => onNavigateSection?.('fyp-architecture')}
              className="hover:text-indigo-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              Architecture & Research
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            {currentScreen !== 'landing' ? (
              <button
                onClick={onReset}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>New Video</span>
              </button>
            ) : (
              <button
                onClick={onTrySample}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm shadow-indigo-200 transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Try Sample Demo</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
