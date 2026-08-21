import re
from pathlib import Path

raw = Path("tmp-amino/returns.html").read_text(encoding="utf-8", errors="ignore")

# hero
idx = raw.find(">Damage Protection</span>")
if idx < 0:
    idx = raw.find("Damage Protection")
start = raw.rfind("<section", 0, idx)
end = raw.find("</section>", idx) + len("</section>")
hero = raw[start:end]
Path("tmp-amino/returns-hero.html").write_text(hero, encoding="utf-8")
print("hero", len(hero))
bg = re.search(r'background:([^"]+)"', hero)
print("BG", bg.group(1) if bg else None)
for m in re.finditer(r'class="(absolute[^"]*)"[^>]*style="transform:rotate\(([-\d]+)deg\)"[\s\S]{0,500}?alt="([^"]+)"', hero):
    print("VIAL", m.group(3), m.group(2), m.group(1)[:120])

# key sections
for key in [
    "Damage Protection Policy",
    "How Returns Work",
    "Eligible for Return",
    "Not Eligible for Return",
    "Received a Damaged",
    "Replacement Timeline",
    "Important Disclaimer",
    "Report an Issue",
]:
    i = raw.find(key)
    print(f"\n=== {key} @ {i} ===")
    if i >= 0:
        print(raw[max(0, i - 180) : i + 700].replace("\n", " ")[:900])

# extract main body between first content section after hero and CTA
i = raw.find("Damage Protection Policy")
j = raw.find("peace of mind")
Path("tmp-amino/returns-body.html").write_text(raw[i:j], encoding="utf-8")
print("\nbody", j - i)
