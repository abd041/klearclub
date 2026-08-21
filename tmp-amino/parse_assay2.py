raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\coa-ssr.html", encoding="utf-8").read()
i = raw.find("RP-HPLC, 214nm")
print(raw[i - 900 : i + 200])
