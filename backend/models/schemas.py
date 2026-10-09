"""
LearnTest AI - Pydantic Request & Response Schemas
Final Year Project - BS Information Technology
"""

from typing import List, Optional, Dict, Literal
from pydantic import BaseModel, HttpUrl, Field

class AnalyzeVideoRequest(BaseModel):
    url: str = Field(..., description="YouTube video URL to analyze")

class VideoInfoResponse(BaseModel):
    id: str
    url: str
    title: str
    channel: str
    duration: str
    thumbnail: str
    transcript_segment_count: int
    detected_topics: List[str]
    summary: str

class MCQQuestionSchema(BaseModel):
    id: str
    type: Literal["mcq"] = "mcq"
    question: str
    options: List[str]
    correct_answer: int
    topic: str
    source_timestamp: str
    explanation: str

class ShortAnswerQuestionSchema(BaseModel):
    id: str
    type: Literal["short_answer"] = "short_answer"
    question: str
    topic: str
    source_timestamp: str
    sample_answer: str
    key_concepts: List[str]

class GenerateTestRequest(BaseModel):
    video_id: str
    mode: Literal["mcq_only", "mcq_and_short"] = "mcq_only"
    question_count: int = Field(default=10, ge=5, le=20)
    difficulty: Literal["easy", "medium", "hard", "balanced"] = "balanced"

class UserAnswerSubmission(BaseModel):
    question_id: str
    selected_option: Optional[int] = None
    text_response: Optional[str] = None

class EvaluateTestRequest(BaseModel):
    video_id: str
    answers: List[UserAnswerSubmission]

class ConceptMasterySchema(BaseModel):
    topic: str
    percentage: int
    category: Literal["Mastered", "Strong", "Needs Review", "Weak"]
    total_questions: int
    correct_questions: int
    source_timestamp: str
    diagnostics: str

class AssessmentResultResponse(BaseModel):
    total_score: int
    max_score: int
    percentage: int
    status: str
    correct_count: int
    incorrect_count: int
    concept_masteries: List[ConceptMasterySchema]
    weak_concepts: List[ConceptMasterySchema]

class ExplainTopicRequest(BaseModel):
    video_id: str
    topic: str

class MiniQuizRequest(BaseModel):
    video_id: str
    topic: str
