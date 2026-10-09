/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AssessmentMode = 'mcq_only' | 'mcq_and_short';

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'balanced';

export interface VideoInfo {
  id: string;
  url: string;
  title: string;
  channel: string;
  duration: string;
  thumbnail: string;
  transcriptSegmentCount: number;
  detectedTopics: string[];
  summary: string;
}

export interface MCQQuestion {
  id: string;
  type: 'mcq';
  question: string;
  options: string[];
  correctAnswer: number; // 0-based index
  topic: string;
  sourceTimestamp: string;
  explanation: string;
}

export interface ShortAnswerQuestion {
  id: string;
  type: 'short_answer';
  question: string;
  topic: string;
  sourceTimestamp: string;
  sampleAnswer: string;
  keyConcepts: string[];
}

export type Question = MCQQuestion | ShortAnswerQuestion;

export interface AssessmentConfig {
  mode: AssessmentMode;
  questionCount: number;
  difficulty: DifficultyLevel;
}

export interface ShortAnswerEvaluation {
  score: number;
  maxScore: number;
  isCorrect: boolean;
  feedback: string;
  missingConcepts: string[];
}

export type MasteryCategory = 'Mastered' | 'Strong' | 'Needs Review' | 'Weak';

export interface ConceptMastery {
  topic: string;
  percentage: number;
  category: MasteryCategory;
  totalQuestions: number;
  correctQuestions: number;
  sourceTimestamp: string;
  diagnostics: string;
}

export interface AssessmentResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  status: string;
  correctCount: number;
  incorrectCount: number;
  conceptMasteries: ConceptMastery[];
  weakConcepts: ConceptMastery[];
  shortAnswerEvaluations: Record<string, ShortAnswerEvaluation>;
}

export interface TopicExplanation {
  topic: string;
  simpleExplanation: string;
  importantPoints: string[];
  example: string;
  commonMistake: string;
  sourceTimestamp: string;
  quickPracticeQuestion: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
}

export interface MiniQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  sourceTimestamp: string;
}

export interface MiniQuiz {
  topic: string;
  questions: MiniQuizQuestion[];
}

export type AppScreen =
  | 'landing'
  | 'analyzing'
  | 'configure'
  | 'quiz'
  | 'results';
