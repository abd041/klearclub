import re

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\membership-ssr.html", encoding="utf-8").read()

# Headings from HTML
hs = re.findall(r"<h[1-3][^>]*>([\s\S]*?)</h[1-3]>", raw)
for h in hs[:40]:
    text = re.sub(r"<[^>]+>", "", h)
    text = re.sub(r"\s+", " ", text).strip()
    if text and len(text) < 120:
        print("H:", text)

print("\n--- markers ---")
for n in [
    "Membership",
    "Join",
    "Free",
    "tier",
    "benefit",
    "Subscribe",
    "FAQ",
    "Researcher",
    "priority",
    "shipping",
    "discount",
    "How it works",
    "Get started",
]:
    print(n, raw.find(n))
