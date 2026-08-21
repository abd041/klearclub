from pathlib import Path
import re
html = Path(r"C:/Users/user/AppData/Local/Temp/amino-glp3.html").read_text(encoding="utf-8", errors="ignore")
chunk = Path(r"c:\Users\user\Desktop\klearclub\tmp-amino\ssr-hero.html").read_text(encoding="utf-8", errors="ignore")
# insert newlines before tags
pretty = re.sub(r"><", ">\n<", chunk)
Path(r"c:\Users\user\Desktop\klearclub\tmp-amino\ssr-hero-pretty.html").write_text(pretty, encoding="utf-8")
print("pretty lines", pretty.count("\n"))

# variant amounts
for m in re.finditer(r'title\\?":\\?"(10MG|20MG|30MG).*?calculated_amount\\?":([0-9.]+)', html):
    print("m", m.group(1), m.group(2)[:20] if False else m.group(0)[:80])

print("---")
for m in re.finditer(r'(10MG|20MG|30MG)\\?",\\"sku\\".{0,200}calculated_amount\\":([0-9.]+)', html):
    print(m.group(1), m.group(2))

# simpler
for amt in ["69.99", "119.99", "129.99", "139.99", "149.99", "159.99", "179.99", "189.99", "199.99"]:
    print(amt, html.count(amt))
