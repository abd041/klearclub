raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\coa-ssr.html", encoding="utf-8").read()
i = raw.find("Need a batch")
print("idx", i)
print(raw[i - 200 : i + 900] if i >= 0 else "none")
