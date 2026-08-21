import re

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\subbox-ssr.html", encoding="utf-8").read()
print("len", len(raw))
print("title-ish:", raw[raw.find("<title"):raw.find("<title")+200] if "<title" in raw else "no")

# Find data-testid
tests = set(re.findall(r'data-testid="([^"]+)"', raw))
print("testids:", sorted(tests)[:80])

# Find headings text by stripping
# Search for common phrases with different escaping
for n in ["Your box", "Add to box", "40% off", "40% OFF", "Pick any", "Build a box", "subscription box", "How it works", "Free Amino", "Free H2O", "slots filled", "items selected", "Continue to"]:
    print(n, raw.find(n), raw.lower().find(n.lower()))

# Dump around first Add to box
i = raw.find("Add to box")
open(r"c:\Users\user\Desktop\klearclub\tmp-amino\subbox-chunk1.html","w",encoding="utf-8").write(raw[max(0,i-8000):i+5000])
print("wrote chunk1", i)

# Find main start
j = raw.find("<main")
print("main at", j)
open(r"c:\Users\user\Desktop\klearclub\tmp-amino\subbox-chunk0.html","w",encoding="utf-8").write(raw[j:j+15000] if j>=0 else raw[:15000])
