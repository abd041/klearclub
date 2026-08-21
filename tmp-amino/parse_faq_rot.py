import re
from pathlib import Path
h = Path("tmp-amino/faq-hero.html").read_text(encoding="utf-8")
for m in re.finditer(r'style="transform:rotate\(([-\d]+)deg\)"[\s\S]{0,600}?alt="([^"]+)"', h):
    print(m.group(2), m.group(1))
