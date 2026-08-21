from pathlib import Path
import re

html = Path(r"C:/Users/user/AppData/Local/Temp/amino-glp3.html").read_text(encoding="utf-8", errors="ignore")

# unescape common
text = html.replace("\\n", "\n").replace('\\"', '"')

needles = [
    "Every batch", "independently", "View COA", "Add to", "HEAT35", "35%",
    "In stock", "Ships", "Also known as", "CAS", "Molecular", "Purity",
    "Net peptide", "Certificate", "HPLC", "What Is", "Stability",
    "research notice", "Related", "You may", "Complete your",
    "Guaranteed", "8x", "Identity", "Endotoxin", "Sterility",
    "Quantity", "Select", "variant", "sale", "USD", "From $",
    "Premium Research", "Not for human", "lyophilized",
    "batch on record", "lot", "Download", "Open COA",
    "Amino acids", "Formula", "Weight", "Sequence",
    "citations", "PubMed", "DOI", "References",
    "Subscribe", "peace of mind",
]
print("==== phrases ====")
for n in needles:
    print(("HAS " if n.lower() in text.lower() else "--- "), n)

# extract readable strings around compound info
for label in ["Compound Information", "What Is GLP-3", "Stability Information", "Important research notice", "Every batch on record", "The research behind"]:
    i = text.find(label)
    print("\n====", label, "idx", i)
    if i >= 0:
        chunk = re.sub(r"<[^>]+>", " ", text[i:i+1200])
        chunk = re.sub(r"\s+", " ", chunk)
        print(chunk[:900])

print("\n==== prices ====")
print(set(re.findall(r"\$\d+\.\d{2}", text)) )

print("\n==== also known / aliases nearby ====")
for m in re.finditer(r"Also known as.{0,200}", text, re.I):
    print(re.sub(r"<[^>]+>", "", m.group(0))[:200])
    break
