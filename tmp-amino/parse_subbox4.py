import re

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\subbox-ssr.html", encoding="utf-8").read()

# Extract visible text near key testids
for tid in ["box-panel", "box-progress", "plan-strip", "continue-cta", "h2o-slot", "mobile-tray", "box-search", "filter-all"]:
    i = raw.find(f'data-testid="{tid}"')
    print(f"\n######## {tid} @ {i} ########")
    if i < 0:
        continue
    chunk = raw[max(0, i - 500) : i + 2500]
    # strip img srcsets for readability
    chunk = re.sub(r'srcSet="[^"]*"', 'srcSet="..."', chunk)
    chunk = re.sub(r'src="[^"]*"', 'src="..."', chunk)
    print(chunk[:2800])

# Title/description
print("\n\nMETA DESC:")
m = re.search(r'name="description" content="([^"]+)"', raw)
print(m.group(1) if m else None)

# Find Pick any context
i = raw.find("Pick any")
print("\n\nPICK ANY:")
print(raw[i-200:i+800])
