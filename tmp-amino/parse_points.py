raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\membership-ssr.html", encoding="utf-8").read()
i = raw.find("Points are cash back")
print(raw[i - 300 : i + 2200])
