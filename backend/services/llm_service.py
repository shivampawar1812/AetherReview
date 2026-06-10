import os
import json

from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def analyze_novelty(
    uploaded_paper,
    similar_papers
):
        prompt = f"""
            You are an expert peer reviewer.

            Uploaded Paper:
            {uploaded_paper}

            Similar Papers:
            {json.dumps(similar_papers, indent=2)}

            Perform the following tasks:

            1. Summarize the uploaded paper.
            2. Identify its key contributions.
            3. Identify potential research gaps.
            4. Suggest future work.
            5. Assign a novelty score from 1–10.

            Return STRICT JSON:

            {{
                "summary":"",
                "contributions":[],
                "research_gaps":[],
                "future_work":[],
                "novelty_score":0
            }}
            """
        
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",

            messages=[
                {
                    "role":"user",
                    "content":prompt
                }
            ],

            temperature=0.2
        )
        
        content = response.choices[0].message.content

        content = content.replace(
            "```json",
            ""
        )

        content = content.replace(
            "```",
            ""
        )

        content = content.strip()

        return json.loads(content)