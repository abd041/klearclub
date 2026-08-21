import re
from pathlib import Path
hero = Path("tmp-amino/privacy-hero.html").read_text(encoding="utf-8")
# badge
m = re.search(r'rounded-full[\s\S]{0,400}Your Privacy Matters', hero)
print(m.group(0)[:500] if m else "no badge")
# h1 area
i = hero.find("Privacy Policy")
print(hero[i-200:i+350])
