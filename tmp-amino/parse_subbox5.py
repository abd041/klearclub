import re

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\subbox-ssr.html", encoding="utf-8").read()
j = raw.find("<main")
chunk = raw[j:j+12000]
chunk = re.sub(r'srcSet="[^"]*"', 'srcSet="..."', chunk)
chunk = re.sub(r'src="[^"]{80,}"', 'src="..."', chunk)
print(chunk)

# product card sample
i = raw.find('data-testid="box-picker-card"')
card = raw[i:i+3500]
card = re.sub(r'srcSet="[^"]*"', 'srcSet="..."', card)
card = re.sub(r'src="[^"]{80,}"', 'src="..."', card)
print("\n\n===== CARD =====\n")
print(card)

# layout wrapper
k = raw.rfind('class="', 0, j)
# find outer grid
for m in re.finditer(r'class="([^"]*(?:grid|max-w|content-container|lg:grid)[^"]*)"', raw[j-2000:j+500]):
    print("LAYOUT CLASS:", m.group(1)[:200])
