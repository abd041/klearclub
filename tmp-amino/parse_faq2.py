raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\coa-ssr.html", encoding="utf-8").read()
for n in ["answered", "What is a Certificate", "Are your labs", "rounded-2xl bg-white"]:
    print(n, raw.find(n))
i = raw.find("What is a Certificate of Analysis (COA)?")
print(raw[i-800:i+500] if i>=0 else "none")
