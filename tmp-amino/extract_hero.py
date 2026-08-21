from pathlib import Path
html = Path(r"C:/Users/user/AppData/Local/Temp/amino-glp3.html").read_text(encoding="utf-8", errors="ignore")
idx = html.find("Triple-Action Metabolic Compound")
print("idx", idx)
chunk = html[max(0, idx-800): idx+6000]
# write
Path(r"c:\Users\user\Desktop\klearclub\tmp-amino\hero-chunk.html").write_text(chunk, encoding="utf-8")
print("len", len(chunk))
