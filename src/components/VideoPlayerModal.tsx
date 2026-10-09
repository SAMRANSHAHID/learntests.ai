/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { X, Play, Clock, ExternalLink } from 'lucide-react';
import { getYouTubeEmbedUrl } from '../utils/youtube';

interface VideoPlayerModalProps {
  videoUrl: string;
  videoTitle: string;
  timestamp: string;
  topic?: string;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  videoUrl,
  videoTitle,
  timestamp,
  topic,
  onClose,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const embedUrl = getYouTubeEmbedUrl(videoUrl, timestamp);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 rounded-2xl max-w-3xl w-full border border-slate-800 shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-800 bg-slate-900/90 text-white">
          <div className="space-y-0.5 max-w-[80%]">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold">
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Timestamp Grounding Review</span>
              {topic && (
                <>
                  <span className="text-slate-500">·</span>
                  <span className="text-indigo-300 font-bold">{topic}</span>
                </>
              )}
            </div>
            <h3 id="video-modal-title" className="text-sm sm:text-base font-bold text-slate-100 truncate">
              {videoTitle}
            </h3>
            <p className="text-xs text-slate-400 flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>Starting at section: {timestamp}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close video player"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Responsive 16:9 Video Embed Player */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={embedUrl}
            title={`${videoTitle} at timestamp ${timestamp}`}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        {/* Footer info strip */}
        <div className="p-4 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>Grounded at timestamp {timestamp} based on lecture transcript</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium transition-colors cursor-pointer"
          >
            Done Reviewing
          </button>
        </div>
      </div>
    </div>
  );
};
