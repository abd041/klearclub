from pathlib import Path
import re, html as htmllib

raw = Path(r"").joinpath()
p = Path.home()  # dummy
html = Path(r"C:/Users/user/AppData/Local/Temp/amino-glp3.html").read_text(encoding="utf-8", errors="ignore")
print("len", len(html))
print("title", re.search(r"<title>([^<]+)", html).group(1) if re.search(r"<title>", html) else None)

# headings
heads = re.findall(r"<h[1-4][^>]*>(.*?)</h[1-4]>", html, re.I|re.S)
print("==== headings ====")
for x in heads[:40]:
    t = re.sub("<[^>]+>", "", x)
    t = re.sub(r"\s+", " ", t).strip()
    if t:
        print("-", t[:120])

print("==== visible text chunks ====")
# pull some unique marketing strings
for needle in [
    "Add to cart","Add to bag","Buy","COA","Related","Description","Purity",
    "Certificate","Also known","CAS","Storage","Reviews","FAQ","Bundle",
    "Quantity","Size","mg","In stock","Ships","Lab","Research","GLP-3",
    "Retatrutide","What is","Compound","Testing","Related products",
    "You may also","Recently","Complete","Subscribe","Guarantee",
]:
    if needle.lower() in html.lower():
        print("HAS", needle)
