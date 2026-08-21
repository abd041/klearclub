raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\coa-ssr.html", encoding="utf-8").read()
i = raw.find("answered")
print(raw[i - 500 : i + 2000])
