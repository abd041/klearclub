from pathlib import Path
import re
coa = Path(r"C:/Users/user/AppData/Local/Temp/amino-coa.html").read_text(encoding="utf-8", errors="ignore")
print("len", len(coa))
print("title", re.search(r"<title>([^<]+)", coa))
for n in [".pdf", "coaUrl", "Certificate", "BPC-157", "ils/", "href"]:
    print(n, coa.lower().count(n.lower()) if n != "href" else coa.count("pdf"))

# find pdf occurrences with context
idx = coa.find(".pdf")
print("first pdf idx", idx)
if idx > 0:
    print(coa[idx-120:idx+80])

# maybe next image proxy
print("api/images", coa.count("api/images"))
print("s3", "s3.amazonaws" in coa)

# extract any url containing coa
found = set(re.findall(r'https?://[^"\'\\\s]+coa[^"\'\\\s]*', coa, re.I))
print("http coa", len(found))
for x in list(found)[:15]:
    print(x[:200])

found2 = set(re.findall(r'["\']([^"\']*coa[^"\']*)["\']', coa, re.I))
print("quoted coa", len(found2))
for x in sorted(found2)[:40]:
    if len(x) < 180:
        print(" ", x)
