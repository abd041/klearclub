import re

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\bulk-ssr.html", encoding="utf-8").read()

# Find main content
i = raw.find("<main")
print("main", i)
# Find key phrases
for n in [
    "Bulk",
    "50%",
    "40%",
    "Order in bulk",
    "How it works",
    "FAQ",
    "Signed delivery",
    "units",
    "Stocking",
    "research",
    "tier",
    "Add to cart",
    "Your order",
    "Search",
]:
    print(n, raw.find(n), raw.lower().find(n.lower()))

# Extract from bg-white max-w or content start
for needle in ['max-w-7xl', 'aria-label', 'Stocking up', 'Bulk orders', 'from-brand', 'bg-gradient']:
    pos = [m.start() for m in re.finditer(re.escape(needle), raw)]
    print(needle, pos[:5], "count", len(pos))
