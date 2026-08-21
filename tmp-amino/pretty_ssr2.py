from pathlib import Path
import re
html = Path(r"C:/Users/user/AppData/Local/Temp/amino-glp3.html").read_text(encoding="utf-8", errors="ignore")
i = html.find("8x tested")
chunk = html[i-4000:i+18000]
pretty = re.sub(r"(</?(?:div|h1|h2|p|button|span|section|ul|li|a|img|label|fieldset)[^>]*>)", r"\n\1\n", chunk)
Path(r"c:\Users\user\Desktop\klearclub\tmp-amino\ssr-hero-pretty.html").write_text(pretty, encoding="utf-8")
print("lines", pretty.count("\n"), "start", i-4000)

# 20MG price
j = html.find('"title":"20MG"')
print("20 title idx", j)
print(html[j:j+2500][:800] if j>0 else "no")
# escaped
j2 = html.find('title\\":\\"20MG')
print("escaped idx", j2)
if j2>0:
    s = html[j2:j2+1800]
    m = re.search(r'calculated_amount\\":([0-9.]+)', s)
    print("amt", m.group(1) if m else "none")
    m2 = re.search(r'calculated_amount":([0-9.]+)', s)
    print("amt2", m2.group(1) if m2 else "none")
    print(s[s.find("calculated"):s.find("calculated")+80] if "calculated" in s else s[-200:])
