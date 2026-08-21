raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\coa-ssr.html", encoding="utf-8").read()
i = raw.find("Search the library")
print(raw[i - 600 : i + 700])
