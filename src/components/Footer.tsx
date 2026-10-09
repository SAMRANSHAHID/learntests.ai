/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenQAAudit?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQAAudit }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center text-white">
                <BookOpen className="w-4 h-4" />
              </div>
              <span>LearnTest AI</span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              BS Information Technology Final Year Project in Educational Technology & Automated Assessment.
              Transforms educational YouTube video transcripts into grounded assessments and diagnostic concept mastery reports.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero-registration architecture · No personal data stored · Privacy-first</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
              Methodology & Quality
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Transcript Extraction & Cleaning</li>
              <li>Semantic Concept Tagging</li>
              <li>Source Timestamp Grounding</li>
              <li>Semantic Answer Evaluation</li>
              <li>
                <button
                  onClick={onOpenQAAudit}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline text-left"
                >
                  Run 230 Automated QA Tests
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
              Academic Disclaimer
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mastery scores reflect estimated understanding derived from student responses to video-grounded questions. They do not constitute standardized psychometric accreditation.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} LearnTest AI. Final Year Project in Applied AI & NLP.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>FastAPI & Python Ready</span>
            <span aria-hidden="true">·</span>
            <span>WCAG AA Accessible</span>
            <span aria-hidden="true">·</span>
            <span>Free-Tier Deployable</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
