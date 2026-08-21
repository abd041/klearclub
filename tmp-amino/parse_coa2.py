import re

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\coa-ssr.html", encoding="utf-8").read()

# Find HTML main content
for needle in [
    "The lab report behind",
    "The Certificate Library",
    "What's on the label",
    "Eight assays",
    "Find your batch",
    "Questions, answered",
    "Load more certificates",
    "Search certificates",
    "content-container",
    "ISO 17025",
]:
    print(needle, raw.find(needle))

# Get rendered HTML after body
body = raw.find("<body")
# Find first real section with class py-
m = re.search(r'<section[^>]*class="[^"]*py-', raw)
print("section", m.start() if m else None, m.group(0)[:80] if m else None)

# Extract all visible text headings
hs = re.findall(r'<h[1-3][^>]*>([\s\S]*?)</h[1-3]>', raw)
for h in hs[:30]:
    text = re.sub(r'<[^>]+>', '', h)
    text = re.sub(r'\s+', ' ', text).strip()
    if text:
        print("H:", text[:120])
