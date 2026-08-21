import re
import html
from pathlib import Path

raw = Path("tmp-amino/faq.html").read_text(encoding="utf-8", errors="ignore")
out = []

def p(s=""):
    out.append(str(s))

# Extract FAQ sections from visible text
t = re.sub(r"<script[^>]*>.*?</script>", "", raw, flags=re.S)
t = re.sub(r"<style[^>]*>.*?</style>", "", t, flags=re.S)

# Find main content around Frequently Asked
idx = raw.find("Frequently Asked Questions")
p(f"FAQ heading idx: {idx}")
if idx > 0:
    p(raw[idx-800:idx+500].replace("\n", " ")[:1300])

# details blocks
details = list(re.finditer(r"<details[\s\S]*?</details>", raw))
p(f"\ndetails count: {len(details)}")
for i, m in enumerate(details[:25]):
    block = m.group(0)
    # summary text
    sm = re.search(r"<summary[^>]*>([\s\S]*?)</summary>", block)
    summary = re.sub(r"<[^>]+>", "", sm.group(1) if sm else "").strip()
    summary = html.unescape(re.sub(r"\s+", " ", summary))
    # answer text
    ans = re.sub(r"<summary[\s\S]*?</summary>", "", block)
    ans = re.sub(r"<[^>]+>", " ", ans)
    ans = html.unescape(re.sub(r"\s+", " ", ans)).strip()
    p(f"\nQ{i+1}: {summary}")
    p(f"A: {ans[:400]}")
    # classes
    cm = re.search(r'<details class="([^"]*)"', block)
    if cm:
        p(f"class: {cm.group(1)}")

# h2 categories
for m in re.finditer(r"<h2[^>]*>([\s\S]*?)</h2>", raw):
    text = re.sub(r"<[^>]+>", "", m.group(1)).strip()
    text = html.unescape(re.sub(r"\s+", " ", text))
    if text and len(text) < 80:
        p(f"H2: {text}")

# hero snippet
for key in ["Quick Answers", "Still have questions", "Email Support", "bg-gradient", "hero"]:
    i = raw.find(key)
    p(f"\n=== {key} @ {i} ===")
    if i >= 0:
        p(raw[max(0,i-250):i+450].replace("\n"," ")[:700])

Path("tmp-amino/faq-parsed.txt").write_text("\n".join(out), encoding="utf-8")
print("wrote", len(out))
