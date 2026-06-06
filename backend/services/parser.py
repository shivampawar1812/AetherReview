import fitz
import re


def extract_text(pdf_path):
    """
    Extract raw text from all pages of a PDF.
    """

    document = fitz.open(pdf_path)

    text = ""

    for page in document:
        text += page.get_text()

    document.close()

    return text


def extract_abstract(text):
    """
    Extract abstract using section headers.
    """

    abstract_match = re.search(
        r"(?is)\babstract\b(.*?)(?:\n\s*(?:\d+\.?\s*)?(?:introduction|INTRODUCTION|background)\b)",
        text
    )

    if abstract_match:
        return abstract_match.group(1).strip()

    return ""


def extract_conclusion(text):
    """
    Extract conclusion section robustly.
    """

    # Search only in the last 30% of the paper
    tail_start = int(len(text) * 0.7)

    tail = text[tail_start:]

    # Match section headers only
    matches = list(
        re.finditer(
            r'(?im)^\s*(?:\d+\.?\s*)?(?:conclusion and future work|conclusion|conclusions|final remarks)\s*$',
            tail
        )
    )

    if not matches:
        return ""

    # Take the LAST conclusion header
    match = matches[-1]

    start = match.end()

    remaining = tail[start:]

    # Stop before references/acknowledgements
    end_match = re.search(
        r'(?im)^\s*(references|bibliography|acknowledg(?:e)?ments?)\s*$',
        remaining
    )

    if end_match:
        conclusion = remaining[:end_match.start()]
    else:
        conclusion = remaining

    return conclusion.strip()


def extract_title(text):
    """
    Naive title extraction.
    Assumes title is near the top.
    """

    lines = text.split("\n")

    cleaned = []

    for line in lines:
        line = line.strip()

        if line:
            cleaned.append(line)

    if cleaned:
        return cleaned[0]

    return ""


def extract_sections(pdf_path):
    """
    Main parser function.
    """

    text = extract_text(pdf_path)

    title = extract_title(text)

    abstract = extract_abstract(text)

    conclusion = extract_conclusion(text)

    return {
        "title": title,
        "abstract": abstract,
        "body": text,
        "conclusion": conclusion
    }