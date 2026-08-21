import re

html = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\subbox-main.html", encoding="utf-8").read()

# Pretty-ish: break on tags for structure dump around CTA sections
# Find from first big heading patterns
needles = [
    "Pick any",
    "Build your",
    "Your box",
    "How it works",
    "FAQ",
    "subscription",
    "40%",
    "Choose",
    "Add to box",
    "Continue",
    "Slot",
    "catalog",
    "Monthly",
]

for n in needles:
    i = html.lower().find(n.lower())
    print(f"\n===== {n} @ {i} =====")
    if i >= 0:
        chunk = html[max(0, i - 400) : i + 1800]
        chunk = re.sub(r"<script[\s\S]*?</script>", "", chunk)
        print(chunk[:2200])
