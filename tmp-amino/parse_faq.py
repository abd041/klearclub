raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\coa-ssr.html", encoding="utf-8").read()
i = raw.find("Questions, answered")
print("idx", i)
print(raw[i : i + 2500])
