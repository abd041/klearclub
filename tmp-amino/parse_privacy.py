import re
from pathlib import Path

raw = Path("tmp-amino/privacy.html").read_text(encoding="utf-8", errors="ignore")

idx = raw.find(">Your Privacy Matters</span>")
if idx < 0:
    idx = raw.find("Your Privacy Matters")
start = raw.rfind("<section", 0, idx)
end = raw.find("</section>", idx) + len("</section>")
hero = raw[start:end]
Path("tmp-amino/privacy-hero.html").write_text(hero, encoding="utf-8")
print("hero", len(hero))
bg = re.search(r'background:([^"]+)"', hero)
print("BG", bg.group(1) if bg else None)
for m in re.finditer(r'class="(absolute[^"]*)"[^>]*style="transform:rotate\(([-\d]+)deg\)"[\s\S]{0,500}?alt="([^"]+)"', hero):
    print("VIAL", m.group(3), m.group(2), m.group(1)[:130])

# body section
i = raw.find("Last Updated")
start2 = raw.rfind("<section", 0, i)
# end before peace of mind CTA
j = raw.find("peace of mind")
start3 = raw.rfind("<div class=\"relative overflow-x-clip\"", 0, j)
Path("tmp-amino/privacy-body.html").write_text(raw[start2:start3], encoding="utf-8")
print("body", start3 - start2)
print(raw[start2:start2+800].replace("\n"," "))

# sample h2 classes
for m in re.finditer(r"<h2[^>]*>([\s\S]*?)</h2>", raw[start2:start3]):
    print("H2", re.sub(r"<[^>]+>", "", m.group(1))[:80])
