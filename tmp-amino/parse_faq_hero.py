import re
from pathlib import Path

raw = Path("tmp-amino/faq.html").read_text(encoding="utf-8", errors="ignore")

# hero section start
idx = raw.find("Frequently Asked Questions")
# go back to section
start = raw.rfind("<section", 0, idx)
end = raw.find("</section>", idx) + len("</section>")
hero = raw[start:end]
Path("tmp-amino/faq-hero.html").write_text(hero, encoding="utf-8")
print("hero len", len(hero))

# first details full
m = re.search(r"<details[\s\S]*?</details>", raw)
Path("tmp-amino/faq-details.html").write_text(m.group(0) if m else "", encoding="utf-8")

# still have questions block
i = raw.find("Still have questions")
Path("tmp-amino/faq-still.html").write_text(raw[i-400:i+600], encoding="utf-8")

# vial positions in hero
for m in re.finditer(r'class="([^"]*(?:absolute|pointer)[^"]*)"[^>]*>[\s\S]{0,80}alt="([^"]*)"', hero):
    print("VIAL", m.group(2), "->", m.group(1)[:200])

# also find absolute vial wrappers
for m in re.finditer(r'<div class="(absolute[^"]*)"[^>]*>[\s\S]{0,200}?alt="([^"]+)"', hero):
    print("WRAP", m.group(2), m.group(1)[:180])
