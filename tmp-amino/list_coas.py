from pathlib import Path
import re, json

coa = Path(r"C:/Users/user/AppData/Local/Temp/amino-coa.html").read_text(encoding="utf-8", errors="ignore")
bpc = Path(r"C:/Users/user/AppData/Local/Temp/amino-bpc.html").read_text(encoding="utf-8", errors="ignore")

pdfs = sorted(set(re.findall(r"/coa/[A-Za-z0-9_./%-]+\.pdf", coa)))
print("listing pdfs", len(pdfs))
bpc_pdfs = sorted(set(re.findall(r"/coa/[A-Za-z0-9_./%-]+\.pdf", bpc)))
print("bpc pdfs", len(bpc_pdfs))
for u in bpc_pdfs:
    print(" BPC", u)

# decode escaped
pdfs2 = sorted(set(re.findall(r"/coa/[A-Za-z0-9_./%-]+\\.pdf", coa)))
print("escaped", len(pdfs2))

# also from json coaUrl
urls = re.findall(r'coaUrl\\?":\\?"([^"\\]+)', coa)
print("coaUrl", len(urls), "unique", len(set(urls)))
for u in sorted(set(urls))[:30]:
    print(" ", u)

print("\n--- bpc coaUrl ---")
urlsb = re.findall(r'coaUrl\\?":\\?"([^"\\]+)', bpc)
for u in sorted(set(urlsb)):
    print(" ", u)

# write all unique
allu = sorted(set(pdfs) | set(u.replace("\\/", "/") for u in urls) | set(bpc_pdfs) | set(u.replace("\\/", "/") for u in urlsb))
Path(r"c:\Users\user\Desktop\klearclub\tmp-amino\coa-urls.txt").write_text("\n".join(allu), encoding="utf-8")
print("total unique", len(allu))

# guess mapping by filename
print("\n--- filenames sample ---")
for u in allu[:40]:
    print(u)
print("...")
for u in allu[-10]:
    print(u)
