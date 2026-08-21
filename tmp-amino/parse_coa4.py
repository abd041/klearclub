import re

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\coa-ssr.html", encoding="utf-8").read()

# Hero section - find earlier
for needle in ['id="library"', "What's on the label", "Eight assays", "Find your batch", "Questions, answered", "Need a batch"]:
    print(needle, raw.find(needle))

# Find hero before library
lib = raw.find('id="library"')
# go back to find section with lab report
hero_start = raw.rfind("<section", 0, lib)
print("hero_start", hero_start)
# Actually hero might be in previous section
# Search for class with py-14
idx = raw.find("The lab report behind every vial")
# Find nearest preceding <section or <div class=
s = raw.rfind("<section", max(0, idx-5000), idx)
print("section near hero", s)
chunk = raw[s:lib]
chunk = re.sub(r'srcSet="[^"]*"', 'srcSet="..."', chunk)
chunk = re.sub(r'<script[\s\S]*?</script>', '', chunk)
print(chunk[:6000])

# Stats section
stats = raw.find("Published certificates")
print("\nSTATS", stats)
print(raw[stats-800:stats+2500][:3500])
