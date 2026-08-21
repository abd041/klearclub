import re

raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\coa-ssr.html", encoding="utf-8").read()

# Extract FAQ from RSC
idx = raw.find("What is a Certificate of Analysis")
print(raw[idx-200:idx+3500][:3700])

print("\n\n==== FIND BATCH ====\n")
idx2 = raw.find("Find your batch")
print(raw[idx2-100:idx2+2000])

print("\n\n==== LOAD MORE ====\n")
idx3 = raw.find("Load more certificates")
print(raw[idx3-400:idx3+400])

# Hero rendered HTML - search for italic every vial in HTML
m = re.search(r'The lab report behind[\s\S]{0,200}every vial', raw)
print("\nhero match", m.start() if m else None)
if m:
    s = raw.rfind("<section", max(0, m.start()-8000), m.start())
    print("section", s)
    print(raw[s:m.start()+800][:2000])
