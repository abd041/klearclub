raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\membership-ssr.html", encoding="utf-8").read()
i = raw.find("Start your membership")
print(raw[i - 400 : i + 2800])
