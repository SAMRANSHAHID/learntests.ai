/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingHero } from './components/LandingHero';
import { VideoAnalysisScreen } from './components/VideoAnalysisScreen';
import { AssessmentConfigScreen } from './components/AssessmentConfigScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { QAAuditModal } from './components/QAAuditModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import {
  AppScreen,
  VideoInfo,
  Question,
  AssessmentConfig,
  AssessmentResult,
} from './types/assessment';
import {
  SAMPLE_VIDEOS,
  MOCK_QUESTIONS_PYTHON,
} from './data/mockData';
import {
  evaluateAssessment,
  applyRemediationResult,
  DEFAULT_THRESHOLDS,
} from './utils/evaluator';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
  const [selectedVideo, setSelectedVideo] = useState<VideoInfo>(SAMPLE_VIDEOS[0]);
  const [activeConfig, setActiveConfig] = useState<AssessmentConfig>({
    mode: 'mcq_only',
    questionCount: 10,
    difficulty: 'balanced',
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<
    Record<string, { selectedOption?: number; textResponse?: string }>
  >({});
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  // Modal states
  const [showQAAudit, setShowQAAudit] = useState<boolean>(false);
  const [activeVideoModal, setActiveVideoModal] = useState<{
    url: string;
    title: string;
    timestamp: string;
    topic?: string;
  } | null>(null);

  // Smooth scroll handler for nav links
  const handleNavigateSection = (sectionId: string) => {
    if (currentScreen !== 'landing') {
      setCurrentScreen('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Launch analysis for a pasted YouTube URL
  const handleAnalyzeUrl = (url: string) => {
    const matchingSample = SAMPLE_VIDEOS.find((v) => v.url === url);
    if (matchingSample) {
      setSelectedVideo(matchingSample);
    } else {
      setSelectedVideo({
        id: `custom_video_${Date.now()}`,
        url,
        title: 'Python Object-Oriented Programming: Architecture & Implementation',
        channel: 'Academic Computer Science Lecture',
        duration: '38:45',
        thumbnail:
          'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
        transcriptSegmentCount: 168,
        detectedTopics: [
          'Classes',
          'Objects',
          'Methods',
          'Constructors',
          'Inheritance',
          'Encapsulation',
        ],
        summary:
          'In-depth exploration of core object-oriented principles in Python, examining class structures, memory models, inheritance hierarchies, and variable encapsulation conventions.',
      });
    }
    setCurrentScreen('analyzing');
  };

  const handleSelectSample = (video: VideoInfo) => {
    setSelectedVideo(video);
    setCurrentScreen('analyzing');
  };

  const handleProceedToConfig = () => {
    setCurrentScreen('configure');
  };

  // Generate test with guaranteed unique IDs across 5, 10, 15, and 20 questions
  const handleGenerateTest = (config: AssessmentConfig) => {
    setActiveConfig(config);

    let pool = [...MOCK_QUESTIONS_PYTHON];
    if (config.mode === 'mcq_only') {
      pool = pool.filter((q) => q.type === 'mcq');
    }

    const selectedSlice: Question[] = [];
    for (let i = 0; i < config.questionCount; i++) {
      const baseQ = pool[i % pool.length];
      if (i < pool.length) {
        selectedSlice.push(baseQ);
      } else {
        selectedSlice.push({
          ...baseQ,
          id: `${baseQ.id}_ext_${i}`,
        });
      }
    }

    setQuestions(selectedSlice);
    setUserAnswers({});
    setCurrentScreen('quiz');
  };

  const handleAnswerChange = (
    questionId: string,
    answer: { selectedOption?: number; textResponse?: string }
  ) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Evaluate using the pure, tested evaluation engine
  const handleSubmitAssessment = () => {
    const result = evaluateAssessment(questions, userAnswers, DEFAULT_THRESHOLDS);
    setAssessmentResult(result);
    setCurrentScreen('results');
  };

  // Update mastery when user completes an adaptive mini-quiz
  const handleUpdateTopicMastery = (topic: string, newScore: number) => {
    if (!assessmentResult) return;
    const updated = applyRemediationResult(
      assessmentResult,
      topic,
      newScore,
      DEFAULT_THRESHOLDS
    );
    setAssessmentResult(updated);
  };

  const handleRetake = () => {
    setUserAnswers({});
    setCurrentScreen('quiz');
  };

  const handleReset = () => {
    setCurrentScreen('landing');
    setQuestions([]);
    setUserAnswers({});
    setAssessmentResult(null);
  };

  const handleOpenVideoModal = (timestamp: string, topic?: string) => {
    setActiveVideoModal({
      url: selectedVideo.url,
      title: selectedVideo.title,
      timestamp,
      topic,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar
        currentScreen={currentScreen}
        onReset={handleReset}
        onTrySample={() => handleSelectSample(SAMPLE_VIDEOS[0])}
        onNavigateSection={handleNavigateSection}
        onOpenQAAudit={() => setShowQAAudit(true)}
      />

      <main className="flex-1 flex flex-col">
        {currentScreen === 'landing' && (
          <LandingHero
            onAnalyze={handleAnalyzeUrl}
            onSelectSample={handleSelectSample}
          />
        )}

        {currentScreen === 'analyzing' && (
          <VideoAnalysisScreen
            video={selectedVideo}
            onProceedToConfig={handleProceedToConfig}
            onSelectDifferentVideo={handleReset}
          />
        )}

        {currentScreen === 'configure' && (
          <AssessmentConfigScreen
            video={selectedVideo}
            onGenerateTest={handleGenerateTest}
            onBack={() => setCurrentScreen('analyzing')}
          />
        )}

        {currentScreen === 'quiz' && (
          <QuizScreen
            questions={questions}
            video={selectedVideo}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            onSubmit={handleSubmitAssessment}
            onQuit={() => setCurrentScreen('configure')}
            onOpenVideoModal={handleOpenVideoModal}
          />
        )}

        {currentScreen === 'results' && assessmentResult && (
          <ResultsScreen
            result={assessmentResult}
            video={selectedVideo}
            questions={questions}
            userAnswers={userAnswers}
            onRetake={handleRetake}
            onNewVideo={handleReset}
            onUpdateTopicMastery={handleUpdateTopicMastery}
            onOpenVideoModal={handleOpenVideoModal}
          />
        )}
      </main>

      <Footer onOpenQAAudit={() => setShowQAAudit(true)} />

      {/* Senior QA In-App Audit Modal */}
      {showQAAudit && <QAAuditModal onClose={() => setShowQAAudit(false)} />}

      {/* Video Timestamp Player Modal */}
      {activeVideoModal && (
        <VideoPlayerModal
          videoUrl={activeVideoModal.url}
          videoTitle={activeVideoModal.title}
          timestamp={activeVideoModal.timestamp}
          topic={activeVideoModal.topic}
          onClose={() => setActiveVideoModal(null)}
        />
      )}
    </div>
  );
}
