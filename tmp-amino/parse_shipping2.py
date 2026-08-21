import re
from pathlib import Path

raw = Path("tmp-amino/shipping.html").read_text(encoding="utf-8", errors="ignore")

# Find hero by Shipment Protection badge in page body (not footer)
idx = raw.find(">Shipment Protection</span>")
start = raw.rfind("<section", 0, idx)
end = raw.find("</section>", idx) + len("</section>")
hero = raw[start:end]
Path("tmp-amino/shipping-hero.html").write_text(hero, encoding="utf-8")
print("hero", len(hero))
print(hero[:1200])
print("---")

# shipping options section through free shipping banner
i = raw.find(">Shipping Options</h2>")
start2 = raw.rfind("<section", 0, i)
# end at next section after Free Standard
j = raw.find("Free Standard Shipping on Orders Over $100")
end2 = raw.find("</section>", j) + len("</section>")
opts = raw[start2:end2]
Path("tmp-amino/shipping-options.html").write_text(opts, encoding="utf-8")
print("opts", len(opts))

# info cards section
k = raw.find(">Processing Time</h3>")
start3 = raw.rfind("<section", 0, k)
end3 = raw.find("</section>", raw.find(">Delivery Areas</h3>")) + len("</section>")
info = raw[start3:end3]
Path("tmp-amino/shipping-info.html").write_text(info, encoding="utf-8")
print("info", len(info))

# vials
for m in re.finditer(r'class="(absolute[^"]*)"[^>]*style="transform:rotate\(([-\d]+)deg\)"[\s\S]{0,500}?alt="([^"]+)"', hero):
    print("VIAL", m.group(3), m.group(2), m.group(1)[:140])

# gradient
gm = re.search(r'background:([^"]+)"', hero)
print("BG", gm.group(1) if gm else None)

# extract each shipping card roughly
cards = re.findall(r'<div class="relative bg-white rounded-3xl[\s\S]*?</ul></div>', opts)
print("cards", len(cards))
for c in cards:
    print("---CARD---")
    print(re.sub(r"<[^>]+>", " ", c))
    print("CLASS", re.search(r'class="([^"]+)"', c).group(1)[:120])
