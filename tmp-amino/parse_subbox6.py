import re

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\subbox-ssr.html", encoding="utf-8").read()

# Find content before main - look for page shell
idx = raw.find("<main")
before = raw[max(0, idx-8000):idx]
before = re.sub(r'<script[\s\S]*?</script>', '', before)
before = re.sub(r'srcSet="[^"]*"', 'srcSet="..."', before)
before = re.sub(r'src="[^"]{60,}"', 'src="..."', before)
print("=== BEFORE MAIN ===")
print(before[-5000:])

# price calc: live shows $41.99 for $69.99 - that's 40% off (0.6 * 69.99 = 41.994)
print("\n40% of 69.99 =", round(69.99*0.6,2))

# Find single-dosage
i = raw.find('data-testid="single-dosage"')
print("\nsingle-dosage:", i)
if i>0:
    print(raw[i:i+600])

# Find filled slot example in RSC? search "Remove"
for n in ["Remove", "in your box", "added", "Swap", "retail", "per month", "/mo"]:
    print(n, raw.find(n))
