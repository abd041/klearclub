import re, html as htmlmod

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\subbox-ssr.html", encoding="utf-8").read()

# Look in RSC payloads for text
texts = re.findall(r'"children":"([^"\\]{8,120})"', raw)
interesting = []
for t in texts:
    tl = t.lower()
    if any(k in tl for k in ["box", "save", "month", "pick", "40", "subscribe", "slot", "delivery", "how", "faq", "free", "build", "choose", "cancel", "retail", "item", "h2o", "amino"]):
        interesting.append(t)

print("RSC children texts:", len(interesting))
for t in dict.fromkeys(interesting):
    print("-", t)

print("\n\n==== class snippets with box ====")
for m in re.finditer(r'className\\":\\"([^\\"]{20,200})\\"', raw):
    c = m.group(1)
    if "box" in c.lower() or "subscription" in c.lower() or "picker" in c.lower():
        print(c[:180])

print("\n\n==== plain class attributes ====")
for m in re.finditer(r'class="([^"]*(?:box-picker|subscription|your-box|slot)[^"]*)"', raw, re.I):
    print(m.group(1)[:200])
