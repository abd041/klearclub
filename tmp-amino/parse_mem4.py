import re

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\membership-ssr.html", encoding="utf-8").read()
chunk = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\mem-tiers.html", encoding="utf-8").read()
print(chunk[8000:16000])

print("\n\n==== AFTER POINTS ====\n")
i = raw.find("100 pts = $1")
print(raw[i:i+3500])
