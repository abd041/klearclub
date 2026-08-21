import re

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\bulk-ssr.html", encoding="utf-8").read()
# Find aside / sticky panel
for n in ["bulk-panel", "Your order", "Your cart", "units selected", "Continue", "signed delivery", "sticky top-24", "data-testid=\"bulk"]:
    print(n, raw.find(n))

tests = sorted(set(re.findall(r'data-testid="([^"]+)"', raw)))
print("testids", [t for t in tests if "bulk" in t or "order" in t or "panel" in t])

i = raw.find("sticky top-24")
print("\n===== ASIDE =====\n")
chunk = raw[i-100:i+5000]
chunk = re.sub(r'srcSet="[^"]*"', 'srcSet="..."', chunk)
chunk = re.sub(r'src="[^"]{40,}"', 'src="..."', chunk)
print(chunk)
