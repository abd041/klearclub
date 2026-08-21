from pathlib import Path
import re
html = Path(r"C:/Users/user/AppData/Local/Temp/amino-glp3.html").read_text(encoding="utf-8", errors="ignore")
urls = sorted(set(re.findall(r"/coa/[A-Za-z0-9_./%-]+\.pdf", html)))
print("pdfs", len(urls))
for u in urls:
    print(u)

print("\n--- modal-ish ---")
for n in ["ViewCertificate", "pdf-viewer", "iframe", "dialog", "CertificateModal", "coaUrl"]:
    print(n, html.find(n), html.count(n) if n in html else 0)
