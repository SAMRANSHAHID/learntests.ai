"""
LearnTest AI - FastAPI Main Server
BS Information Technology Final Year Project
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models.schemas import (
    AnalyzeVideoRequest,
    VideoInfoResponse,
    GenerateTestRequest,
    EvaluateTestRequest,
    AssessmentResultResponse,
    ExplainTopicRequest,
    MiniQuizRequest,
)

app = FastAPI(
    title="LearnTest AI API",
    description="Intelligent Educational Video Assessment & Concept Mastery Engine",
    version="1.0.0",
)

# Enable CORS for frontend client
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "project": "LearnTest AI",
        "description": "Video-grounded assessment and concept mastery engine",
        "status": "online",
        "phase": "Phase 1 Completed (Architecture Staging)",
    }

@app.post("/api/analyze-video", response_model=VideoInfoResponse)
async def analyze_video(payload: AnalyzeVideoRequest):
    """
    Validates YouTube URL, retrieves lecture metadata, extracts transcripts,
    and returns detected curricular topics.
    """
    # Prepared for Phase 5 & 6 implementation
    raise HTTPException(
        status_code=501,
        detail="Backend service ready for Phase 5 integration with real YouTube Transcript API."
    )

@app.post("/api/generate-test")
async def generate_test(payload: GenerateTestRequest):
    """
    Generates video-grounded MCQ and Short-Answer questions.
    """
    raise HTTPException(
        status_code=501,
        detail="Backend service ready for Phase 8 & 9 integration with Gemini LLM."
    )

@app.post("/api/evaluate-test", response_model=AssessmentResultResponse)
async def evaluate_test(payload: EvaluateTestRequest):
    """
    Evaluates student answers semantically and calculates concept-level mastery.
    """
    raise HTTPException(
        status_code=501,
        detail="Backend service ready for Phase 10 & 11 integration."
    )

@app.post("/api/explain-topic")
async def explain_topic(payload: ExplainTopicRequest):
    """
    Provides video-grounded AI tutoring explanations for weak concepts.
    """
    raise HTTPException(
        status_code=501,
        detail="Backend service ready for Phase 12 integration."
    )

@app.post("/api/generate-mini-quiz")
async def generate_mini_quiz(payload: MiniQuizRequest):
    """
    Generates 3-5 targeted remedial questions for knowledge gaps.
    """
    raise HTTPException(
        status_code=501,
        detail="Backend service ready for Phase 13 integration."
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
