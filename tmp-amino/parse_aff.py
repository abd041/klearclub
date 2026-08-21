import re

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\affiliate-ssr.html", encoding="utf-8").read()

hs = re.findall(r"<h[1-3][^>]*>([\s\S]*?)</h[1-3]>", raw)
for h in hs[:50]:
    text = re.sub(r"<[^>]+>", "", h)
    text = re.sub(r"\s+", " ", text).strip()
    if text and len(text) < 140:
        print("H:", text)

print("\n--- markers ---")
for n in [
    "Partner",
    "Affiliate",
    "Referral",
    "commission",
    "Apply",
    "How it works",
    "FAQ",
    "Earn",
    "15%",
    "20%",
    "Join",
    "dashboard",
]:
    print(n, raw.find(n), raw.lower().find(n.lower()))
