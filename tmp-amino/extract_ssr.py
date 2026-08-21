from pathlib import Path
html = Path(r"C:/Users/user/AppData/Local/Temp/amino-glp3.html").read_text(encoding="utf-8", errors="ignore")
# find visible SSR around 8x tested (not in json)
i = html.find("8x tested")
print("first", i)
# write a readable-ish slice with tags
chunk = html[i-2500:i+12000]
Path(r"c:\Users\user\Desktop\klearclub\tmp-amino\ssr-hero.html").write_text(chunk, encoding="utf-8")

# prices
import re
print("20MG nearby")
for m in re.finditer(r"20MG.{0,80}", html[:200000]):
    s = m.group(0)[:80]
    if "199" in s or "price" in s.lower() or "$" in s:
        print(s)
        
# variant prices
for title, price in re.findall(r'"title":"(10MG|20MG|30MG)".{0,400}?"calculated_amount":([0-9.]+)', html):
    print(title, price)
