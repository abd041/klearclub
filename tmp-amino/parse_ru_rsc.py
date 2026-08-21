import re
import json

h = open("tmp-amino/research-use-live.html", encoding="utf-8").read()

# Unescape common RSC strings
# Find children text around proven
i = h.find("proven pure")
print(repr(h[i - 80 : i + 200]))

# Extract all h2-like strings from RSC
titles = re.findall(r'"(Research Use Only[^"]{0,80}|For research[^"]{0,80}|Pick any 4[^"]{0,80}|Intended research[^"]{0,80}|Research-grade[^"]{0,80}|Proper handling[^"]{0,80}|Research peptide FAQs[^"]{0,80}|Researcher responsibility[^"]{0,80}|Stocking up[^"]{0,80}|The compounds[^"]{0,80})"', h)
print("titles", titles[:20])

# Get larger chunks by searching escaped sequences
for needle in [
    "proven pure",
    "For research and laboratory use only",
    "Pick any 4",
    "Intended research applications",
    "Research-grade, with receipts",
    "Cell Culture Studies",
    "Storage Requirements",
    "Can Amino Club peptides",
    "Researcher responsibility",
    "Stocking up",
    "compounds researchers order most",
]:
    i = h.find(needle)
    print(f"\n=== {needle} @ {i} ===")
    if i >= 0:
        chunk = h[max(0, i - 100) : i + 600]
        # unescape lightly
        chunk = chunk.replace("\\n", "\n").replace('\\"', '"')
        print(chunk[:700])
