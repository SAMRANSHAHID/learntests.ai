/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Question,
  ShortAnswerQuestion,
  ShortAnswerEvaluation,
  ConceptMastery,
  AssessmentResult,
  MasteryCategory,
} from '../types/assessment';

export interface MasteryThresholdConfig {
  mastered: number; // default 90
  strong: number; // default 75
  needsReview: number; // default 50
}

export const DEFAULT_THRESHOLDS: MasteryThresholdConfig = {
  mastered: 90,
  strong: 75,
  needsReview: 50,
};

export function getMasteryCategory(
  percentage: number,
  thresholds: MasteryThresholdConfig = DEFAULT_THRESHOLDS
): MasteryCategory {
  if (percentage >= thresholds.mastered) return 'Mastered';
  if (percentage >= thresholds.strong) return 'Strong';
  if (percentage >= thresholds.needsReview) return 'Needs Review';
  return 'Weak';
}

/**
 * Semantically evaluates a student's short-answer response against ground-truth key concepts.
 * Prevents rewarding raw gibberish length while being resilient to paraphrasing and casing.
 */
export function evaluateShortAnswer(
  question: ShortAnswerQuestion,
  studentText: string | undefined
): ShortAnswerEvaluation {
  const text = (studentText || '').trim().toLowerCase();
  const maxScore = 10;

  if (!text || text.length < 5) {
    return {
      score: 0,
      maxScore,
      isCorrect: false,
      feedback: 'No substantive answer provided.',
      missingConcepts: [...question.keyConcepts],
    };
  }

  // Count how many key concepts were genuinely addressed
  const missing: string[] = [];
  let matchedConceptsCount = 0;

  for (const concept of question.keyConcepts) {
    const conceptWords = concept
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 2);

    // Concept matches if phrase matches or at least 60% of words (or both words for 2-word concepts) match
    const phraseMatch = text.includes(concept.toLowerCase());
    const keywordMatches = conceptWords.filter((w) => {
      const stem = w.length > 4 ? w.slice(0, 4) : w;
      return text.includes(w) || text.includes(stem);
    }).length;
    const requiredMatches =
      conceptWords.length <= 2 ? conceptWords.length : Math.ceil(conceptWords.length * 0.6);
    const isMatched = phraseMatch || (conceptWords.length > 0 && keywordMatches >= requiredMatches);

    if (isMatched) {
      matchedConceptsCount += 1;
    } else {
      missing.push(concept);
    }
  }

  const fractionMatched =
    question.keyConcepts.length > 0 ? matchedConceptsCount / question.keyConcepts.length : 0;

  // Calculate score proportional to concept coverage
  let score = Math.round(fractionMatched * maxScore);

  // Bonus 1 pt for articulated explanation if at least 1 key concept was hit and response is well-written
  if (score > 0 && text.split(/\s+/).length >= 12 && score < maxScore) {
    score = Math.min(maxScore, score + 1);
  }

  const isCorrect = score >= 6;

  let feedback = '';
  if (score >= 9) {
    feedback = `Exceptional explanation. Clearly demonstrates all core concepts of ${question.topic}.`;
  } else if (score >= 6) {
    feedback = `Good conceptual understanding of ${question.topic}, though missing full coverage of: ${missing.slice(0, 2).join(', ')}.`;
  } else if (score >= 3) {
    feedback = `Partial recall detected for ${question.topic}. Key pedagogical distinctions were omitted.`;
  } else {
    feedback = `The response does not demonstrate understanding of ${question.topic} based on the video lecture.`;
  }

  return {
    score,
    maxScore,
    isCorrect,
    feedback,
    missingConcepts: missing,
  };
}

/**
 * Pure evaluation function for complete assessments.
 */
export function evaluateAssessment(
  questions: Question[],
  userAnswers: Record<string, { selectedOption?: number; textResponse?: string }>,
  thresholds: MasteryThresholdConfig = DEFAULT_THRESHOLDS
): AssessmentResult {
  if (!questions || questions.length === 0) {
    return {
      totalScore: 0,
      maxScore: 0,
      percentage: 0,
      status: 'No Questions',
      correctCount: 0,
      incorrectCount: 0,
      conceptMasteries: [],
      weakConcepts: [],
      shortAnswerEvaluations: {},
    };
  }

  let totalScore = 0;
  let maxScore = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  const shortAnswerEvaluations: Record<string, ShortAnswerEvaluation> = {};

  const topicStats: Record<
    string,
    { total: number; earned: number; max: number; sourceTimestamp: string }
  > = {};

  const answersMap = userAnswers || {};

  for (const q of questions) {
    const topic = q.topic;
    if (!topicStats[topic]) {
      topicStats[topic] = {
        total: 0,
        earned: 0,
        max: 0,
        sourceTimestamp: q.sourceTimestamp,
      };
    }
    topicStats[topic].total += 1;

    const ans = answersMap[q.id];

    if (q.type === 'mcq') {
      const qWeight = 1;
      maxScore += qWeight;
      topicStats[topic].max += qWeight;

      if (ans && ans.selectedOption === q.correctAnswer) {
        totalScore += qWeight;
        correctCount += 1;
        topicStats[topic].earned += qWeight;
      } else {
        incorrectCount += 1;
      }
    } else if (q.type === 'short_answer') {
      const evalResult = evaluateShortAnswer(q, ans?.textResponse);
      shortAnswerEvaluations[q.id] = evalResult;

      maxScore += evalResult.maxScore;
      totalScore += evalResult.score;
      topicStats[topic].max += evalResult.maxScore;
      topicStats[topic].earned += evalResult.score;

      if (evalResult.isCorrect) {
        correctCount += 1;
      } else {
        incorrectCount += 1;
      }
    }
  }

  const finalPercentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  let status = 'Developing Understanding';
  if (finalPercentage >= thresholds.mastered) status = 'Mastered';
  else if (finalPercentage >= thresholds.strong) status = 'Good Understanding';
  else if (finalPercentage >= thresholds.needsReview) status = 'Needs Review';
  else status = 'Needs Focused Remediation';

  const conceptMasteries: ConceptMastery[] = Object.keys(topicStats).map((topic) => {
    const stat = topicStats[topic];
    const pct = stat.max > 0 ? Math.round((stat.earned / stat.max) * 100) : 0;
    const category = getMasteryCategory(pct, thresholds);

    let diagnostics = '';
    if (category === 'Mastered') {
      diagnostics = `Mastered: Flawless recall and application of ${topic} principles.`;
    } else if (category === 'Strong') {
      diagnostics = `Strong: Consistent comprehension of ${topic} with minor edge-case oversights.`;
    } else if (category === 'Needs Review') {
      diagnostics = `Needs Review: Inconsistent understanding of ${topic}. Review video section at ${stat.sourceTimestamp}.`;
    } else {
      diagnostics = `Weak: Critical conceptual difficulty detected in ${topic}. The instructor's direct examples require review.`;
    }

    return {
      topic,
      percentage: pct,
      category,
      totalQuestions: stat.total,
      correctQuestions: stat.earned,
      sourceTimestamp: stat.sourceTimestamp,
      diagnostics,
    };
  });

  // Weak concepts are those scoring below the "strong" threshold (< 75% by default)
  const weakConcepts = conceptMasteries.filter((c) => c.percentage < thresholds.strong);

  return {
    totalScore,
    maxScore,
    percentage: finalPercentage,
    status,
    correctCount,
    incorrectCount,
    conceptMasteries,
    weakConcepts,
    shortAnswerEvaluations,
  };
}

/**
 * Recalculates results when an adaptive mini-quiz is completed for a topic.
 */
export function applyRemediationResult(
  currentResult: AssessmentResult,
  remediatedTopic: string,
  newTopicScore: number,
  thresholds: MasteryThresholdConfig = DEFAULT_THRESHOLDS
): AssessmentResult {
  const updatedMasteries = currentResult.conceptMasteries.map((cm) => {
    if (cm.topic === remediatedTopic) {
      return {
        ...cm,
        percentage: newTopicScore,
        category: getMasteryCategory(newTopicScore, thresholds),
        diagnostics: `Remediated via adaptive mini-quiz. Updated diagnostic mastery: ${newTopicScore}%.`,
      };
    }
    return cm;
  });

  const updatedWeak = updatedMasteries.filter((c) => c.percentage < thresholds.strong);

  const avg =
    updatedMasteries.length > 0
      ? Math.round(
          updatedMasteries.reduce((sum, c) => sum + c.percentage, 0) / updatedMasteries.length
        )
      : 0;

  let status = 'Developing Understanding';
  if (avg >= thresholds.mastered) status = 'Mastered';
  else if (avg >= thresholds.strong) status = 'Good Understanding';
  else if (avg >= thresholds.needsReview) status = 'Needs Review';
  else status = 'Needs Focused Remediation';

  return {
    ...currentResult,
    percentage: avg,
    status,
    conceptMasteries: updatedMasteries,
    weakConcepts: updatedWeak,
  };
}
