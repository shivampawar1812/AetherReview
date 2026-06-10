# AetherReview

> **AI-Powered Research Novelty & Literature Intelligence Platform**

AetherReview is an end-to-end AI system that helps researchers evaluate the novelty of academic work using Retrieval-Augmented Generation (RAG), semantic similarity search, literature-grounded reasoning, and Large Language Models.

Upload a research paper and receive a comprehensive novelty report containing summaries, related literature, similarity rankings, contributions, research gaps, future research directions, and an estimated novelty score.

---

## 🚀 Features

### 📄 Research Paper Analysis

* Upload academic research papers in PDF format.
* Automatic extraction of title, abstract, and conclusion.
* Persistent storage of parsed papers for downstream analysis.

### 🔍 Literature Discovery

* Retrieval of related academic papers using OpenAlex.
* LLM-assisted query reformulation for improved literature search.
* Similarity-based ranking of retrieved works.

### 🧠 Literature-Grounded Novelty Analysis

Generate structured reports containing:

* Executive summaries
* Key contributions
* Research gaps
* Future research suggestions
* Novelty scores informed by retrieved literature

### 📊 Similarity Ranking

* Embedding-based similarity computation.
* Cosine similarity ranking.
* Identification of closely related work.

### 📑 Unified Research Reports

Single endpoint providing:

* Paper metadata
* Retrieval metadata
* Similar papers
* Novelty analysis

---

## 🏗️ System Architecture

```text
Research Paper (PDF)
        │
        ▼
PDF Parsing & Section Extraction
        │
        ▼
Chunk Generation
        │
        ▼
Embedding Generation (BGE)
        │
        ▼
ChromaDB Vector Store
        │
        ▼
LLM Query Reformulation
        │
        ▼
OpenAlex Literature Retrieval
        │
        ▼
Similarity Ranking
        │
        ▼
LLM-Based Comparative Analysis
        │
        ▼
Unified Novelty Report
```

---

## ⚙️ Tech Stack

### Backend

* FastAPI
* Python

### Retrieval & Vector Search

* OpenAlex API
* ChromaDB
* Cosine Similarity

### AI & NLP

* Sentence Transformers
* BAAI/bge-small-en-v1.5
* Retrieval-Augmented Generation (RAG)

### LLM Reasoning

* Groq API
* Llama 3.3 70B

### Document Processing

* PyMuPDF

### Frontend *(Planned)*

* Next.js 15
* React
* Tailwind CSS
* TypeScript

---

## 📂 Project Structure

```text
AetherReview/
│
├── backend/
│   ├── routes/
│   ├── services/
│   ├── parsed/
│   ├── chromadb/
│   └── app.py
│
├── frontend/            # Upcoming
│
├── README.md
└── requirements.txt
```

---

## ✨ Example Output

```json
{
  "retrieval_metadata": {
    "keywords": [
      "asthma risk prediction",
      "explainable AI in healthcare",
      "SHAP-LIME integration"
    ]
  },

  "similar_papers": [
    {
      "title": "A Survey on Explainable Artificial Intelligence (XAI): Toward Medical XAI",
      "similarity": 80.31
    }
  ],

  "novelty_analysis": {
    "summary": "...",
    "contributions": [...],
    "research_gaps": [...],
    "future_work": [...],
    "novelty_score": 8
  }
}
```

---

## 🎯 Current Status

### ✅ Backend v1.0 Completed

Implemented:

* [x] PDF Upload System
* [x] PDF Parsing Pipeline
* [x] Structured JSON Persistence
* [x] Chunk Generation
* [x] Embedding Generation
* [x] ChromaDB Integration
* [x] OpenAlex Literature Retrieval
* [x] LLM Query Reformulation
* [x] Similarity Ranking Engine
* [x] Literature-Grounded Novelty Analysis
* [x] Contribution Extraction
* [x] Research Gap Identification
* [x] Future Work Suggestions
* [x] Unified Report Endpoint

### 🚧 Next Phase

* [ ] Next.js Frontend
* [ ] Interactive Dashboard
* [ ] PDF Viewer
* [ ] Report Export
* [ ] Deployment

---

## 💡 Use Cases

### Researchers

Assess novelty before manuscript submission.

### Students

Accelerate literature reviews and related work exploration.

### Innovators

Validate research-driven startup ideas.

### Academic Institutions

Support evidence-based research discovery.

---

## 📜 Disclaimer

AetherReview provides literature-grounded insights to assist researchers. Novelty scores are intended as decision-support signals and should not replace formal peer review.

---

## 🌟 Vision

**Transform weeks of literature exploration into minutes of actionable intelligence.**

> *Illuminating Research Through AI-Powered Novelty Intelligence.*

---

## 👨‍💻 Author

**Shivam Pawar**

Built with the vision of transforming weeks of literature exploration into minutes of actionable intelligence through AI-powered research analysis.

**AetherReview — Illuminating Research Through AI-Powered Novelty Intelligence.**
---
