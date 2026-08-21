import re
from pathlib import Path
hero = Path("tmp-amino/privacy-hero.html").read_text(encoding="utf-8")
i = hero.find("Your Privacy Matters")
print(hero[i-500:i+80])
