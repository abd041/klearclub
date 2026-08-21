from pathlib import Path
import re
coa = Path(r"C:/Users/user/AppData/Local/Temp/amino-coa.html").read_text(encoding="utf-8", errors="ignore")
handles = sorted(set(re.findall(r"/us/products/([a-z0-9-]+)", coa)))
print(len(handles))
for h in handles:
    print(h)
