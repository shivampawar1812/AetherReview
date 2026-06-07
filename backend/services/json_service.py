import json
import os

PARSED_DIR = "parsed"

os.makedirs(PARSED_DIR, exist_ok=True)


def save_parsed_data(paper_id, data):
    """
    Save parsed paper as JSON.
    """

    filepath = os.path.join(
        PARSED_DIR,
        f"{paper_id}.json"
    )

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(
            data,
            f,
            indent=4,
            ensure_ascii=False
        )

    return filepath


def load_parsed_data(paper_id):
    """
    Load parsed JSON.
    """

    filepath = os.path.join(
        PARSED_DIR,
        f"{paper_id}.json"
    )

    if not os.path.exists(filepath):
        return None

    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)