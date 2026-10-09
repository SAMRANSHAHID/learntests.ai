# LearnTest AI — FastAPI Backend Architecture

This directory contains the Python FastAPI backend service for **LearnTest AI** (Final Year Project).

## Directory Layout

```
backend/
├── main.py                  # FastAPI application entry point and route definitions
├── requirements.txt         # Python package dependencies
├── .env.example             # Template for API keys and environment variables
├── models/
│   └── schemas.py           # Pydantic data validation models
└── services/
    ├── __init__.py
    ├── youtube_service.py   # YouTube URL validation and metadata fetching
    ├── transcript_service.py# Caption/transcript extraction and segment chunking
    ├── ai_service.py        # Gemini LLM interface and prompt wrappers
    ├── question_generator.py# Grounded MCQ and Short Question generation
    ├── evaluator.py         # Semantic answer scoring and Rubric evaluation
    └── mastery.py           # Concept-level mastery breakdown and gap detection
```

## Setup & Running (Prepared for Phase 4)

1. Create a Python virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure your API key:
   ```bash
   cp .env.example .env
   # Edit .env and enter GEMINI_API_KEY
   ```

4. Launch the FastAPI development server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
