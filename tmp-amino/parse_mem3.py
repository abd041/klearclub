import re

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\membership-ssr.html", encoding="utf-8").read()

# Find main content start - pricing cards
i = raw.find(">Member</h3>")
if i < 0:
    i = raw.find("text-2xl font-semibold tracking-tight text-brand-black\">Member")
print("member card", i)
chunk = raw[i - 800 : i + 12000]
chunk = re.sub(r"<script[\s\S]*?</script>", "", chunk)
open(r"c:\Users\user\Desktop\klearclub\tmp-amino\mem-tiers.html", "w", encoding="utf-8").write(chunk)
print(chunk[:8000])
