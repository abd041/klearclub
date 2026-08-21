import re
import html
from pathlib import Path

raw = Path("tmp-amino/shipping.html").read_text(encoding="utf-8", errors="ignore")
out = []

def p(s=""):
    out.append(str(s))

# hero section
idx = raw.find("Shipping Information")
start = raw.rfind("<section", 0, idx)
end = raw.find("</section>", idx) + len("</section>")
hero = raw[start:end]
Path("tmp-amino/shipping-hero.html").write_text(hero, encoding="utf-8")
p(f"hero len {len(hero)}")

# badge text
for key in ["Shipment Protection", "Shipping Options", "Most Popular", "Free Standard", "Processing Time", "Secure Packaging", "Order Tracking", "Delivery Areas", "Questions About Shipping", "Contact Support"]:
    i = raw.find(key)
    p(f"\n=== {key} @ {i} ===")
    if i >= 0:
        p(raw[max(0,i-200):i+500].replace("\n"," ")[:800])

# extract shipping cards - look for Standard Shipping
for m in re.finditer(r"<h3[^>]*>([\s\S]*?)</h3>", raw):
    text = re.sub(r"<[^>]+>", "", m.group(1)).strip()
    text = html.unescape(re.sub(r"\s+", " ", text))
    if text and len(text) < 60:
        p(f"H3: {text}")

# vials in hero
for m in re.finditer(r'style="transform:rotate\(([-\d]+)deg\)"[\s\S]{0,600}?alt="([^"]+)"', hero):
    p(f"VIAL {m.group(2)} rot={m.group(1)}")
for m in re.finditer(r'class="(absolute[^"]*)"[\s\S]{0,400}?alt="([^"]+)"', hero):
    p(f"CLS {m.group(2)} => {m.group(1)[:160]}")

# body section after hero - find Shipping Options section chunk
i = raw.find("Shipping Options")
chunk = raw[i:i+25000]
Path("tmp-amino/shipping-body.html").write_text(chunk, encoding="utf-8")
p(f"\nbody chunk {len(chunk)}")

Path("tmp-amino/shipping-parsed.txt").write_text("\n".join(out), encoding="utf-8")
print("done", len(out))
