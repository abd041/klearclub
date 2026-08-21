# -*- coding: utf-8 -*-
raw = open(r"c:\Users\user\Desktop\klearclub\tmp-amino\affiliate-ssr.html", encoding="utf-8").read()
i = raw.find("as a referral partner")
open(r"c:\Users\user\Desktop\klearclub\tmp-amino\aff-cta2.txt","w",encoding="utf-8").write(raw[i-600:i+800])
print("done", i)
