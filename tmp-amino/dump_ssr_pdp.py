from pathlib import Path
import re
html = Path(r"C:/Users/user/AppData/Local/Temp/amino-glp3.html").read_text(encoding="utf-8", errors="ignore")
i = html.find("><main>")
# find end of main-ish - Home CTA
j = html.find("All the research peptides you need", i)
chunk = html[i:j+200]
pretty = re.sub(r"><", ">\n<", chunk)
Path(r"c:\Users\user\Desktop\klearclub\tmp-amino\pdp-ssr.html").write_text(pretty, encoding="utf-8")
print("start", i, "end", j, "pretty lines", pretty.count("\n"), "chars", len(pretty))
