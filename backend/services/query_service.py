import json

from services.llm_service import client
def generate_search_query(
    title,
    abstract,
    conclusion
):
    prompt = f"""
    You are helping retrieve academic literature.

    Paper Title:
    {title}

    Abstract:
    {abstract}

    Conclusion:
    {conclusion}

    Extract exactly 5 concise academic search keywords or phrases.

    Rules:
    - Return JSON only.
    - Use phrases that best represent the research problem.
    - Avoid generic terms.

    Example:

    [
        "asthma prediction",
        "explainable AI",
        "SHAP",
        "LIME",
        "clinical decision support"
    ]
    """


    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],

        temperature=0
    )

    content = response.choices[0].message.content

    content = content.replace("```json", "")
    content = content.replace("```", "")
    content = content.strip()

    keywords = json.loads(content)

    return keywords

