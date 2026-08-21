from pathlib import Path
import re
html = Path(r"C:/Users/user/AppData/Local/Temp/amino-glp3.html").read_text(encoding="utf-8", errors="ignore")
for n in ["FOR RESEARCH USE ONLY", "8x tested", "radial-gradient(38%", "tap to apply", "More ways to save", "Verified Test Results"]:
    print(n, html.find(n), html.rfind(n))

i = html.find("FOR RESEARCH USE ONLY")
print("context around FOR RESEARCH", html[i-200:i+200])

# 20mg price after escaped title
j2 = html.find('title\\":\\"20MG')
print("\n---20MG window---")
window = html[j2:j2+4000]
# find all amounts
print(re.findall(r'(?:amount|price)\\?":\\?([0-9.]+)', window)[:20])
print("199.99 in window", "199.99" in window, "69.99" in window)
# find calculated_amount after this title
k = window.find("calculated_amount")
print("calc idx", k)
print(window[k:k+120] if k>=0 else "no calc")
