from pathlib import Path
import re
bpc = Path(r"C:/Users/user/AppData/Local/Temp/amino-bpc.html").read_text(encoding="utf-8", errors="ignore")
# pretty a chunk around ViewCertificate or pdf
for n in ["ViewCertificate", "coa=open", "object", "embed", "application/pdf", "fixed inset"]:
    print(n, bpc.find(n))

# RSC props around coa
m = re.search(r".{200}ViewCertificate.{400}", bpc)
if m:
    Path(r"c:\Users\user\Desktop\klearclub\tmp-amino\viewcert.txt").write_text(m.group(0), encoding="utf-8")
    print("wrote viewcert")

# product variants coa
entries = re.findall(r'variantLabel\\":\\"([^\\]+)\\".{0,200}lotNumber\\":\\"([^\\]+)\\".{0,80}purity\\":([0-9.]+).{0,120}coaUrl\\":\\"([^\\]+)\\"', bpc)
print("entries", len(entries))
for e in entries:
    print(e)
