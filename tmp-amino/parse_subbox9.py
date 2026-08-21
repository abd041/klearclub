import re

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\subbox-ssr.html", encoding="utf-8").read()

# Find HTML (not RSC) occurrences
for n in ["bg-brand-mint", "bg-brand-sky", "bg-brand-lavender", "Pick any 4", "New", "Subscription box"]:
    positions = [m.start() for m in re.finditer(re.escape(n), raw)]
    print(n, positions[:8], "count", len(positions))

# Find section with perk cards - search class="rounded-[20px] bg-brand-mint
i = raw.find('class="rounded-[20px] bg-brand-mint')
print("mint card html", i)
if i < 0:
    i = raw.find("rounded-[20px] bg-brand-mint")
    print("alt", i)

# Search without escaping issues - brand-mint p-4
i = raw.find("bg-brand-mint p-4")
print("bg-brand-mint p-4", i)
print(raw[i-2000:i+2500] if i > 0 else "none")
