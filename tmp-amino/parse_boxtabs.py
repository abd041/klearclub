import re

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\subbox-ssr.html", encoding="utf-8").read()
for n in ["Box 1", "Box 2", "box-tab", "Your boxes", "boxes"]:
    print(n, raw.find(n))

# search RSC payloads
for pat in [r'Box \\d', r'"Box "', r'boxIndex', r'New box']:
    ms = list(re.finditer(pat, raw))
    print(pat, len(ms), ms[0].start() if ms else -1)
